<?php

namespace App\Http\Controllers;

use App\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\Printer;

class ReportController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:1');
    }

    public function getTransaction(Request $request)
    {
        $request->validate([
            'dateRange' => 'required',
            'group' => 'required|in:vehicle_type,is_member,drive_thru'
        ]);

        return DB::select('
            SELECT ' . $request->group . ', COUNT(id) AS `total`
            FROM parking_transactions
            WHERE DATE(updated_at) BETWEEN :start AND :stop
            GROUP BY ' . $request->group, [
            ':start' => $request->dateRange[0],
            ':stop' => $request->dateRange[1],
        ]);
    }

    public function getIncome(Request $request)
    {
        return DB::select('
            SELECT vehicle_type, SUM(fare) AS `total`
            FROM parking_transactions
            WHERE DATE(time_in) BETWEEN :start AND :stop
            GROUP BY vehicle_type', [
            ':start' => $request->dateRange[0],
            ':stop' => $request->dateRange[1]
        ]);
    }

    public function pendapatan(Request $request)
    {
        $perKendaraan = DB::select('
            SELECT vehicle_type,
                COUNT(id) AS jumlah,
                SUM(fare) AS `pendapatan`,
                SUM(IF(is_member = 1, 1, 0)) AS member,
                SUM(IF(drive_thru = 1, 1, 0)) AS drive_thru,
                SUM(CASE WHEN is_member = 0 AND drive_thru = 0 THEN 1 ELSE 0 END) AS reguler
            FROM parking_transactions
            WHERE DATE(time_in) BETWEEN :start AND :stop
            GROUP BY vehicle_type', [
            ':start' => $request->dateRange[0],
            ':stop' => $request->dateRange[1]
        ]);

        $perPetugas = DB::select('
            SELECT operator,
                COUNT(id) AS jumlah,
                SUM(fare) AS `pendapatan`,
                SUM(IF(is_member = 1, 1, 0)) AS member,
                SUM(IF(drive_thru = 1, 1, 0)) AS drive_thru,
                SUM(CASE WHEN is_member = 0 AND drive_thru = 0 THEN 1 ELSE 0 END) AS reguler
            FROM parking_transactions
            WHERE DATE(time_in) BETWEEN :start AND :stop
            GROUP BY operator', [
            ':start' => $request->dateRange[0],
            ':stop' => $request->dateRange[1]
        ]);

        $data = [
            'dateRange' => $request->dateRange,
            'perKendaraan' => $perKendaraan,
            'perPetugas' => $perPetugas,
        ];

        $setting = Setting::first();

        if ($request->action == 'print') {
            $data['setting'] = $setting;
            return view('print_report', $data);
        } else if ($request->action == 'export') {
            return $data;
        } else if ($request->action == 'print-struk') {
            return $this->printStruk($data, $request->dateRange);
        } else {
            return view('report', $data);
        }
    }

    protected function printStruk($data, $dateRange)
    {
        $setting = Setting::first();

        if (!$setting) {
            return response(['message' => 'BELUM ADA SETTING'], 500);
        }

        try {
            if ($setting->printer_ip_address) {
                $connector = new NetworkPrintConnector($setting->printer_ip_address, 9100);
            }
            if ($setting->printer_device) {
                $connector = new FilePrintConnector($setting->printer_device);
            }
            $printer = new Printer($connector);
        } catch (\Exception $e) {
            return response(['message' => 'KONEKSI KE PRINTER GAGAL. ' . $e->getMessage()], 500);
        }

        try {
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->text("LAPORAN PENDAPATAN PARKIR\n");
            $printer->text($setting->location_name . "\n");
            $printer->text(date('d-M-Y', strtotime($dateRange[0])) . " s.d " . date('d-M-Y', strtotime($dateRange[1])) . "\n\n");



            // BERDASARKAN JENIS KENDARAAN
            $printer->text("BERDASARKAN JENIS KENDARAAN\n");
            $printer->setJustification(Printer::JUSTIFY_LEFT);
            $totalByJenisKendaraan = ['jumlah' => 0, 'pendapatan' => 0];

            foreach ($data['perKendaraan'] as $d) {
                $totalByJenisKendaraan['jumlah'] += $d->jumlah;
                $totalByJenisKendaraan['pendapatan'] += $d->pendapatan;

                $printer->text("{$d->vehicle_type} \n");

                $printer->text(str_pad('-- REGULER', 15, ' ')
                    . str_pad($d->reguler, 5, ' ', STR_PAD_LEFT)
                    . str_pad(number_format($d->pendapatan, 0, ',', '.'), 15, ' ', STR_PAD_LEFT) . "\n");

                $printer->text(str_pad('-- MEMBER', 15, ' ')
                    . str_pad($d->member, 5, ' ', STR_PAD_LEFT) . "\n");

                $printer->text(str_pad('-- DRIVE THRU', 15, ' ')
                    . str_pad($d->drive_thru, 5, ' ', STR_PAD_LEFT) . "\n");

                $printer->text(str_pad('-- SUBTOTAL', 15, ' ')
                    . str_pad($d->jumlah, 5, ' ', STR_PAD_LEFT)
                    . str_pad(number_format($d->pendapatan, 0, ',', '.'), 15, ' ', STR_PAD_LEFT) . "\n\n");
            }

            $printer->text(str_pad('TOTAL', 15, ' ')
                . str_pad($totalByJenisKendaraan['jumlah'], 5, ' ', STR_PAD_LEFT)
                . str_pad(number_format($totalByJenisKendaraan['pendapatan'], 0, ',', '.'), 15, ' ', STR_PAD_LEFT) . "\n\n");

            // BERDASARKAN PETUGAS
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->text("BERDASARKAN PETUGAS\n");
            $printer->setJustification(Printer::JUSTIFY_LEFT);
            $totalByPetugas = ['jumlah' => 0, 'pendapatan' => 0];

            foreach ($data['perPetugas'] as $d) {
                $totalByPetugas['jumlah'] += $d->jumlah;
                $totalByPetugas['pendapatan'] += $d->pendapatan;

                $printer->text("{$d->operator} \n");

                $printer->text(str_pad('-- REGULER', 15, ' ')
                    . str_pad($d->reguler, 5, ' ', STR_PAD_LEFT)
                    . str_pad(number_format($d->pendapatan, 0, ',', '.'), 15, ' ', STR_PAD_LEFT) . "\n");

                $printer->text(str_pad('-- MEMBER', 15, ' ')
                    . str_pad($d->member, 5, ' ', STR_PAD_LEFT) . "\n");

                $printer->text(str_pad('-- DRIVE THRU', 15, ' ')
                    . str_pad($d->drive_thru, 5, ' ', STR_PAD_LEFT) . "\n");

                $printer->text(str_pad('-- SUBTOTAL', 15, ' ')
                    . str_pad($d->jumlah, 5, ' ', STR_PAD_LEFT)
                    . str_pad(number_format($d->pendapatan, 0, ',', '.'), 15, ' ', STR_PAD_LEFT) . "\n\n");
            }

            $printer->text(str_pad('TOTAL', 15, ' ')
                . str_pad($totalByPetugas['jumlah'], 5, ' ', STR_PAD_LEFT)
                . str_pad(number_format($totalByPetugas['pendapatan'], 0, ',', '.'), 15, ' ', STR_PAD_LEFT) . "\n\n");

            $printer->cut();
            $printer->close();
        } catch (\Exeption $e) {
            return response(['message' => 'GAGAL MENCETAK STRUK.' . $e->getMessage()], 500);
        }

        return ['message' => 'SILAKAN AMBIL STRUK'];
    }
}
