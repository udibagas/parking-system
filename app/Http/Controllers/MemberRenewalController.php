<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MemberRenewal;
use App\Http\Requests\MemberRenewalRequest;
use App\ParkingMember;
use App\Pos;
use App\Setting;
use Illuminate\Support\Facades\DB;
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\Printer;

class MemberRenewalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $sort = $request->sort ? $request->sort : 'id';
        $order = $request->order == 'ascending' ? 'asc' : 'desc';

        return MemberRenewal::selectRaw('
                member_renewals.*,
                parking_members.name AS member_name,
                parking_members.card_number AS card_number,
                users.name AS operator
            ')
            ->join('parking_members', 'parking_members.id', '=', 'member_renewals.parking_member_id')
            ->join('users', 'users.id', '=', 'member_renewals.user_id')
            ->when($request->dateRange, function ($q) use ($request) {
                return $q->whereRaw("DATE(member_renewals.updated_at) BETWEEN '{$request->dateRange[0]}' AND '{$request->dateRange[1]}' ");
            })->when($request->keyword, function ($q) use ($request) {
                return $q->where('parking_members.name', 'LIKE', '%' . $request->keyword . '%')
                    ->orWhere('parking_members.card_number', 'LIKE', '%' . $request->keyword . '%')
                    ->orWhere('users.name', 'LIKE', '%' . $request->keyword . '%');
            })
            ->orderBy($sort, $order)->paginate($request->pageSize);
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
        ParkingMember::where('id', $request->parking_member_id)->update([
            'register_date' => $request->from_date,
            'expiry_date' => $request->to_date,
            'billing_cycle' => $request->billing_cycle,
            'billing_cycle_unit' => $request->billing_cycle_unit,
        ]);
        return ['message' => 'Data telah disimpan'];
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
        return ['message' => 'Data telah disimpan'];
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

    public function printSlip(Request $request, MemberRenewal $memberRenewal)
    {
        $setting = Setting::first();

        $pos = Pos::where('ip_address', $request->ip())->first();

        if (!$pos) {
            return response(['message' => 'POS TIDAK TERDAFTAR'], 500);
        }

        if (!$setting) {
            return response(['message' => 'BELUM ADA SETTING'], 500);
        }

        if (!$setting->location_name) {
            return response(['message' => 'LOKASI BELUM DISET'], 500);
        }

        try {
            $connector = new FilePrintConnector($pos->printer_device);
            $printer = new Printer($connector);
        } catch (\Exception $e) {
            return response(['message' => 'KONEKSI KE PRINTER GAGAL. ' . $e->getMessage()], 500);
        }

        try {
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->text("SLIP PEMBAYARAN KEANGGOTAAN PARKIR\n");
            $printer->text($setting->location_name . "\n");
            $printer->text("\n\n");

            $printer->setJustification(Printer::JUSTIFY_LEFT);
            $printer->text(str_pad('Tanggal Trx', 15, ' ') . ' : ' . date('d-M-Y H:i:s', strtotime($memberRenewal->created_at)) . "\n");
            $printer->text(str_pad('Nama Member', 15, ' ') . ' : ' . strtoupper($memberRenewal->parkingMember->name) . "\n");
            $printer->text(str_pad('Nomor Kartu', 15, ' ') . ' : ' . $memberRenewal->parkingMember->card_number . "\n");
            $printer->text(str_pad('Dari Tangal', 15, ' ') . ' : ' . date('d-M-Y', strtotime($memberRenewal->from_date)) . "\n");
            $printer->text(str_pad('Sampai Tanggal', 15, ' ') . ' : ' . date('d-M-Y', strtotime($memberRenewal->to_date)) . "\n");
            $printer->text(str_pad('Jumlah', 15, ' ') . ' : ' . 'Rp. ' . number_format($memberRenewal->amount, 0, ',', '.') . ",-\n");
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
            SUM(amount) AS pendapatan
        FROM member_renewals
        WHERE DATE(created_at) BETWEEN :start AND :end
        GROUP BY DATE(created_at)";

        $data = DB::select($sql, [
            ':start' => $request->dateRange[0],
            ':end' => $request->dateRange[1]
        ]);

        if ($request->action == 'print') {
            $this->printReport($data);
        }

        return $data;
    }

    public function reportDaily(Request $request)
    {
        $data = MemberRenewal::with('parkingMember')
            ->whereRaw('DATE(member_renewals.created_at) = ?', [$request->date])
            ->orderBy('member_renewals.created_at', 'ASC')
            ->get();

        if ($request->action == 'print') {
            $this->printReportDaily($request->date, $data);
        }

        return $data;
    }

    protected function printReport($data)
    {
        $setting = Setting::first();

        if (!$setting) {
            return response(['message' => 'BELUM ADA SETTING'], 500);
        }

        if (!$setting->location_name) {
            return response(['message' => 'LOKASI BELUM DISET'], 500);
        }

        try {
            $connector = new NetworkPrintConnector(env('PRINTER_ADDRESS'), 9100);
            $printer = new Printer($connector);
        } catch (\Exception $e) {
            return response(['message' => 'KONEKSI KE PRINTER GAGAL. ' . $e->getMessage()], 500);
        }

        try {
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->text("LAPORAN PENDAPATAN ANGGOTA\n");
            $printer->text($setting->location_name . "\n");
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

    protected function printReportDaily($date, $data)
    {
        $setting = Setting::first();

        if (!$setting) {
            return response(['message' => 'BELUM ADA SETTING'], 500);
        }

        if (!$setting->location_name) {
            return response(['message' => 'LOKASI BELUM DISET'], 500);
        }

        try {
            $connector = new NetworkPrintConnector(env('PRINTER_ADDRESS'), 9100);
            $printer = new Printer($connector);
        } catch (\Exception $e) {
            return response(['message' => 'KONEKSI KE PRINTER GAGAL. ' . $e->getMessage()], 500);
        }

        try {
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->text("LAPORAN PENDAPATAN ANGGOTA\n");
            $printer->text($setting->location_name . "\n");
            $printer->text("TANGGAL " . date('d/M/Y', strtotime($date)));
            $printer->text("\n\n");

            $printer->setJustification(Printer::JUSTIFY_LEFT);

            $printer->text(str_pad('NAMA', 15, ' ') . str_pad('JUMLAH', 15, ' ')  . "\n");

            $total = 0;

            foreach ($data as $d) {
                $total += $d->amount;
                $printer->text(str_pad($d->parkingMember->name, 15, ' ')
                    . str_pad(number_format($d->amount, 0, ',', '.'), 15, ' ')  . "\n");
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
