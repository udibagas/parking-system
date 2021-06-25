<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ParkingTransaction;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\Printer;
use App\Models\ParkingMember;
use App\Models\Pos;
use App\Models\Setting;
use App\Models\UserLog;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Mike42\Escpos\EscposImage;

class ParkingTransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $sort = $request->sort ? $request->sort : 'updated_at';
        $order = $request->order == 'ascending' ? 'asc' : 'desc';

        return ParkingTransaction::selectRaw('
                parking_transactions.*,
                parking_members.name as `member`
            ')
            ->join('parking_members', 'parking_members.id', '=', 'parking_transactions.parking_member_id', 'LEFT')
            ->when($request->dateRange, function ($q) use ($request) {
                return $q->whereBetween('parking_transactions.time_in', $request->dateRange);
            })->when($request->keyword, function ($q) use ($request) {
                return $q->where(function ($qq) use ($request) {
                    return $qq->where('parking_transactions.barcode_number', 'LIKE', '%' . $request->keyword . '%')
                        ->orWhere('parking_transactions.plate_number', 'LIKE', '%' . $request->keyword . '%')
                        ->orWhere('parking_transactions.card_number', 'LIKE', '%' . $request->keyword . '%')
                        ->orWhere('parking_transactions.operator', 'LIKE', '%' . $request->keyword . '%');
                });
            })->when($request->is_member, function ($q) use ($request) {
                return $q->whereIn('parking_transactions.is_member', $request->is_member);
            })->when($request->drive_thru, function ($q) use ($request) {
                return $q->whereIn('parking_transactions.drive_thru', $request->drive_thru);
            })->when($request->vehicle_type, function ($q) use ($request) {
                return $q->whereIn('parking_transactions.vehicle_type', $request->vehicle_type);
            })->orderBy($sort, $order)->paginate($request->pageSize);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();

        if (auth()->check()) {
            $input['operator'] = auth()->user()->name;
        }

        $pos = Pos::where('ip_address', $request->ip())->first();

        if ($pos) {
            $input['pos_id'] = $pos->id;
        }

        if ($request->is_member) {
            ParkingMember::where('id', $request->parking_member_id)->update([
                'last_transaction' => now()
            ]);
        }

        return ParkingTransaction::create($input);
    }

    public function takeSnapshot(ParkingTransaction $parkingTransaction)
    {
        $pos = $parkingTransaction->pos;

        if (!$pos) {
            return response(['message' => 'POS TIDAK TERDAFTAR'], 404);
        }

        $client = new Client(['timeout' => 3]);

        try {
            $response = $client->request('GET', $pos->camera_snapshot_url, [
                'auth' => [
                    $pos->camera_username,
                    $pos->camera_password,
                    'digest'
                ]
            ]);

            $fileName = 'snapshots/' . date('Y/m/d/H/') . $pos->name . date('-YmdHis') . '.jpeg';
            Storage::put($fileName, $response->getBody());
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MENGAMBIL GAMBAR. ' . $e->getMessage()], 500);
        }

        $parkingTransaction->update(['snapshot_in' => $fileName]);
        return $parkingTransaction;
    }

    public function printTicket(ParkingTransaction $parkingTransaction)
    {
        $setting = Setting::first();

        if (!$setting) {
            return response(['message' => 'BELUM ADA SETTING'], 500);
        }

        if (!$setting->location_name) {
            return response(['message' => 'LOKASI BELUM DISET'], 404);
        }

        $pos = $parkingTransaction->pos;

        if (!$pos) {
            return response(['message' => 'POS TIDAK TERDAFTAR'], 500);
        }

        try {
            $connector = new FilePrintConnector($pos->printer_device);
            $printer = new Printer($connector);
        } catch (\Exception $e) {
            return response(['message' => 'KONEKSI KE PRINTER GAGAL. ' . $e->getMessage()], 500);
        }

        try {
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->bitImageColumnFormat(EscposImage::load(public_path('images/logo.jpeg')));
            $printer->text("\nTIKET PARKIR\n");
            $printer->text($setting->location_name . "\n");
            $printer->text($setting->location_address . "\n\n");

            $printer->text('Rp. ' . number_format($parkingTransaction->fare, 0, ',', '.') . ",-\n");
            $printer->text($parkingTransaction->plate_number . "/" . $parkingTransaction->vehicle_type);
            $printer->text("\n\n");

            $printer->setJustification(Printer::JUSTIFY_LEFT);
            $printer->text(str_pad('WAKTU MASUK', 15, ' ') . ' : ' . $parkingTransaction->time_in . "\n");
            $printer->text(str_pad('PETUGAS', 15, ' ') . ' : ' . strtoupper(auth()->user()->name) . "\n\n");
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            // $printer->setBarcodeHeight(100);
            // $printer->setBarcodeWidth(4);
            // $printer->barcode($parkingTransaction->barcode_number, 'CODE39');
            // $printer->text("\n");
            $printer->text($setting->additional_info_ticket . "\n");
            $printer->cut();
            $printer->close();
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MENCETAK TIKET.' . $e->getMessage()], 500);
        }

        return ['message' => 'SILAKAN AMBIL TIKET'];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ParkingTransaction $parkingTransaction)
    {
        $parkingTransaction->delete();
        return ['message' => 'Transaksi telah dihapus'];
    }

    public function printReport(Request $request)
    {
        $request->validate(['date' => 'required|date']);

        $setting = Setting::first();

        if (!$setting) {
            return response(['message' => 'BELUM ADA SETTING'], 500);
        }

        if (!$setting->location_name) {
            return response(['message' => 'LOKASI BELUM DISET'], 404);
        }

        $pos = Pos::where('ip_address', $request->ip())->first();

        if (!$pos) {
            return response(['message', 'POS TIDAK TERDAFTAR'], 500);
        }

        // ambil data transaksi per tanggal, per operator
        // reguler
        $sqlReguler = "SELECT vehicle_type, COUNT(id) AS jumlah,
                SUM(fare) AS pendapatan
            FROM parking_transactions
            WHERE is_member = 0
                AND drive_thru = 0
                AND operator = :operator
                AND DATE(time_in) = :date
            GROUP BY vehicle_type
        ";

        // ambil data transaksi per tanggal, per operator
        // member
        $sqlMember = "SELECT vehicle_type, COUNT(id) AS jumlah
            FROM parking_transactions
            WHERE is_member = 1
                AND operator = :operator
                AND DATE(time_in) = :date
            GROUP BY vehicle_type
        ";

        // ambil data transaksi per tanggal, per operator
        // member
        $sqlDriveThru = "SELECT vehicle_type, COUNT(id) AS jumlah
            FROM parking_transactions
            WHERE drive_thru = 1
                AND operator = :operator
                AND DATE(time_in) = :date
            GROUP BY vehicle_type
        ";

        $pendapatanReguler = DB::select($sqlReguler, [
            ':date' => $request->date,
            ':operator' => $request->user()->name,
        ]);

        $trxMember = DB::select($sqlMember, [
            ':date' => $request->date,
            ':operator' => $request->user()->name,
        ]);

        $trxDriveThru = DB::select($sqlDriveThru, [
            ':date' => $request->date,
            ':operator' => $request->user()->name,
        ]);

        // ambil data periode jam
        $start = DB::select('SELECT time_in
            FROM parking_transactions
            WHERE operator = :operator
                AND DATE(time_in) = :date
            ORDER BY time_in ASC
            ', [
            ':date' => $request->date,
            ':operator' => $request->user()->name,
        ]);

        if (!$start) {
            return response(['message' => 'BELUM ADA TRANSAKSI'], 404);
        }

        $userLog = UserLog::where('action', 'LOGIN')
            ->whereRaw('DATE(created_at) = ?', [$request->date])
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'asc')
            ->first();

        try {
            $connector = new FilePrintConnector($pos->printer_device);
            $printer = new Printer($connector);
        } catch (\Exception $e) {
            return response(['message' => 'KONEKSI KE PRINTER GAGAL. ' . $e->getMessage()], 500);
        }

        try {
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->text("LAPORAN PENDAPATAN PARKIR\n");
            $printer->text($setting->location_name . "\n\n");

            $printer->setJustification(Printer::JUSTIFY_LEFT);
            $printer->text(str_pad('TANGGAL', 15, ' ') . ' : ' . date('d-M-Y', strtotime($request->date)) . "\n");
            $printer->text(str_pad('DARI JAM', 15, ' ') . ' : ' . date('d-M-Y H:i', strtotime($userLog ? $userLog->created_at : strtotime(date('Y-m-d 00:00:00'))))  . "\n");
            $printer->text(str_pad('SAMPAI JAM', 15, ' ') . ' : ' . date('d-M-Y H:i')  . "\n");
            $printer->text(str_pad('PETUGAS', 15, ' ') . ' : ' . strtoupper($request->user()->name) . "\n\n");

            // REGULER SECTION
            $printer->text("REGULER\n");
            $subTotalReguler = ['jumlah' => 0, 'pendapatan' => 0];

            foreach ($pendapatanReguler as $d) {
                $subTotalReguler['jumlah'] += $d->jumlah;
                $subTotalReguler['pendapatan'] += $d->pendapatan;

                $printer->text(str_pad('-- ' . $d->vehicle_type, 15, ' ')
                    . str_pad($d->jumlah, 5, ' ', STR_PAD_LEFT)
                    . str_pad(number_format($d->pendapatan, 0, ',', '.'), 15, ' ', STR_PAD_LEFT) . "\n");
            }

            $printer->text(str_pad('SUB TOTAL', 15, ' ')
                . str_pad($subTotalReguler['jumlah'], 5, ' ', STR_PAD_LEFT)
                . str_pad(number_format($subTotalReguler['pendapatan'], 0, ',', '.'), 15, ' ', STR_PAD_LEFT) . "\n\n");


            // MEMBER SECTION
            $printer->text("MEMBER\n");
            $subTotalMember = ['jumlah' => 0];

            foreach ($trxMember as $d) {
                $subTotalMember['jumlah'] += $d->jumlah;
                $printer->text(str_pad('-- ' . $d->vehicle_type, 15, ' ') . str_pad($d->jumlah, 5, ' ', STR_PAD_LEFT) . "\n");
            }

            $printer->text(str_pad('SUB TOTAL', 15, ' ') . str_pad($subTotalMember['jumlah'], 5, ' ', STR_PAD_LEFT) . "\n\n");

            // DRIVE THRU SECTION
            $printer->text("DRIVE THRU\n");
            $subTotalDriveThru = ['jumlah' => 0];

            foreach ($trxDriveThru as $d) {
                $subTotalDriveThru['jumlah'] += $d->jumlah;
                $printer->text(str_pad('-- ' . $d->vehicle_type, 15, ' ') . str_pad($d->jumlah, 5, ' ', STR_PAD_LEFT) . "\n");
            }

            $printer->text(str_pad('SUB TOTAL', 15, ' ') . str_pad($subTotalDriveThru['jumlah'], 5, ' ', STR_PAD_LEFT) . "\n\n");

            $printer->text(str_pad('GRAND TOTAL', 15, ' ')
                . str_pad(' ', 5, ' ', STR_PAD_LEFT)
                . str_pad(number_format($subTotalReguler['pendapatan'], 0, ',', '.'), 15, ' ', STR_PAD_LEFT) . "\n");

            $printer->cut();
            $printer->close();
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MENCETAK STRUK.' . $e->getMessage()], 500);
        }
    }
}
