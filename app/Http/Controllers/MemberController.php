<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;
use App\Http\Requests\MemberRequest;
use App\Models\GroupMember;
use App\Models\JenisKendaraan;
use App\Models\ParkingTransaction;
use App\Models\Setting;
use Illuminate\Support\Facades\DB;

class MemberController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:1')->except(['index', 'search']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = Member::when($request->keyword, function ($q) use ($request) {
            $q->where(function ($q) use ($request) {
                $q->where('nama', 'LIKE', '%' . $request->keyword . '%')
                    ->orWhere('nomor_kartu', 'LIKE', '%' . $request->keyword . '%');
            });
        })->when($request->columns, function ($q) use ($request) {
            $q->selectRaw($request->columns);
        })->when($request->status, function ($q) use ($request) {
            $q->whereIn('status', $request->status);
        })->when($request->card_type, function ($q) use ($request) {
            $q->whereIn('card_type', $request->card_type);
        })->when($request->group_member_id, function ($q) use ($request) {
            $q->whereIn('group_member_id', $request->group_member_id);
        })->when($request->expired == ['y'] || $request->expired == 'y', function ($q) {
            $q->whereRaw('expiry_date < DATE(NOW())');
        })->when($request->expired == ['n'] || $request->expired == 'n', function ($q) {
            $q->whereRaw('expiry_date >= DATE(NOW())');
        })->when($request->berbayar == ['y'] || $request->berbayar == 'y', function ($q) {
            $q->where('berbayar', 1);
        })->when($request->berbayar == ['n'] || $request->berbayar == 'n', function ($q) {
            $q->where('berbayar', 0);
        })->orderBy($request->sort_prop ?: 'nama', $request->sort_order ?: 'asc');

        $data = $request->paginated ? $data->paginate($request->pageSize) : $data->get();

        return $request->action == 'print'
            ? view('member.print', ['data' => $data, 'setting' => Setting::first()])
            : $data;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MemberRequest $request)
    {
        $member = DB::transaction(function () use ($request) {
            $member = Member::create($request->all());
            $member->vehicles()->createMany($request->vehicles);
            return $member;
        });

        return ['message' => 'Data berhasil disimpan', 'data' => $member];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Member $member)
    {
        return $member;
    }

    public function search(Request $request)
    {
        if (!$request->nomor_kartu && !$request->plat_nomor) {
            return response(['message' => 'Nomor Kartu/Plat Nomor darus diisi'], 500);
        }

        $member = Member::where('status', 1)
            ->when($request->nomor_kartu, function ($q) use ($request) {
                $q->where('nomor_kartu', 'LIKE', '%' . $request->nomor_kartu);
            })->when($request->plat_nomor, function ($q) use ($request) {
                $q->whereHas('vehicles', function ($q) use ($request) {
                    $q->where('plat_nomor', 'LIKE', $request->plat_nomor);
                });
            })->first();

        if (!$member) {
            if ($request->card_type == 'UHF') {
                $member = Member::create([
                    'nama' => $request->nomor_kartu,
                    'nomor_kartu' => $request->nomor_kartu,
                    'card_type' => 'UHF',
                    'status' => 1,
                    'expiry_date' => now()->addYears(1)->format('Y-m-d'),
                    'phone' => '08xxx',
                    'group_member_id' => GroupMember::first()->id,
                    'berbayar' => true,
                    'siklus_pembayaran_unit' => 'months',
                    'register_date' => date('Y-m-d'),
                    'siklus_pembayaran' => 1,
                    'tarif' => 0
                ]);

                $member->vehicles()->create([
                    'jenis_kendaraan' => JenisKendaraan::first()->nama,
                    'plat_nomor' => 'HXXX',
                    'merk' => 'MERK DUMMY',
                    'tipe' => 'TIPE DUMMY',
                    'tahun' => date('Y'),
                    'warna' => 'HITAM',
                ]);

                return $member;
            } else {
                return response(['message' => 'Member tidak ditemukan'], 404);
            }
        }

        // kalau cari berdasarkan kartu berarti di gate in, cari apa dia ada transaksi yg blm closed
        if ($request->nomor_kartu) {
            $unclosed = ParkingTransaction::where('nomor_kartu', 'LIKE', "%{$request->nomor_kartu}")
                ->whereNull('time_out')
                ->first();

            $setting = Setting::first();
            $member->unclosed = ($setting && $setting->must_checkout && $unclosed) ? true : false;

            // kalau gak harus check out otomatis close trx sebelumnya
            if ($setting && !$setting->must_checkout && $unclosed) {
                $unclosed->update(['time_out' => now()]);
            }
        }

        return $member;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(MemberRequest $request, Member $member)
    {
        DB::transaction(function () use ($request, $member) {
            $member->update($request->all());
            $member->vehicles()->delete();
            $member->vehicles()->createMany($request->vehicles);
        });

        return ['message' => 'Data berhasil disimpan', 'data' => $member];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Member $member)
    {
        DB::transaction(function () use ($member) {
            $member->delete();
            $member->vehicles()->delete();
        });

        return ['message' => 'Member telah dihapus'];
    }
}
