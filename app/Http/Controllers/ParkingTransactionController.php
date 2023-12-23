<?php

namespace App\Http\Controllers;

use App\Models\AreaParkir;
use App\Models\GateIn;
use App\Models\GateOut;
use Illuminate\Http\Request;
use App\Models\ParkingTransaction;
use App\Http\Requests\ParkingTransactionRequest;
use App\Models\JenisKendaraan;
use App\Jobs\PrintTicketIn;
use App\Jobs\PrintTicketOut;
use App\Jobs\TakeSnapshot;
use App\Models\Member;
use App\Models\Pos;
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\Printer;
use App\Models\Setting;
use App\Models\User;
use App\Models\UserLog;
use Carbon\Carbon;
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
        return ParkingTransaction::with([
            'gateIn:id,nama',
            'gateOut:id,nama',
            'snapshots',
            'shift:id,nama',
            'member:id,nama'
        ])->when($request->dateRange, function ($q) use ($request) {
            $q->whereBetween('time_in', $request->dateRange);
        })->when($request->keyword, function ($q) use ($request) {
            $q->where(function ($q) use ($request) {
                $q->where('nomor_barcode', 'LIKE', '%' . $request->keyword . '%')
                    ->orWhere('plat_nomor', 'LIKE', '%' . $request->keyword . '%')
                    ->orWhere('nomor_kartu', 'LIKE', '%' . $request->keyword . '%')
                    ->orWhere('operator', 'LIKE', '%' . $request->keyword . '%')
                    ->orWhere('jenis_kendaraan', 'LIKE', '%' . $request->keyword . '%')
                    ->orWhere('edit_by', 'LIKE', '%' . $request->keyword . '%')
                    ->orWhereHas('gateIn', function ($q) use ($request) {
                        $q->where('nama', 'LIKE', "%{$request->keyword}%");
                    })->orWhereHas('gateOut', function ($q) use ($request) {
                        $q->where('nama', 'LIKE', "%{$request->keyword}%");
                    })->orWhereHas('member', function ($q) use ($request) {
                        $q->where('nama', 'LIKE', "%{$request->keyword}%");
                    });
            });
        })->when($request->is_member, function ($q) use ($request) {
            $q->whereIn('is_member', $request->is_member);
        })->when($request->jenis_kendaraan, function ($q) use ($request) {
            $q->whereIn('jenis_kendaraan', $request->jenis_kendaraan);
        })->when($request->group, function ($q) use ($request) {
            $q->whereIn('group', $request->group);
        })->when($request->gate_in_id, function ($q) use ($request) {
            $q->whereIn('gate_in_id', $request->gate_in_id);
        })->when($request->gate_out_id, function ($q) use ($request) {
            $q->whereIn('gate_out_id', $request->gate_out_id);
        })->when($request->shift_id, function ($q) use ($request) {
            $q->whereIn('shift_id', $request->shift_id);
        })->when($request->denda, function ($q) use ($request) {
            if ($request->denda[0] == 'Y') {
                $q->where('denda', '>', 0);
            }
            if ($request->denda[0] == 'T') {
                $q->where('denda', 0);
            }
        })->when($request->edit, function ($q)  use ($request) {
            if ($request->edit[0] == 'Y') {
                $q->where('edit', 1);
            }
            if ($request->edit[0] == 'T') {
                $q->where('edit', 0);
            }
        })->when($request->manual, function ($q)  use ($request) {
            if ($request->manual[0] == 'Y') {
                $q->where('manual', 1);
            }
            if ($request->manual[0] == 'T') {
                $q->where('manual', 0);
            }
        })->orderBy($request->sort_prop ?: 'updated_at', $request->sort_order ?: 'desc')->paginate($request->pageSize);
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
        $input['shift_id'] = ParkingTransaction::setShift($request->time_in);

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

        $parkingTransaction = ParkingTransaction::create($input);

        // kalau bukan member dan harus print ticket atau kalau tiket hilang
        if ((!$parkingTransaction->is_member && $request->ticket) || $request->nomor_barcode == 'xxxxx') {
            PrintTicketOut::dispatchSync($parkingTransaction);
            return [
                'message' => 'SILAKAN AMBIL STRUK PARKIR',
                'data' => $parkingTransaction->load(['snapshots'])
            ];
        }

        return [
            'message' => 'TIDAK MENCETAK STRUK',
            'data' => $parkingTransaction->load(['snapshots'])
        ];
    }

    // untuk handle waktu gate in tertrigger
    public function apiStore(Request $request)
    {
        $request->validate([
            'gate_in_id' => 'required',
            'jenis_kendaraan' => 'required',
        ]);

        $timeIn = now();

        $input = array_merge($request->all(), [
            'nomor_barcode' => Str::random(5),
            'shift_id' => ParkingTransaction::setShift($timeIn),
            'time_in' => $timeIn
        ]);

        $parkingTransaction = ParkingTransaction::create($input);
        TakeSnapshot::dispatch($parkingTransaction->gateIn, $parkingTransaction);

        if (!$parkingTransaction->is_member) {
            PrintTicketIn::dispatchSync($parkingTransaction);
        }

        return [
            'message' => 'Data berhasil disimpan',
            'data' => $parkingTransaction,
        ];
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

            return $data->load(['member', 'snapshots']);
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

            return $data->load(['member', 'snapshots']);
        }

        // member, tapi gak tap in karena rusak gate in, atau pake kartu gantian
        $member = Member::where('nomor_kartu', $request->nomor_barcode)->first();

        if ($member) {
            if (!$member->status) {
                return response(['message' => 'KARTU TIDAK AKTIF'], 500);
            }

            if (strtotime($member->expiry_date) < strtotime(date('Y-m-d'))) {
                return response(['message' => 'KARTU SUDAH KEDALUARSA'], 500);
            }

            $setting = Setting::first();
            if ($setting->must_checkout) {
                return response(['message' => 'KARTU TIDAK MELAKUKAN TAP DI GATE MASUK'], 500);
            }

            $timeIn = date('Y-m-d H:i:s');

            $data = [
                'nomor_barcode' => 'NOTAP',
                'jenis_kendaraan' => $member->vehicles[0]->jenis_kendaraan,
                'is_member' => true,
                'member_id' => $member->id,
                'time_in' => $timeIn,
                'shift_id' => ParkingTransaction::setShift($timeIn),
                'gate_in_id' => GateIn::where('status', true)->first()->id,
                'nomor_kartu' => $member->nomor_kartu
            ];

            $trx = ParkingTransaction::create($data);
            return $trx->load(['member', 'snapshots']);
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
                'group' => 'required',
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
                'group' => 'Group',
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

        if (!$parkingTransaction->is_member && $request->ticket) {
            PrintTicketOut::dispatchSync($parkingTransaction);
            return [
                'message' => 'SILAKAN AMBIL STRUK PARKIR',
                'data' => $parkingTransaction->load(['snapshots'])
            ];
        }

        return [
            'message' => 'TIDAK MENCETAK STRUK',
            'data' => $parkingTransaction->load(['snapshots'])
        ];
    }

    public function takeSnapshot(Request $request, ParkingTransaction $parkingTransaction)
    {
        $request->validate([
            'gate_out_id' => 'required|exists:gate_outs,id'
        ]);

        TakeSnapshot::dispatchSync(GateOut::find($request->gate_out_id), $parkingTransaction);
        $parkingTransaction->refresh();
        return $parkingTransaction->snapshots;
    }


    public function printLastTransaction(Request $request)
    {
        $request->validate(['pos_id' => 'required|exists:pos,id']);

        $parkingTransaction = ParkingTransaction::whereHas('gateOut', function ($q) use ($request) {
            $q->where('pos_id', $request->pos_id);
        })->orderBy('time_out', 'desc')->first();

        if (!$parkingTransaction) {
            return response(['message' => 'BELUM ADA TRANSAKSI'], 404);
        }

        PrintTicketOut::dispatchSync($parkingTransaction);

        return ['message' => 'SILAKAN AMBIL STRUK PARKIR'];
    }

    public function printTicketOut(ParkingTransaction $parkingTransaction)
    {
        PrintTicketOut::dispatchSync($parkingTransaction);
        return ['message' => 'SILAKAN AMBIL STRUK PARKIR'];
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

        // Ini harusnya dikurangi data yg sudah keluar, belum tentu benar2 sudah diset keluar semua
        AreaParkir::where('terisi', '>', 0)->update(['terisi' => 0]);
        return ['message' => 'KENDARAAN BERHASIL DISET SUDAH KELUAR'];
    }

    public function printReport(Request $request)
    {
        $request->validate([
            'pos_id' => 'required',
            'date' => 'required|date'
        ]);

        $setting = Setting::first();

        if (!$setting) {
            return response(['message' => 'BELUM ADA SETTING'], 500);
        }

        if (!$setting->nama_lokasi) {
            return response(['message' => 'LOKASI BELUM DISET'], 404);
        }

        $pos = Pos::find($request->pos_id);

        if (!$pos) {
            return response(['message' => 'POS TIDAK DITEMUKAN'], 404);
        }

        // ambil data transaksi per tanggal, per operator, per gate
        // reguler
        $sqlReguler = "SELECT parking_transactions.jenis_kendaraan, COUNT(parking_transactions.id) AS jumlah,
                SUM(tarif) AS pendapatan
            FROM parking_transactions
            JOIN gate_outs ON gate_outs.id = parking_transactions.gate_out_id
            WHERE time_out IS NOT NULL
                AND is_member = 0
                AND operator = :operator
                AND DATE(time_out) = :date
                AND gate_outs.pos_id = :pos_id
                AND tarif > 0
            GROUP BY parking_transactions.jenis_kendaraan
        ";

        $sqlDrop = "SELECT parking_transactions.jenis_kendaraan, COUNT(parking_transactions.id) AS jumlah
            FROM parking_transactions
            JOIN gate_outs ON gate_outs.id = parking_transactions.gate_out_id
            WHERE time_out IS NOT NULL
                AND is_member = 0
                AND operator = :operator
                AND DATE(time_out) = :date
                AND gate_outs.pos_id = :pos_id
                AND tarif = 0
            GROUP BY parking_transactions.jenis_kendaraan
        ";

        // ambil data transaksi per tanggal, per operator, per gate
        // denda
        $sqlDenda = "SELECT parking_transactions.jenis_kendaraan, COUNT(parking_transactions.id) AS jumlah,
                SUM(denda) AS pendapatan
            FROM parking_transactions
            JOIN gate_outs ON gate_outs.id = parking_transactions.gate_out_id
            WHERE time_out IS NOT NULL
                AND is_member = 0
                AND operator = :operator
                AND DATE(time_out) = :date
                AND gate_outs.pos_id = :pos_id
                AND denda > 0
            GROUP BY parking_transactions.jenis_kendaraan
        ";

        // ambil data transaksi per tanggal, per operator, per gate
        // member
        $sqlMember = "SELECT parking_transactions.jenis_kendaraan, COUNT(parking_transactions.id) AS jumlah
            FROM parking_transactions
            JOIN gate_outs ON gate_outs.id = parking_transactions.gate_out_id
            WHERE time_out IS NOT NULL
                AND is_member = 1
                AND operator = :operator
                AND DATE(time_out) = :date
                AND gate_outs.pos_id = :pos_id
            GROUP BY parking_transactions.jenis_kendaraan
        ";

        // ambil data transaksi per tanggal, per operator, per gate
        // member
        $sqlBukaManual = "SELECT COUNT(manual_open_logs.id) AS jumlah
            FROM manual_open_logs
            JOIN gate_outs ON gate_outs.id = manual_open_logs.gate_out_id
            WHERE user_id = :user_id
                AND DATE(manual_open_logs.updated_at) = :date
                AND gate_outs.pos_id = :pos_id
        ";

        $pendapatanReguler = DB::select($sqlReguler, [
            ':date' => $request->date,
            ':operator' => $request->user()->name,
            ':pos_id' => $request->pos_id
        ]);

        $drop = DB::select($sqlDrop, [
            ':date' => $request->date,
            ':operator' => $request->user()->name,
            ':pos_id' => $request->pos_id
        ]);

        $pendapatanDenda = DB::select($sqlDenda, [
            ':date' => $request->date,
            ':operator' => $request->user()->name,
            ':pos_id' => $request->pos_id
        ]);

        $trxMember = DB::select($sqlMember, [
            ':date' => $request->date,
            ':operator' => $request->user()->name,
            ':pos_id' => $request->pos_id
        ]);

        $bukaManual = DB::select($sqlBukaManual, [
            ':date' => $request->date,
            ':user_id' => $request->user()->id,
            ':pos_id' => $request->pos_id
        ]);

        // ambil data periode jam
        $start = DB::select('SELECT time_out
            FROM parking_transactions
            JOIN gate_outs ON gate_outs.id = parking_transactions.gate_out_id
            WHERE operator = :operator
                AND gate_outs.pos_id = :pos_id
                AND DATE(time_out) = :date
            ORDER BY time_out ASC
            ', [
            ':date' => $request->date,
            ':operator' => $request->user()->name,
            ':pos_id' => $request->pos_id
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
            if (filter_var($pos->printer->ip_address, FILTER_VALIDATE_IP)) {
                $connector = new NetworkPrintConnector($pos->printer->ip_address, $pos->printer->port ?: 9100);
            } else {
                $connector = new FilePrintConnector($pos->printer->ip_address);
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
            $printer->text(str_pad('TANGGAL', 15, ' ') . ' : ' . date('d-M-Y', strtotime($request->date)) . "\n");
            $dariJam = $userLog ? date('d-M-Y H:i', strtotime($userLog->created_at)) : date('d-M-Y 00:00');
            $printer->text(str_pad('DARI JAM', 15, ' ') . ' : ' . $dariJam . "\n");
            $printer->text(str_pad('SAMPAI JAM', 15, ' ') . ' : ' . date('d-M-Y H:i') . "\n");
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

            // DROP
            $printer->text("DROP\n");
            $totalDrop = 0;

            foreach ($drop as $d) {
                $totalDrop += $d->jumlah;
                $printer->text(str_pad('-- ' . $d->jenis_kendaraan, 15, ' ') . str_pad($d->jumlah, 5, ' ', STR_PAD_LEFT) . "\n");
            }

            $printer->text(str_pad('TOTAL', 15, ' ') . str_pad($totalDrop, 5, ' ', STR_PAD_LEFT) . "\n\n");

            $printer->cut();
            $printer->close();
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MENCETAK STRUK.' . $e->getMessage()], 500);
        }
    }

    public function hitungTarif(Request $request)
    {
        $request->validate([
            'time_in' => 'required',
            'jenis_kendaraan' => 'required'
        ]);

        if ($request->is_member) {
            return 0;
        }

        $in = new Carbon($request->time_in);
        $out = $request->time_out ? new Carbon($request->time_out) : Carbon::now();
        $durasiMenit = $out->diffInMinutes($in);

        $jenisKendaraan = JenisKendaraan::where('nama', $request->jenis_kendaraan)->first();

        if (!$jenisKendaraan) {
            return response(['message' => 'Tarif tidak ditemukan untuk jenis kendaraan ' . $request->jenis_kendaraan], 404);
        }

        $tarifMenitPertama = $jenisKendaraan->tarif_menit_pertama;

        // tak peduli flat atau progressif berlaku seperti ini
        if ($durasiMenit <= $jenisKendaraan->menit_pertama) {
            return $tarifMenitPertama;
        }

        $durasiReal = $durasiMenit - $jenisKendaraan->menit_pertama;

        if ($jenisKendaraan->mode_menginap == JenisKendaraan::MODE_MENGINAP_24JAM) {
            $hariParkir = ceil($durasiMenit / (60 * 24));

            if ($hariParkir == 0 && $jenisKendaraan->mode_tarif == JenisKendaraan::MODE_TARIF_FLAT) {
                $hariParkir = 1;
            }
        }

        if ($jenisKendaraan->mode_menginap == JenisKendaraan::MODE_MENGINAP_TENGAH_MALAM) {
            $hariIn = new Carbon($in->format('Y-m-d'));
            $hariOut = new Carbon($out->format('Y-m-d'));
            $hariParkir = $hariOut->diffInDays($hariIn) + 1;
        }

        $hariMenginap = $hariParkir >= 1 ? $hariParkir - 1 : 0;
        $tarifMenginap = $hariMenginap * $jenisKendaraan->tarif_menginap;

        // tarif flat per hari, kena tarif menginap, kena tarif maximal
        if ($jenisKendaraan->mode_tarif == JenisKendaraan::MODE_TARIF_FLAT) {
            return $tarifMenitPertama + ($hariParkir * $jenisKendaraan->tarif_flat) + $tarifMenginap;
        }

        if ($jenisKendaraan->mode_tarif == JenisKendaraan::MODE_TARIF_PROGRESIF) {
            $tarifMaksimum = $hariMenginap * $jenisKendaraan->tarif_maksimum;

            if ($jenisKendaraan->mode_menginap == JenisKendaraan::MODE_MENGINAP_24JAM) {
                $tarifHariTerakhir = ceil(($durasiMenit % (60 * 24)) / $jenisKendaraan->menit_selanjutnya) * $jenisKendaraan->tarif_menit_selanjutnya;

                if ($tarifHariTerakhir > $jenisKendaraan->tarif_maksimum) {
                    $tarifHariTerakhir = $jenisKendaraan->tarif_maksimum;
                }

                return $tarifMenitPertama + $tarifMaksimum + $tarifHariTerakhir + $tarifMenginap;
            }

            if ($jenisKendaraan->mode_menginap == JenisKendaraan::MODE_MENGINAP_TENGAH_MALAM) {
                if ($hariParkir > 1) {
                    $menitHariPertama = (new Carbon($in->format('Y-m-d') . ' 24:00:00'))->diffInMinutes($in) - $jenisKendaraan->menit_pertama;
                    $menitHariTerakhir = $out->diffInMinutes((new Carbon($out->format('Y-m-d') . ' 00:00:00')));
                    $tarifHariPertama = ceil($menitHariPertama / $jenisKendaraan->menit_selanjutnya) * $jenisKendaraan->tarif_menit_selanjutnya;
                    $tarifHariTerakhir = ceil($menitHariTerakhir / $jenisKendaraan->menit_selanjutnya) * $jenisKendaraan->tarif_menit_selanjutnya;

                    if ($tarifHariPertama > $jenisKendaraan->tarif_maksimum) {
                        $tarifHariPertama = $jenisKendaraan->tarif_maksimum;
                    }

                    if ($tarifHariTerakhir > $jenisKendaraan->tarif_maksimum) {
                        $tarifHariTerakhir = $jenisKendaraan->tarif_maksimum;
                    }

                    if ($hariParkir <= 2) {
                        $tarifMaksimum = 0;
                    }

                    return $tarifMenitPertama + $tarifMaksimum + $tarifHariPertama + $tarifHariTerakhir + $tarifMenginap;
                } else {
                    $tarifHariPertama = ceil($durasiReal / $jenisKendaraan->menit_selanjutnya) * $jenisKendaraan->tarif_menit_selanjutnya;

                    if ($tarifHariPertama > $jenisKendaraan->tarif_maksimum) {
                        $tarifHariPertama = $jenisKendaraan->tarif_maksimum;
                    }

                    return $tarifMenitPertama + $tarifHariPertama;
                }
            }
        }
    }
}
