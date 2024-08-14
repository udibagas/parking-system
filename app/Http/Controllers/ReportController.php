<?php

namespace App\Http\Controllers;

use App\Models\JenisKendaraan;
use App\Models\ParkingTransaction;
use App\Models\Pos;
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

    public function reportPerPos(Request $request)
    {
        $jenisKendaraan = JenisKendaraan::all();
        $countQuery = '';
        $sumQuery = '';

        foreach ($jenisKendaraan as $k) {
            $col = $k->nama;
            $countQuery .= "COUNT(IF(pt.jenis_kendaraan='{$col}', 1, null)) AS '{$col}_count',";
            $sumQuery .= "SUM(IF(pt.jenis_kendaraan='{$col}', pt.tarif + pt.denda, 0)) AS '{$col}_sum',";
        }

        $query = "SELECT
            DATE(pt.time_out) AS Tanggal,
            s.nama AS Shift,
            u.name AS Petugas,
            {$countQuery}
            COUNT(pt.time_out) AS Jumlah,
            {$sumQuery}
            SUM(pt.tarif + pt.denda) AS Total
        FROM
            parking_transactions pt
        JOIN gate_outs go ON
            go.id = pt.gate_out_id
        JOIN pos p ON
            p.id = go.pos_id
        JOIN shifts s ON
            s.id = pt.shift_id
        JOIN users u ON
            u.id = pt.user_id
        WHERE
            p.id = ?
            AND pt.time_out IS NOT NULL
            AND DATE(pt.time_out) BETWEEN ? AND ?
        GROUP BY
            Tanggal,
            Shift,
            Petugas
        ";

        $data = DB::select($query, [$request->pos_id, ...$request->dateRange]);
        return $data;
    }

    public function printHarian(Request $request)
    {
        $setting = Setting::first();
        $pos = Pos::find($request->pos_id);

        if (!$pos) {
            return response(['message' => 'Pos tidak ditemukan'], 404);
        }

        $selectedPrinter = AppPrinter::find($pos->printer_id);

        if (!$selectedPrinter) {
            return response(['message' => 'Printer tidak ditemukan'], 404);
        }

        $date = $request->dateRange[0];

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
            $printer->text("LAPORAN HARIAN {$pos->nama}\n");
            $printer->text($setting->nama_lokasi . "\n");
            $printer->text('POS: ' . $pos->nama . "\n");
            $printer->text('Tanggal: ' . date('d-m-Y', strtotime($date)));
            $printer->text("\n\n");
            $printer->setJustification(Printer::JUSTIFY_LEFT);

            // kalau mintanya pakai range tinggal di looping berdasarkan date range
            // get summary by date, shift and operator
            $query = "SELECT
                pt.user_id,
                pt.shift_id,
                s.nama AS shift,
                u.name AS petugas,
                SUM(pt.tarif + pt.denda) as total
            FROM
                parking_transactions pt
            JOIN shifts s ON
                s.id = pt.shift_id
            JOIN users u ON
                u.id = pt.user_id
            JOIN gate_outs go ON
                go.id = pt.gate_out_id
            WHERE
                DATE(pt.time_out) = ?
                AND go.pos_id = ?
            ";

            $data = DB::query($query, [$date, $pos->id]);
            foreach ($data as $d) {
                $printer->text(
                    str_pad($d->shift, 15)
                        . str_pad($d->petugas, 15)
                        . str_pad(number_format($d->total, 0, ',', ','), 15)
                );

                // get summary by jenis_kendaraan
                $query = "SELECT
                    jenis_kendaraan,
                    COUNT(time_out) AS jumlah,
                    SUM(tarif + denda) AS total
                FROM
                    parking_transactions pt
                JOIN gate_outs go ON
                    go.id = pt.gate_out_id
                WHERE
                    DATE(time_out) = ?
                    AND user_id = ?
                    AND shift_id = ?
                    AND go.pos_id = ?
                GROUP BY jenis_kendaraan
                ";

                $queryTotal = "SELECT
                    SUM(tarif + denda) AS total
                FROM parking_transactions pt
                JOIN gate_outs go ON
                    go.id = pt.gate_out_id
                WHERE
                    DATE(time_out) = ?
                    AND user_id = ?
                    AND shift_id = ?
                    AND go.pos_id = ?
                ";

                $values = [$date, $d->user_id, $d->shift_id, $pos->id];
                $dataDetail = DB::query($query, $values);
                $dataTotal = DB::query($queryTotal, $values);

                foreach ($dataDetail as $dd) {
                    $printer->text(
                        str_pad(" - " . $dd->jenis_kendaraan, 15)
                            . str_pad($dd->jumlah, 15)
                            . str_pad(number_format($dd->total, 0, ',', ','), 15)
                    );
                }

                foreach ($dataTotal as $dt) {
                    $printer->text(
                        str_pad('TOTAL', 30)
                            . str_pad(number_format($dt->total, 0, ',', ','), 15)
                    );
                }

                $printer->text("\n");
            }

            $queryAll = "SELECT
                s.nama AS shift,
                SUM(pt.tarif + pt.denda) AS total
            FROM
                parking_transactions pt
            JOIN shifts s ON
                s.id = pt.shift_id
            JOIN gate_outs go ON
                go.id = pt.gate_out_id
            WHERE
                DATE(pt.time_out) = ?
                AND go.pos_id = ?
            GROUP BY shift
            ORDER BY s.id ASC
            ";

            $querySumAll = "SELECT SUM(tarif + denda) AS total
            FROM
                parking_transactions pt
            JOIN gate_outs go ON
                go.id = pt.gate_out_id
            WHERE
                DATE(time_out) = ?
                AND go.pos_id = ?
            ";

            $printer->text("\nTOTAL PENDAPATAN");
            $dataAll = DB::query($queryAll, [$date, $pos->id]);
            $dataSumAll = DB::query($querySumAll, [$date, $pos->id]);

            foreach ($dataAll as $da) {
                $printer->text(
                    str_pad(" - " . $da->shift, 30)
                        . str_pad(number_format($da->total, 0, ',', ','), 15)
                );
            }

            foreach ($dataSumAll as $ds) {
                $printer->text(
                    str_pad("TOTAL", 30)
                        . str_pad(number_format($ds->total, 0, ',', ','), 15)
                );
            }

            $printer->cut();
            $printer->close();
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MENCETAK SLIP.' . $e->getMessage()], 500);
        }

        return ['message' => 'SILAKAN AMBIL SLIP'];
    }
}
