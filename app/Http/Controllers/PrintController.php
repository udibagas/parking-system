<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
use App\Models\Pos;
use Illuminate\Support\Facades\DB;
use App\Models\UserLog;

class PrintController extends Controller
{
    // public function reportOri(Request $request)
    // {
    //     $request->validate(['date' => 'required|date']);

    //     $setting = Setting::first();

    //     if (!$setting) {
    //         return response(['message' => 'BELUM ADA SETTING'], 500);
    //     }

    //     if (!$setting->location_name) {
    //         return response(['message' => 'LOKASI BELUM DISET'], 404);
    //     }

    //     $pos = Pos::where('ip_address', $request->ip())->first();

    //     if (!$pos) {
    //         return response(['message', 'POS TIDAK TERDAFTAR'], 500);
    //     }

    //     // ambil data transaksi per tanggal, per operator
    //     // reguler
    //     $sqlReguler = "SELECT vehicle_type, COUNT(id) AS jumlah,
    //             SUM(fare) AS pendapatan
    //         FROM parking_transactions
    //         WHERE is_member = 0
    //             AND drive_thru = 0
    //             AND operator = :operator
    //             AND DATE(time_in) = :date
    //         GROUP BY vehicle_type
    //     ";

    //     // ambil data transaksi per tanggal, per operator
    //     // member
    //     $sqlMember = "SELECT vehicle_type, COUNT(id) AS jumlah
    //         FROM parking_transactions
    //         WHERE is_member = 1
    //             AND operator = :operator
    //             AND DATE(time_in) = :date
    //         GROUP BY vehicle_type
    //     ";

    //     // ambil data transaksi per tanggal, per operator
    //     // member
    //     $sqlDriveThru = "SELECT vehicle_type, COUNT(id) AS jumlah
    //         FROM parking_transactions
    //         WHERE drive_thru = 1
    //             AND operator = :operator
    //             AND DATE(time_in) = :date
    //         GROUP BY vehicle_type
    //     ";

    //     $pendapatanReguler = DB::select($sqlReguler, [
    //         ':date' => $request->date,
    //         ':operator' => $request->user()->name,
    //     ]);

    //     $trxMember = DB::select($sqlMember, [
    //         ':date' => $request->date,
    //         ':operator' => $request->user()->name,
    //     ]);

    //     $trxDriveThru = DB::select($sqlDriveThru, [
    //         ':date' => $request->date,
    //         ':operator' => $request->user()->name,
    //     ]);

    //     // ambil data periode jam
    //     $start = DB::select('SELECT time_in
    //         FROM parking_transactions
    //         WHERE operator = :operator
    //             AND DATE(time_in) = :date
    //         ORDER BY time_in ASC
    //         ', [
    //         ':date' => $request->date,
    //         ':operator' => $request->user()->name,
    //     ]);

    //     if (!$start) {
    //         return response(['message' => 'BELUM ADA TRANSAKSI'], 404);
    //     }

    //     $userLog = UserLog::where('action', 'LOGIN')
    //         ->whereRaw('DATE(created_at) = ?', [$request->date])
    //         ->where('user_id', $request->user()->id)
    //         ->orderBy('created_at', 'asc')
    //         ->first();

    //     try {
    //         $connector = new FilePrintConnector($pos->printer_device);
    //         $printer = new Printer($connector);
    //     } catch (\Exception $e) {
    //         return response(['message' => 'KONEKSI KE PRINTER GAGAL. ' . $e->getMessage()], 500);
    //     }

    //     try {
    //         $printer->setJustification(Printer::JUSTIFY_CENTER);
    //         $printer->text("LAPORAN PENDAPATAN PARKIR\n");
    //         $printer->text($setting->location_name . "\n\n");

    //         $printer->setJustification(Printer::JUSTIFY_LEFT);
    //         $printer->text(str_pad('TANGGAL', 15, ' ') . ' : ' . date('d-M-Y', strtotime($request->date)) . "\n");
    //         $printer->text(str_pad('DARI JAM', 15, ' ') . ' : ' . date('d-M-Y H:i', strtotime($userLog ? $userLog->created_at : strtotime(date('Y-m-d 00:00:00'))))  . "\n");
    //         $printer->text(str_pad('SAMPAI JAM', 15, ' ') . ' : ' . date('d-M-Y H:i')  . "\n");
    //         $printer->text(str_pad('PETUGAS', 15, ' ') . ' : ' . strtoupper($request->user()->name) . "\n\n");

    //         // REGULER SECTION
    //         $printer->text("REGULER\n");
    //         $subTotalReguler = ['jumlah' => 0, 'pendapatan' => 0];

    //         foreach ($pendapatanReguler as $d) {
    //             $subTotalReguler['jumlah'] += $d->jumlah;
    //             $subTotalReguler['pendapatan'] += $d->pendapatan;

    //             $printer->text(str_pad('-- ' . $d->vehicle_type, 15, ' ')
    //                 . str_pad($d->jumlah, 5, ' ', STR_PAD_LEFT)
    //                 . str_pad(number_format($d->pendapatan, 0, ',', '.'), 15, ' ', STR_PAD_LEFT) . "\n");
    //         }

