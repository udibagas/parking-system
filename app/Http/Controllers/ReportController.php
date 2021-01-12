<?php

namespace App\Http\Controllers;

use App\JenisKendaraan;
use App\ParkingTransaction;
use App\Setting;
use App\Shift;
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
        $shifts = Shift::orderBy('mulai', 'asc')->get();

        $data = JenisKendaraan::orderBy('nama', 'asc')->get()->map(function ($item) use ($request, $shifts) {
            $data = ['Jenis Kendaraan' => $item->nama];

            foreach ($shifts as $shift) {
                $data[$shift->nama] = ParkingTransaction::where('jenis_kendaraan', $item->nama)
                    ->whereRaw('DATE(time_in) BETWEEN ? AND ?', [$request->dateRange[0], $request->dateRange[1]])
                    ->where('shift_id', $shift->id)
                    ->where('time_out', null)
                    ->count();
            }

            $data['Total'] = ParkingTransaction::where('jenis_kendaraan', $item->nama)
                ->whereRaw('DATE(time_in) BETWEEN ? AND ?', [$request->dateRange[0], $request->dateRange[1]])
                ->where('time_out', null)
                ->count();

            return $data;
        })->toArray();

        $length = count($data);
        $data[$length] = ['Jenis Kendaraan' => 'TOTAL'];

        foreach ($shifts as $shift) {
            $data[$length][$shift->nama] = ParkingTransaction::where('time_out', null)
                ->whereRaw('DATE(time_in) BETWEEN ? AND ?', [$request->dateRange[0], $request->dateRange[1]])
                ->where('shift_id', $shift->id)
                ->count();
        }

        $data[$length]['Total'] = ParkingTransaction::where('time_out', null)
            ->whereRaw('DATE(time_in) BETWEEN ? AND ?', [$request->dateRange[0], $request->dateRange[1]])
            ->count();

        return $data;
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

    public function summary()
    {
        $today = ParkingTransaction::whereRaw('DATE(time_out) = ?', [date('Y-m-d')])
            ->whereYear('time_out', date('Y'))
            ->selectRaw('SUM(tarif + denda) AS total')->first()->total;

        $thisMonth = ParkingTransaction::whereMonth('time_out', date('m'))
            ->whereYear('time_out', date('Y'))
            ->selectRaw('SUM(tarif + denda) AS total')->first()->total;

        $total = ParkingTransaction::whereYear('time_out', date('Y'))
            ->selectRaw('SUM(tarif + denda) AS total')->first()->total;

        return [
            'today' => $today ?: 0,
            'this_month' => $thisMonth ?: 0,
            'total' => $total ?: 0
        ];
    }
}
