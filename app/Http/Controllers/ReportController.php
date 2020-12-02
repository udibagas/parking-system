<?php

namespace App\Http\Controllers;

use App\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:1');
    }

    public function getTransaction(Request $request)
    {
        $request->validate(['dateRange' => 'required']);

        return DB::select('
            SELECT jenis_kendaraan, COUNT(id) AS `total`
            FROM parking_transactions
            WHERE DATE(updated_at) BETWEEN :start AND :stop
            GROUP BY jenis_kendaraan', [
            ':start' => $request->dateRange[0],
            ':stop' => $request->dateRange[1]
        ]);
    }

    public function getIncome(Request $request)
    {
        $request->validate(['dateRange' => 'required']);

        return DB::select('
            SELECT jenis_kendaraan,
                SUM(tarif) AS `total`,
                SUM(denda) AS `denda`
            FROM parking_transactions
            WHERE DATE(time_out) BETWEEN :start AND :stop
            GROUP BY jenis_kendaraan', [
            ':start' => $request->dateRange[0],
            ':stop' => $request->dateRange[1]
        ]);
    }

    public function getParkedVehicle(Request $request)
    {
        $request->validate(['dateRange' => 'required']);

        return DB::select('
            SELECT jenis_kendaraan, COUNT(id) AS `total`
            FROM parking_transactions
            WHERE DATE(updated_at) BETWEEN :start AND :stop
                AND time_out IS NULL
            GROUP BY jenis_kendaraan', [
            ':start' => $request->dateRange[0],
            ':stop' => $request->dateRange[1]
        ]);
    }

    public function getVehicleIn(Request $request)
    {
        $request->validate(['dateRange' => 'required']);

        return DB::select('
            SELECT gate_ins.nama AS `gate`, COUNT(parking_transactions.id) AS `total`
            FROM parking_transactions
            JOIN gate_ins ON gate_ins.id = parking_transactions.gate_in_id
            WHERE DATE(parking_transactions.updated_at) BETWEEN :start AND :stop
            GROUP BY `gate`', [
            ':start' => $request->dateRange[0],
            ':stop' => $request->dateRange[1]
        ]);
    }

    public function pendapatan(Request $request)
    {
        $request->validate(['dateRange' => 'required']);

        $perKendaraan = DB::select('
            SELECT jenis_kendaraan,
                COUNT(id) AS jumlah,
                SUM(tarif) AS `pendapatan`,
                SUM(denda) AS `denda`
            FROM parking_transactions
            WHERE DATE(time_out) BETWEEN :start AND :stop
                AND time_out IS NOT NULL
            GROUP BY jenis_kendaraan', [
            ':start' => $request->dateRange[0],
            ':stop' => $request->dateRange[1]
        ]);

        $perPetugas = DB::select('
            SELECT operator,
                COUNT(id) AS jumlah,
                SUM(tarif) AS `pendapatan`,
                SUM(denda) AS `denda`
            FROM parking_transactions
            WHERE DATE(time_out) BETWEEN :start AND :stop
                AND time_out IS NOT NULL
            GROUP BY operator', [
            ':start' => $request->dateRange[0],
            ':stop' => $request->dateRange[1]
        ]);

        $data = [
            'dateRange' => $request->dateRange,
            'perKendaraan' => $perKendaraan,
            'perPetugas' => $perPetugas,
        ];

        if ($request->action == 'print') {
            $data['setting'] = Setting::first();
            return view('print_report', $data);
        } else if ($request->action == 'export') {
            return $data;
        } else {
            return view('report', $data);
        }
    }
}
