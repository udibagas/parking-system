<?php

namespace App\Http\Controllers;

use App\Models\JenisKendaraan;
use App\Models\ParkingTransaction;
use App\Models\Setting;
use App\Models\Shift;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Printer as AppPrinter;
use Mike42\Escpos\Printer;
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;

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
                SUM(CASE WHEN is_member = 1 THEN 1 ELSE 0 END) AS jumlah_member,
                SUM(CASE WHEN is_member = 0 THEN 1 ELSE 0 END) AS jumlah_reguler,
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
                SUM(CASE WHEN is_member = 1 THEN 1 ELSE 0 END) AS jumlah_member,
                SUM(CASE WHEN is_member = 0 THEN 1 ELSE 0 END) AS jumlah_reguler,
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
            if ($request->printer_id) {
                return $this->printSlip($data, $request->printer_id);
            } else {
                return view('print_report', $data);
            }
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

    public function totalByGroup(Request $request)
    {
        $request->validate(['date' => 'required|array', 'group' => 'required']);

        $sql = <<<SQL
            SELECT
                COUNT(id) AS `value`,
                `jenis_kendaraan` AS `name`
            FROM parking_transactions
            WHERE DATE(time_out) BETWEEN ? AND ?
                AND `group` = ?
            GROUP BY `name`
        SQL;

        return DB::select($sql, [...$request->date, $request->group]);
    }

    public function sumByGroup(Request $request)
    {
        $request->validate(['date' => 'required|array', 'group' => 'required']);

        $sql = <<<SQL
            SELECT
                SUM(tarif + denda) AS `value`,
                `jenis_kendaraan` AS `name`
            FROM parking_transactions
            WHERE DATE(time_out) BETWEEN ? AND ?
                AND `group` = ?
            GROUP BY `name`
        SQL;

        return DB::select($sql, [...$request->date, $request->group]);
    }

    protected function printSlip($data, $printer_id)
    {
        $setting = Setting::first();

        if (!$setting) {
            return response(['message' => 'BELUM ADA SETTING'], 500);
        }

        if (!$setting->nama_lokasi) {
            return response(['message' => 'LOKASI BELUM DISET'], 500);
        }

        $selectedPrinter = AppPrinter::find($printer_id);

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
            $printer->text("LAPORAN PENDAPATAN PARKIR\n");
            $printer->text($setting->nama_lokasi . "\n");
            $printer->text('Tanggal: ' . date('d-m-Y', strtotime($data['dateRange'][0])) . ' s/d ' . date('d-m-Y', strtotime($data['dateRange'][1])));
            $printer->text("\n\n");
            $printer->text("LAPORAN PENDAPATAN PER JENIS KENDARAAN\n\n");
            $printer->setJustification(Printer::JUSTIFY_LEFT);

            foreach ($data['perKendaraan'] as $d) {
                $printer->text("+ " . $d->jenis_kendaraan);
                $printer->text("\n");
                $printer->text(str_pad(' - Member', 15, ' ') . ' : ' . number_format($d->jumlah_member, 0, ',', '.'));
                $printer->text("\n");
                $printer->text(str_pad(' - Reguler', 15, ' ') . ' : ' . number_format($d->jumlah_reguler, 0, ',', '.'));
                $printer->text("\n");
                $printer->text(str_pad(' - Total', 15, ' ') . ' : ' . number_format($d->jumlah_member + $d->jumlah_reguler, 0, ',', '.'));
                $printer->text("\n");
                $printer->text(str_pad(' - Pendapatan', 15, ' ') . ' : Rp ' . number_format($d->pendapatan + $d->denda, 0, ',', '.'));
                $printer->text("\n\n");
            }

            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->text("LAPORAN PENDAPATAN PER PETUGAS\n\n");
            $printer->setJustification(Printer::JUSTIFY_LEFT);
            foreach ($data['perPetugas'] as $d) {
                $printer->text("+ " . $d->operator);
                $printer->text("\n");
                $printer->text(str_pad(' - Member', 15, ' ') . ' : ' . number_format($d->jumlah_member, 0, ',', '.'));
                $printer->text("\n");
                $printer->text(str_pad(' - Reguler', 15, ' ') . ' : ' . number_format($d->jumlah_reguler, 0, ',', '.'));
                $printer->text("\n");
                $printer->text(str_pad(' - Total', 15, ' ') . ' : ' . number_format($d->jumlah_member + $d->jumlah_reguler, 0, ',', '.'));
                $printer->text("\n");
                $printer->text(str_pad(' - Pendapatan', 15, ' ') . ' : Rp ' . number_format($d->pendapatan + $d->denda, 0, ',', '.'));
                $printer->text("\n");
            }

            $printer->cut();
            $printer->close();
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MENCETAK SLIP.' . $e->getMessage()], 500);
        }

        return ['message' => 'SILAKAN AMBIL SLIP'];
    }
}
