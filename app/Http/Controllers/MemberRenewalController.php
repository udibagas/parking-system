<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MemberRenewal;
use App\Http\Requests\MemberRenewalRequest;
use App\Http\Resources\MemberRenewalCollection;
use App\Models\Member;
use App\Models\Printer as AppPrinter;
use App\Models\Setting;
use Illuminate\Support\Facades\DB;
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\Printer;

class MemberRenewalController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:1')->only(['update', 'destroy']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $resource = MemberRenewal::when($request->dateRange, function ($q) use ($request) {
            $q->whereRaw("DATE(updated_at) BETWEEN '{$request->dateRange[0]}' AND '{$request->dateRange[1]}' ");
        })->when($request->keyword, function ($q) use ($request) {
            $q->whereHas('member', function ($q) use ($request) {
                $q->where('nama', 'LIKE', "%{$request->keyword}%")
                    ->orWhere('nomor_kartu', 'LIKE', "%{$request->keyword}%");
            })->orWhereHas('user', function ($q) use ($request) {
                $q->where('name', 'LIKE', "%{$request->keyword}%");
            });
        })->orderBy($request->sort ?: 'id', $request->order ?: 'desc')->paginate($request->pageSize);

        return new MemberRenewalCollection($resource);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MemberRenewalRequest $request)
    {
        $input = $request->all();
        $input['user_id'] = auth()->user()->id;
        $renewal = MemberRenewal::create($input);

        Member::where('id', $request->member_id)->update([
            'register_date' => $request->dari_tanggal,
            'expiry_date' => $request->sampai_tanggal,
            'siklus_pembayaran' => $request->siklus_pembayaran,
            'siklus_pembayaran_unit' => $request->siklus_pembayaran_unit,
        ]);

        return ['message' => 'Data telah disimpan', 'data' => $renewal];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(MemberRenewalRequest $request, MemberRenewal $memberRenewal)
    {
        $memberRenewal->update($request->all());

        Member::where('id', $request->member_id)->update([
            'register_date' => $request->dari_tanggal,
            'expiry_date' => $request->sampai_tanggal,
            'siklus_pembayaran' => $request->siklus_pembayaran,
            'siklus_pembayaran_unit' => $request->siklus_pembayaran_unit,
        ]);

        return ['message' => 'Data telah disimpan', 'data' => $memberRenewal];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(MemberRenewal $memberRenewal)
    {
        $memberRenewal->delete();
        return ['message' => 'Data telah dihapus'];
    }

    public function printSlip(MemberRenewal $memberRenewal, Request $request)
    {
        $request->validate([
            'printer_id' => 'required|exists:printers,id'
        ]);

        $setting = Setting::first();

        if (!$setting) {
            return response(['message' => 'BELUM ADA SETTING'], 500);
        }

        if (!$setting->nama_lokasi) {
            return response(['message' => 'LOKASI BELUM DISET'], 500);
        }

        $selectedPrinter = AppPrinter::find($request->printer_id);

        try {
            if (filter_var($selectedPrinter->ip_address, FILTER_VALIDATE_IP)) {
                $connector = new NetworkPrintConnector($selectedPrinter->ip_address, $selectedPrinter->port ?: 9100);
            } else {
                $connector = new FilePrintConnector($selectedPrinter->ip_address);
            }

            $printer = new Printer($connector);
        } catch (\Exception $e) {
            return response(['message' => 'KONEKSI KE PRINTER GAGAL. ' . $e->getMessage()], 500);
        }

        try {
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->text("SLIP PEMBAYARAN KEANGGOTAAN PARKIR\n");
            $printer->text($setting->nama_lokasi . "\n");
            $printer->text("\n\n");

            $printer->setJustification(Printer::JUSTIFY_LEFT);
            $printer->text(str_pad('Tanggal Trx', 15, ' ') . ' : ' . date('d-M-Y H:i:s', strtotime($memberRenewal->created_at)) . "\n");
            $printer->text(str_pad('Nama Member', 15, ' ') . ' : ' . strtoupper($memberRenewal->member->nama) . "\n");
            $printer->text(str_pad('Nomor Kartu', 15, ' ') . ' : ' . $memberRenewal->member->nomor_kartu . "\n");
            $printer->text(str_pad('Dari Tangal', 15, ' ') . ' : ' . date('d-M-Y', strtotime($memberRenewal->dari_tanggal)) . "\n");
            $printer->text(str_pad('Sampai Tanggal', 15, ' ') . ' : ' . date('d-M-Y', strtotime($memberRenewal->sampai_tanggal)) . "\n");
            $printer->text(str_pad('Jumlah', 15, ' ') . ' : ' . 'Rp. ' . number_format($memberRenewal->jumlah, 0, ',', '.') . ",-\n");
            $printer->text(str_pad('Petugas', 15, ' ') . ' : ' . strtoupper($memberRenewal->user->name) . "\n\n");
            $printer->cut();
            $printer->close();
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MENCETAK SLIP.' . $e->getMessage()], 500);
        }

        return ['message' => 'SILAKAN AMBIL SLIP'];
    }

    public function report(Request $request)
    {
        $sql = "SELECT DATE(created_at) AS tanggal,
            COUNT(id) AS jumlah,
            SUM(jumlah) AS pendapatan
        FROM member_renewals
        WHERE DATE(created_at) BETWEEN :start AND :end
        GROUP BY DATE(created_at)";

        $data = DB::select($sql, [
            ':start' => $request->dateRange[0],
            ':end' => $request->dateRange[1]
        ]);

        if ($request->action == 'print') {
            $request->validate(['printer_id' => 'required|exists:printers,id']);
            return $this->printReport($data, AppPrinter::find($request->printer_id));
        }

        return $data;
    }

    public function reportDaily(Request $request)
    {
        $data = MemberRenewal::with('member')
            ->whereRaw('DATE(member_renewals.created_at) = ?', [$request->date])
            ->orderBy('member_renewals.created_at', 'ASC')
            ->get();

        if ($request->action == 'print') {
            $request->validate(['printer_id' => 'required|exists:printers,id']);
            return $this->printReportDaily($request->date, $data, AppPrinter::find($request->printer_id));
        }

        return $data;
    }

    protected function printReport($data, AppPrinter $selectedPrinter)
    {
        $setting = Setting::first();

        if (!$setting) {
            return response(['message' => 'BELUM ADA SETTING'], 500);
        }

        if (!$setting->nama_lokasi) {
            return response(['message' => 'LOKASI BELUM DISET'], 500);
        }

        try {
            $connector = new NetworkPrintConnector($selectedPrinter->ip_address, $selectedPrinter->port ?: 9100);
            $printer = new Printer($connector);
        } catch (\Exception $e) {
            return response(['message' => 'KONEKSI KE PRINTER GAGAL. ' . $e->getMessage()], 500);
        }

        try {
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->text("LAPORAN PENDAPATAN ANGGOTA\n");
            $printer->text($setting->nama_lokasi . "\n");
            $printer->text("\n\n");

            $printer->setJustification(Printer::JUSTIFY_LEFT);

            $printer->text(str_pad('TANGGAL', 15, ' ') . str_pad('JUMLAH', 15, ' ') . str_pad('PENDAPATAN', 15, ' ')  . "\n");

            $totalJumlah = 0;
            $totalPendapatan = 0;

            foreach ($data as $d) {
                $totalJumlah += $d->jumlah;
                $totalPendapatan += $d->pendapatan;

                $printer->text(str_pad(date('d/M/Y', strtotime($d->tanggal)), 15, ' ')
                    . str_pad(number_format($d->jumlah, 0, ',', '.'), 15, ' ')
                    . str_pad(number_format($d->pendapatan, 0, ',', '.'), 15, ' ')  . "\n");
            }

            $printer->text("\n\n");
            $printer->text(str_pad('TOTAL', 15, ' ')
                . str_pad(number_format($totalJumlah, 0, ',', '.'), 15, ' ')
                . str_pad(number_format($totalPendapatan, 0, ',', '.'), 15, ' ')  . "\n");

            $printer->cut();
            $printer->close();
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MENCETAK SLIP.' . $e->getMessage()], 500);
        }

        return ['message' => 'SILAKAN AMBIL SLIP'];
    }

    protected function printReportDaily($date, $data, AppPrinter $selectedPrinter)
    {
        $setting = Setting::first();

        if (!$setting) {
            return response(['message' => 'BELUM ADA SETTING'], 500);
        }

        if (!$setting->nama_lokasi) {
            return response(['message' => 'LOKASI BELUM DISET'], 500);
        }

        try {
            $connector = new NetworkPrintConnector($selectedPrinter->ip_address, $selectedPrinter->port ?: 9100);
            $printer = new Printer($connector);
        } catch (\Exception $e) {
            return response(['message' => 'KONEKSI KE PRINTER GAGAL. ' . $e->getMessage()], 500);
        }

        try {
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->text("LAPORAN PENDAPATAN ANGGOTA\n");
            $printer->text($setting->nama_lokasi . "\n");
            $printer->text("TANGGAL " . date('d/M/Y', strtotime($date)));
            $printer->text("\n\n");

            $printer->setJustification(Printer::JUSTIFY_LEFT);

            $printer->text(str_pad('NAMA', 15, ' ') . str_pad('JUMLAH', 15, ' ')  . "\n");

            $total = 0;

            foreach ($data as $d) {
                $total += $d->jumlah;
                $printer->text(str_pad($d->member->nama, 15, ' ')
                    . str_pad(number_format($d->jumlah, 0, ',', '.'), 15, ' ')  . "\n");
            }

            $printer->text("\n\n");
            $printer->text(str_pad('TOTAL:', 15, ' ')
                . str_pad(number_format($total, 0, ',', '.'), 15, ' ')  . "\n");

            $printer->cut();
            $printer->close();
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MENCETAK SLIP.' . $e->getMessage()], 500);
        }

        return ['message' => 'SILAKAN AMBIL SLIP'];
    }
}
