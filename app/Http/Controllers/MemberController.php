<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Member;
use App\Http\Requests\MemberRequest;
use App\ParkingTransaction;
use App\Setting;
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
        $sort = $request->sort ? $request->sort : 'nama';
        $order = $request->order == 'ascending' ? 'asc' : 'desc';

        $data = Member::when($request->keyword, function ($q) use ($request) {
            return $q->where(function ($qq) use ($request) {
                return $qq->where('nama', 'LIKE', '%' . $request->keyword . '%')
                    ->orWhere('nomor_kartu', 'LIKE', '%' . $request->keyword . '%');
            });
        })->when($request->status, function ($q) use ($request) {
            return $q->whereIn('status', $request->status);
        })->when($request->group_member_id, function ($q) use ($request) {
            return $q->whereIn('group_member_id', $request->group_member_id);
        })->when($request->expired == ['y'] || $request->expired == 'y', function ($q) {
            return $q->whereRaw('expiry_date < DATE(NOW())');
        })->when($request->expired == ['n'] || $request->expired == 'n', function ($q) {
            return $q->whereRaw('expiry_date >= DATE(NOW())');
        })->when($request->berbayar == ['y'] || $request->berbayar == 'y', function ($q) {
            return $q->where('berbayar', 1);
        })->when($request->berbayar == ['n'] || $request->berbayar == 'n', function ($q) {
            return $q->where('berbayar', 0);
        })->orderBy($sort, $order)->paginate($request->pageSize);

        if ($request->action == 'print') {
            return view('member.print', [
                'data' => $data,
                'setting' => Setting::first()
            ]);
        }

        return $data;
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

        $member = Member::selectRaw('members.*')
            ->where('status', 1)
            ->when($request->nomor_kartu, function ($q) use ($request) {
                $q->where('members.nomor_kartu', 'LIKE', '%' . $request->nomor_kartu);
            })->when($request->plat_nomor, function ($q) use ($request) {
                $q->whereHas('vehicles', function ($q) use ($request) {
                    $q->where('plat_nomor', 'LIKE', $request->plat_nomor);
                });
            })->first();

        if (!$member) {
            return response(['message' => 'Member tidak ditemukan'], 404);
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
            $member->transcations()->delete();
        });

        return ['message' => 'Member telah dihapus'];
    }

    public function getList()
    {
        return Member::selectRaw('id, nama, nomor_kartu, berbayar')
            ->orderBy('nama', 'ASC')->get();
    }
}