    //         $printer->text(str_pad('SUB TOTAL', 15, ' ')
    //             . str_pad($subTotalReguler['jumlah'], 5, ' ', STR_PAD_LEFT)
    //             . str_pad(number_format($subTotalReguler['pendapatan'], 0, ',', '.'), 15, ' ', STR_PAD_LEFT) . "\n\n");


    //         // MEMBER SECTION
    //         $printer->text("MEMBER\n");
    //         $subTotalMember = ['jumlah' => 0];

    //         foreach ($trxMember as $d) {
    //             $subTotalMember['jumlah'] += $d->jumlah;
    //             $printer->text(str_pad('-- ' . $d->vehicle_type, 15, ' ') . str_pad($d->jumlah, 5, ' ', STR_PAD_LEFT) . "\n");
    //         }

    //         $printer->text(str_pad('SUB TOTAL', 15, ' ') . str_pad($subTotalMember['jumlah'], 5, ' ', STR_PAD_LEFT) . "\n\n");

    //         // DRIVE THRU SECTION
    //         $printer->text("DRIVE THRU\n");
    //         $subTotalDriveThru = ['jumlah' => 0];

    //         foreach ($trxDriveThru as $d) {
    //             $subTotalDriveThru['jumlah'] += $d->jumlah;
    //             $printer->text(str_pad('-- ' . $d->vehicle_type, 15, ' ') . str_pad($d->jumlah, 5, ' ', STR_PAD_LEFT) . "\n");
    //         }

    //         $printer->text(str_pad('SUB TOTAL', 15, ' ') . str_pad($subTotalDriveThru['jumlah'], 5, ' ', STR_PAD_LEFT) . "\n\n");

    //         $printer->text(str_pad('GRAND TOTAL', 15, ' ')
    //             . str_pad(' ', 5, ' ', STR_PAD_LEFT)
    //             . str_pad(number_format($subTotalReguler['pendapatan'], 0, ',', '.'), 15, ' ', STR_PAD_LEFT) . "\n");

    //         $printer->cut();
    //         $printer->close();
    //     } catch (\Exception $e) {
    //         return response(['message' => 'GAGAL MENCETAK STRUK.' . $e->getMessage()], 500);
    //     }
    // }

    public function report(Request $request)
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

        $text = '';

        $text .= str_pad('TANGGAL', 15, ' ') . ' : ' . date('d-M-Y', strtotime($request->date)) . "\n";
        $text .= str_pad('DARI JAM', 15, ' ') . ' : ' . date('d-M-Y H:i', strtotime($userLog ? $userLog->created_at : strtotime(date('Y-m-d 00:00:00'))))  . "\n";
        $text .= str_pad('SAMPAI JAM', 15, ' ') . ' : ' . date('d-M-Y H:i')  . "\n";
        $text .= str_pad('PETUGAS', 15, ' ') . ' : ' . strtoupper($request->user()->name) . "\n\n";

        // REGULER SECTION
        $text .= "REGULER\n";
        $subTotalReguler = ['jumlah' => 0, 'pendapatan' => 0];

        foreach ($pendapatanReguler as $d) {
            $subTotalReguler['jumlah'] += $d->jumlah;
            $subTotalReguler['pendapatan'] += $d->pendapatan;

            $text .= str_pad('-- ' . $d->vehicle_type, 15, ' ')
                . str_pad($d->jumlah, 5, ' ', STR_PAD_LEFT)
                . str_pad(number_format($d->pendapatan, 0, ',', '.'), 15, ' ', STR_PAD_LEFT) . "\n";
        }

        $text .= str_pad('SUB TOTAL', 15, ' ')
            . str_pad($subTotalReguler['jumlah'], 5, ' ', STR_PAD_LEFT)
            . str_pad(number_format($subTotalReguler['pendapatan'], 0, ',', '.'), 15, ' ', STR_PAD_LEFT) . "\n\n";


        // MEMBER SECTION
        $text .= "MEMBER\n";
        $subTotalMember = ['jumlah' => 0];

        foreach ($trxMember as $d) {
            $subTotalMember['jumlah'] += $d->jumlah;
            $text .= str_pad('-- ' . $d->vehicle_type, 15, ' ') . str_pad($d->jumlah, 5, ' ', STR_PAD_LEFT) . "\n";
        }

        $text .= str_pad('SUB TOTAL', 15, ' ') . str_pad($subTotalMember['jumlah'], 5, ' ', STR_PAD_LEFT) . "\n\n";

        // DRIVE THRU SECTION
        $text .= "DRIVE THRU\n";
        $subTotalDriveThru = ['jumlah' => 0];

        foreach ($trxDriveThru as $d) {
            $subTotalDriveThru['jumlah'] += $d->jumlah;
            $text .= str_pad('-- ' . $d->vehicle_type, 15, ' ') . str_pad($d->jumlah, 5, ' ', STR_PAD_LEFT) . "\n";
        }

        $text .= str_pad('SUB TOTAL', 15, ' ') . str_pad($subTotalDriveThru['jumlah'], 5, ' ', STR_PAD_LEFT) . "\n\n";

        $text .= str_pad('GRAND TOTAL', 15, ' ')
            . str_pad(' ', 5, ' ', STR_PAD_LEFT)
            . str_pad(number_format($subTotalReguler['pendapatan'], 0, ',', '.'), 15, ' ', STR_PAD_LEFT) . "\n";


        return $text;
    }
}
