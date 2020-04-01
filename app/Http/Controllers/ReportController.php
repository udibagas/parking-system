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
        return DB::select('
            SELECT vehicle_type, COUNT(id) AS `total`
            FROM parking_transactions
            WHERE DATE(updated_at) BETWEEN :start AND :stop
            GROUP BY vehicle_type', [
            ':start' => $request->dateRange[0],
            ':stop' => $request->dateRange[1]
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

    public function getParkedVehicle(Request $request)
    {
        return DB::select('
            SELECT vehicle_type, COUNT(id) AS `total`
            FROM parking_transactions
            WHERE DATE(updated_at) BETWEEN :start AND :stop
            GROUP BY vehicle_type', [
            ':start' => $request->dateRange[0],
            ':stop' => $request->dateRange[1]
        ]);
    }

    public function getVehicleIn(Request $request)
    {
        return DB::select('
            SELECT parking_gates.name AS `gate`, COUNT(parking_transactions.id) AS `total`
            FROM parking_transactions
            JOIN parking_gates ON parking_gates.id = parking_transactions.gate_in_id
            WHERE DATE(parking_transactions.updated_at) BETWEEN :start AND :stop
            GROUP BY `gate`', [
            ':start' => $request->dateRange[0],
            ':stop' => $request->dateRange[1]
        ]);
    }

    public function pendapatan(Request $request)
    {
        $perKendaraan = DB::select('
            SELECT vehicle_type,
                COUNT(id) AS jumlah,
                SUM(fare) AS `pendapatan`
            FROM parking_transactions
            WHERE DATE(time_in) BETWEEN :start AND :stop
            GROUP BY vehicle_type', [
            ':start' => $request->dateRange[0],
            ':stop' => $request->dateRange[1]
        ]);

        $perPetugas = DB::select('
            SELECT operator,
                COUNT(id) AS jumlah,
                SUM(fare) AS `pendapatan`
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
