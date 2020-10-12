<?php

namespace App\Http\Controllers;

use App\GateIn;
use App\GateOut;
use Illuminate\Http\Request;
use App\ParkingTransaction;
use App\Http\Requests\ParkingTransactionRequest;
use App\Jobs\PrintTicketIn;
use App\Jobs\TakeSnapshot;
use App\Member;
use App\Notifications\PrintTicketFailedNotification;
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\Printer;
use App\ParkingGate;
use App\ParkingMember;
use App\Setting;
use App\User;
use App\UserLog;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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
                parking_members.name as `member`,
                parking_gate_in.name as `gate_in`,
                parking_gate_out.name as `gate_out`
            ')
            ->join('parking_members', 'parking_members.id', '=', 'parking_transactions.parking_member_id', 'LEFT')
            ->join('parking_gates AS parking_gate_in', 'parking_gate_in.id', '=', 'parking_transactions.gate_in_id', 'LEFT')
            ->join('parking_gates AS parking_gate_out', 'parking_gate_out.id', '=', 'parking_transactions.gate_out_id', 'LEFT')
            ->when($request->dateRange, function ($q) use ($request) {
                return $q->whereBetween('parking_transactions.time_in', $request->dateRange);
            })->when($request->keyword, function ($q) use ($request) {
                return $q->where(function ($qq) use ($request) {
                    return $qq->where('parking_transactions.nomor_barcode', 'LIKE', '%' . $request->keyword . '%')
                        ->orWhere('parking_transactions.plat_nomor', 'LIKE', '%' . $request->keyword . '%')
                        ->orWhere('parking_transactions.card_number', 'LIKE', '%' . $request->keyword . '%')
                        ->orWhere('parking_transactions.operator', 'LIKE', '%' . $request->keyword . '%')
                        ->orWhere('parking_transactions.edit_by', 'LIKE', '%' . $request->keyword . '%')
                        ->orWhere('parking_gate_in.name', 'LIKE', '%' . $request->keyword . '%')
                        ->orWhere('parking_gate_out.name', 'LIKE', '%' . $request->keyword . '%');
                });
            })->when($request->is_member, function ($q) use ($request) {
                return $q->whereIn('parking_transactions.is_member', $request->is_member);
            })->when($request->jenis_kendaraan, function ($q) use ($request) {
                return $q->whereIn('parking_transactions.jenis_kendaraan', $request->jenis_kendaraan);
            })->when($request->gate_in_id, function ($q) use ($request) {
                return $q->whereIn('parking_transactions.gate_in_id', $request->gate_in_id);
            })->when($request->gate_out_id, function ($q) use ($request) {
                return $q->whereIn('parking_transactions.gate_out_id', $request->gate_out_id);
            })->when($request->denda, function ($q) use ($request) {
                if ($request->denda[0] == 'Y') {
                    return $q->where('denda', '>', 0);
                }
                if ($request->denda[0] == 'T') {
                    return $q->where('denda', 0);
                }
            })->when($request->edit, function ($q)  use ($request) {
                if ($request->edit[0] == 'Y') {
                    return $q->where('edit', 1);
                }
                if ($request->edit[0] == 'T') {
                    return $q->where('edit', 0);
                }
            })->when($request->manual, function ($q)  use ($request) {
                if ($request->manual[0] == 'Y') {
                    return $q->where('manual', 1);
                }
                if ($request->manual[0] == 'T') {
                    return $q->where('manual', 0);
                }
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
        $input['time_in'] = now();

        if ($request->manual) {
            $input['nomor_barcode'] = Str::random(5);
            $input['is_member'] = 0;
            $input['manual'] = 1;

            $request->validate([
                'plat_nomor' => 'required',
                'jenis_kendaraan' => 'required',
                'gate_in_id' => 'required',
                'gate_out_id' => 'required',
                'time_in' => 'required',
                'time_out' => 'required',
                'username' => ['required', function ($attribute, $value, $fail) {
                    $user = User::where('role', 1)->where('status', 1)->where('name', 'LIKE', $value)->first();
                    if (!$user) {
                        $fail('User admin tidak terdaftar');
                    }
                }],
                'password' => ['required', function ($attribute, $value, $fail) use ($request) {
                    $user = User::where('role', 1)->where('status', 1)
                        ->where('name', 'LIKE', $request->username)
                        ->first();

                    if (!$user) {
                        $fail('User admin tidak terdaftar');
                    } else if (!password_verify($value, $user->password)) {
                        $fail('User/password admin tidak sesuai');
                    }
                }],
            ], [], [
                'plat_nomor' => 'Plat Nomor',
                'jenis_kendaraan' => 'Jenis Kendaraan',
                'gate_in_id' => 'Gate Masuk',
                'gate_out_id' => 'Gate Keluar',
                'time_in' => 'Waktu Masuk',
                'time_out' => 'Waktu Keluar',
                'username' => 'User Admin',
                'password' => 'Password Admin'
            ]);
        }

        if (auth()->check()) {
            $input['operator'] = auth()->user()->name;
        }

        if ($request->is_member) {
            Member::where('id', $request->member_id)->update([
                'last_transaction' => now()
            ]);
        }

        return ParkingTransaction::create($input);
    }

    // untuk handle waktu gate in tertrigger
    public function apiStore(Request $request)
    {
        $request->validate([
            'gate_in_id' => 'required',
            'vehicle_tye' => 'required',
        ]);

        $input = array_merge($request->all(), [
            'nomor_barcode' => Str::random(5),
            'time_in' => now()
        ]);

        $parkingTransaction = ParkingTransaction::create($input);
        TakeSnapshot::dispatch($parkingTransaction->gateIn, $parkingTransaction);

        if (!$request->is_member) {
            PrintTicketIn::dispatch($parkingTransaction);
        }

        if ($request->is_member) {
            Member::where('id', $request->member_id)->update([
                'last_transaction' => now()
            ]);
        }

        return [
            'message' => 'Data berhasil disimpan',
            'data' => $parkingTransaction,
        ];
    }

    public function printTicketOut(ParkingTransaction $parkingTransaction)
    {
        $setting = Setting::first();

        if (!$setting) {
            return response(['message' => 'BELUM ADA SETTING'], 500);
        }

        if (!$setting->nama_lokasi) {
            return response(['message' => 'LOKASI BELUM DISET'], 404);
        }

        $printer = $parkingTransaction->gateIn->printer;

        try {
            $connector = new NetworkPrintConnector($printer->ip_address, $printer->ip_address ?: 9100);
            $p = new Printer($connector);
        } catch (\Exception $e) {
            return response(['message' => 'KONEKSI KE PRINTER GAGAL. ' . $e->getMessage()], 500);
        }

        try {
            $p->setJustification(Printer::JUSTIFY_CENTER);
            $p->text("STRUK PARKIR\n");
            $p->text($setting->nama_lokasi . "\n");
            $p->text($setting->alamat_lokasi . "\n\n");

            $p->text('Rp. ' . number_format($parkingTransaction->tarif + $parkingTransaction->denda, 0, ',', '.') . ",-\n");
            $p->text($parkingTransaction->plat_nomor . "/" . $parkingTransaction->jenis_kendaraan . "/" . $parkingTransaction->gateOut->nama);
            $p->text("\n\n");

            $p->setJustification(Printer::JUSTIFY_LEFT);
            $p->text(str_pad('WAKTU MASUK', 15, ' ') . ' : ' . $parkingTransaction->time_in . "\n");
            $p->text(str_pad('WAKTU KELUAR', 15, ' ') . ' : ' . $parkingTransaction->time_out . "\n");
            $p->text(str_pad('DURASI', 15, ' ') . ' : ' . $parkingTransaction->durasi . "\n");

            // kalau tiket hilang
            if ($parkingTransaction->nomor_barcode == 'xxxxx' || $parkingTransaction->denda > 0) {
                $p->text(str_pad('DENDA', 15, ' ') . ' : Rp. ' . number_format($parkingTransaction->denda, 0, ',', '.') . "\n");
            }

            $p->text(str_pad('PETUGAS', 15, ' ') . ' : ' . strtoupper(auth()->user()->name) . "\n\n");

            $p->setJustification(Printer::JUSTIFY_CENTER);
            $p->text("TERIMAKASIH ATAS KUNJUNGAN ANDA\n");

            $p->cut();
            $p->close();
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MENCETAK STRUK.' . $e->getMessage()], 500);
        }

        return ['message' => 'SILAKAN AMBIL TIKET'];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        // untuk print last trx
        if ($request->gate_out_id) {
            $data = ParkingTransaction::where('gate_out_id', $request->gate_out_id)
                ->orderBy('time_out', 'desc')
                ->first();

            if (!$data) {
                return response(['message' => 'BELUM ADA TRANSAKSI'], 404);
            }

            return $data;
        }

        // ambil transaksi terakhir yg blm tap out
        $data = ParkingTransaction::with(['member'])->when($request->nomor_barcode, function ($q) use ($request) {
            $q->where(function ($q) use ($request) {
                $q->where('nomor_barcode', $request->nomor_barcode)
                    ->orWhere('nomor_kartu', $request->nomor_barcode);
            });
        })->whereNull('time_out')->orderBy('id', 'DESC')->first();

        if ($data) {
            // kalau member cek dulu ada yg masih blm tap out ga selain data yg ini
            if ($data->is_member) {
                ParkingTransaction::where('member_id', $data->member_id)
                    ->where('id', '<', $data->id)
                    ->whereNull('time_out')
                    ->update([
                        'time_out' => now(),
                        'operator' => $request->user()->name,
                        'user_id' => $request->user()->id,
                        'gate_out_id' => GateOut::where('status', true)->first()->id
                    ]);
            }

            return $data;
        }

        // member, tapi gak tap in karena rusak gate in
        $member = Member::where('nomor_kartu', $request->nomor_barcode)->first();

        if ($member) {
            if (!$member->status) {
                return response(['message' => 'KARTU TIDAK AKTIF'], 500);
            }

            if (strtotime($member->expiry_date) < strtotime(date('Y-m-d'))) {
                return response(['message' => 'KARTU SUDAH KEDALUARSA'], 500);
            }

            $data = [
                'nomor_barcode' => 'NOTAP',
                'jenis_kendaraan' => $member->vehicles[0]->jenis_kendaraan,
                'is_member' => true,
                'parking_member_id' => $member->id,
                'time_in' => now(),
                'gate_in_id' => GateIn::where('status', true)->first()->id,
                'card_number' => $member->card_number
            ];

            $trx = ParkingTransaction::create($data);
            return $trx->load(['member']);
        }

        return response(['message' => 'NOMOR TIKET/KARTU INVALID'], 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ParkingTransactionRequest $request, ParkingTransaction $parkingTransaction)
    {
        $input = $request->all();

        if ($request->edit) {
            $request->validate([
                'plat_nomor' => 'required',
                'jenis_kendaraan' => 'required',
                'gate_in_id' => 'required',
                'gate_out_id' => 'required',
                'time_in' => 'required',
                'time_out' => 'required',
                'username' => ['required', function ($attribute, $value, $fail) {
                    $user = User::where('role', 1)->where('status', 1)->where('name', 'LIKE', $value)->first();
                    if (!$user) {
                        $fail('User admin tidak terdaftar');
                    }
                }],
                'password' => ['required', function ($attribute, $value, $fail) use ($request) {
                    $user = User::where('role', 1)->where('status', 1)
                        ->where('name', 'LIKE', $request->username)
                        ->first();

                    if (!$user) {
                        $fail('User admin tidak terdaftar');
                    }

                    if (!password_verify($value, $user->password)) {
                        $fail('User/password admin tidak sesuai');
                    }
                }],
            ], [], [
                'plat_nomor' => 'Plat Nomor',
                'jenis_kendaraan' => 'Jenis Kendaraan',
                'gate_in_id' => 'Gate Masuk',
                'gate_out_id' => 'Gate Keluar',
                'time_in' => 'Waktu Masuk',
                'time_out' => 'Waktu Keluar',
                'username' => 'User Admin',
                'password' => 'Password Admin'
            ]);

            $input['edit_by'] = auth()->user()->name;
        }

        if (auth()->check() && !$request->edit) {
            $input['user_id'] = auth()->user()->id;
            $input['operator'] = auth()->user()->name;
        }

        if ($request->is_member) {
            Member::where('id', $request->member_id)->update([
                'last_transaction' => now()
            ]);
        }

        // value ini ga perlu diupdate
        unset($input['nomor_kartu']);
        unset($input['nomor_barcode']);

        $parkingTransaction->update($input);
        return $parkingTransaction;
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
        // TODO: hapus snapshot
        return ['message' => 'Transaksi telah dihapus'];
    }

    public function setSudahKeluar(ParkingTransaction $parkingTransaction)
    {
        $parkingTransaction->time_out = now();
        $parkingTransaction->operator = auth()->user()->name;
        $parkingTransaction->save();
        return ['message' => 'KENDARAAN BERHASIL DISET SUDAH KELUAR'];
    }

    public function setSudahKeluarSemua(Request $request)
    {
        $sql = 'UPDATE parking_transactions
            SET time_out = :time_out,
                operator = :operator
            WHERE time_out IS NULL
                AND DATE(time_in) BETWEEN :start AND :stop';

        DB::update($sql, [
            ':time_out' => now(),
            ':operator' => $request->user()->name,
            ':start' => $request->dateRange[0],
            ':stop' => $request->dateRange[1]
        ]);

        return ['message' => 'KENDARAAN BERHASIL DISET SUDAH KELUAR'];
    }

    public function printReport(Request $request)
    {
        $request->validate([
            'gate_out_id' => 'required',
            'date' => 'required|date'
        ]);

        if (!$request->gate_out_id) {
            return response(['message' => 'Mohon pilih gate'], 400);
        }

        $setting = Setting::first();

        if (!$setting) {
            return response(['message' => 'BELUM ADA SETTING'], 500);
        }

        if (!$setting->nama_lokasi) {
            return response(['message' => 'LOKASI BELUM DISET'], 404);
        }

        $gate = GateOut::find($request->gate_out_id);

        if (!$gate) {
            return response(['message' => 'GATE TIDAK DITEMUKAN'], 404);
        }

        // ambil data transaksi per tanggal, per operator, per gate
        // reguler
        $sqlReguler = "SELECT jenis_kendaraan, COUNT(id) AS jumlah,
                SUM(tarif) AS pendapatan
            FROM parking_transactions
            WHERE time_out IS NOT NULL
                AND is_member = 0
                AND operator = :operator
                AND DATE(time_out) = :date
                AND gate_out_id = :gate_out_id
            GROUP BY jenis_kendaraan
        ";

        // ambil data transaksi per tanggal, per operator, per gate
        // denda
        $sqlDenda = "SELECT jenis_kendaraan, COUNT(id) AS jumlah,
                SUM(denda) AS pendapatan
            FROM parking_transactions
            WHERE time_out IS NOT NULL
                AND is_member = 0
                AND operator = :operator
                AND DATE(time_out) = :date
                AND gate_out_id = :gate_out_id
                AND denda > 0
            GROUP BY jenis_kendaraan
        ";

        // ambil data transaksi per tanggal, per operator, per gate
        // member
        $sqlMember = "SELECT jenis_kendaraan, COUNT(id) AS jumlah
            FROM parking_transactions
            WHERE time_out IS NOT NULL
                AND is_member = 1
                AND operator = :operator
                AND DATE(time_out) = :date
                AND gate_out_id = :gate_out_id
            GROUP BY jenis_kendaraan
        ";

        // ambil data transaksi per tanggal, per operator, per gate
        // member
        $sqlBukaManual = "SELECT COUNT(id) AS jumlah
            FROM manual_open_logs
            WHERE user_id = :user_id
                AND DATE(updated_at) = :date
                AND gate_out_id = :gate_out_id
        ";

        $pendapatanReguler = DB::select($sqlReguler, [
            ':date' => $request->date,
            ':operator' => $request->user()->name,
            ':gate_out_id' => $request->gate_out_id
        ]);

        $pendapatanDenda = DB::select($sqlDenda, [
            ':date' => $request->date,
            ':operator' => $request->user()->name,
            ':gate_out_id' => $request->gate_out_id
        ]);

        $trxMember = DB::select($sqlMember, [
            ':date' => $request->date,
            ':operator' => $request->user()->name,
            ':gate_out_id' => $request->gate_out_id
        ]);

        $bukaManual = DB::select($sqlBukaManual, [
            ':date' => $request->date,
            ':user_id' => $request->user()->id,
            ':gate_out_id' => $request->gate_out_id
        ]);

        // ambil data periode jam
        $start = DB::select('SELECT time_out
            FROM parking_transactions
            WHERE operator = :operator
                AND gate_out_id = :gate_out_id
                AND DATE(time_out) = :date
            ORDER BY time_out ASC
            ', [
            ':date' => $request->date,
            ':operator' => $request->user()->name,
            ':gate_out_id' => $request->gate_out_id
        ]);

        if (!$start) {
            return response(['message' => 'BELUM ADA TRANSAKSI'], 404);
        }

        $userLog = UserLog::where('action', 'LOGIN')
            ->whereRaw('DATE(created_at) = ?', [$request->date])
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'asc')
            ->first();

        // TODO: benerin pilih printer

        try {
            if ($gate->printer_type == "network") {
                $connector = new NetworkPrintConnector($gate->printer_ip_address, 9100);
            } else if ($gate->printer_type == "local") {
                $connector = new FilePrintConnector($gate->printer_device);
            } else {
                return response(['message' => 'INVALID PRINTER'], 500);
            }

            $printer = new Printer($connector);
        } catch (\Exception $e) {
            return response(['message' => 'KONEKSI KE PRINTER GAGAL. ' . $e->getMessage()], 500);
        }

        try {
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->text("LAPORAN PENDAPATAN PARKIR\n");
            $printer->text($setting->nama_lokasi . "\n\n");

            $printer->setJustification(Printer::JUSTIFY_LEFT);
            $printer->text(str_pad('TANGGAL', 15, ' ') . ' : ' . $request->date . "\n");
            $printer->text(str_pad('JAM', 15, ' ') . ' : ' . date('d-M-Y H:i', strtotime($userLog->created_at)) . ' - ' . date('d-M-Y H:i') . "\n");
            $printer->text(str_pad('PETUGAS', 15, ' ') . ' : ' . strtoupper($request->user()->name) . "\n\n");

            // REGULER SECTION
            $printer->text("REGULER\n");
            $subTotalReguler = ['jumlah' => 0, 'pendapatan' => 0];

            foreach ($pendapatanReguler as $d) {
                $subTotalReguler['jumlah'] += $d->jumlah;
                $subTotalReguler['pendapatan'] += $d->pendapatan;

                $printer->text(str_pad('-- ' . $d->jenis_kendaraan, 15, ' ')
                    . str_pad($d->jumlah, 5, ' ', STR_PAD_LEFT)
                    . str_pad(number_format($d->pendapatan, 0, ',', '.'), 15, ' ', STR_PAD_LEFT) . "\n");
            }

            $printer->text(str_pad('SUB TOTAL', 15, ' ')
                . str_pad($subTotalReguler['jumlah'], 5, ' ', STR_PAD_LEFT)
                . str_pad(number_format($subTotalReguler['pendapatan'], 0, ',', '.'), 15, ' ', STR_PAD_LEFT) . "\n\n");


            // DENDA SECTION
            $printer->text("DENDA\n");
            $subTotalDenda = ['jumlah' => 0, 'pendapatan' => 0];

            foreach ($pendapatanDenda as $d) {
                $subTotalDenda['jumlah'] += $d->jumlah;
                $subTotalDenda['pendapatan'] += $d->pendapatan;

                $printer->text(str_pad('-- ' . $d->jenis_kendaraan, 15, ' ')
                    . str_pad($d->jumlah, 5, ' ', STR_PAD_LEFT)
                    . str_pad(number_format($d->pendapatan, 0, ',', '.'), 15, ' ', STR_PAD_LEFT) . "\n");
            }

            $printer->text(str_pad('SUB TOTAL', 15, ' ')
                . str_pad($subTotalDenda['jumlah'], 5, ' ', STR_PAD_LEFT)
                . str_pad(number_format($subTotalDenda['pendapatan'], 0, ',', '.'), 15, ' ', STR_PAD_LEFT) . "\n\n");

            // MEMBER SECTION
            $printer->text("MEMBER\n");
            $subTotalMember = ['jumlah' => 0];

            foreach ($trxMember as $d) {
                $subTotalMember['jumlah'] += $d->jumlah;
                $printer->text(str_pad('-- ' . $d->jenis_kendaraan, 15, ' ', STR_PAD_LEFT) . str_pad($d->jumlah, 5, ' ') . "\n");
            }

            $printer->text(str_pad('SUB TOTAL', 15, ' ') . str_pad($subTotalMember['jumlah'], 5, ' ', STR_PAD_LEFT) . "\n\n");

            $printer->text(str_pad('GRAND TOTAL', 15, ' ')
                . str_pad(' ', 5, ' ', STR_PAD_LEFT)
                . str_pad(number_format($subTotalReguler['pendapatan'] + $subTotalDenda['pendapatan'], 0, ',', '.'), 15, ' ', STR_PAD_LEFT) . "\n");

            $printer->text(str_pad('BUKA MANUAL', 15, ' ') . str_pad($bukaManual[0]->jumlah, 5, ' ', STR_PAD_LEFT) . "\n\n");

            $printer->cut();
            $printer->close();
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MENCETAK STRUK.' . $e->getMessage()], 500);
        }
    }
}
