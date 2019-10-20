<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ParkingMember;
use App\Http\Requests\ParkingMemberRequest;
use App\ParkingTransaction;
use App\Setting;
use Illuminate\Support\Facades\DB;

class ParkingMemberController extends Controller
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
        $sort = $request->sort ? $request->sort : 'name';
        $order = $request->order == 'ascending' ? 'asc' : 'desc';

        return ParkingMember::selectRaw('
                parking_members.*,
                group_members.name AS `group`
            ')
            ->join('group_members', 'group_members.id', '=', 'parking_members.group_member_id', 'LEFT')
            ->when($request->keyword, function ($q) use ($request) {
                return $q->where('parking_members.name', 'LIKE', '%' . $request->keyword . '%')
                    ->orWhere('parking_members.card_number', 'LIKE', '%' . $request->keyword . '%');
            })->when($request->is_active, function ($q) use ($request) {
                return $q->whereIn('parking_members.is_active', $request->is_active);
            })->when($request->expired == ['y'], function ($q) {
                return $q->whereRaw('parking_members.expiry_date < DATE(NOW())');
            })->when($request->expired == ['n'], function ($q) {
                return $q->whereRaw('parking_members.expiry_date >= DATE(NOW())');
            })->orderBy($sort, $order)->paginate($request->pageSize);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ParkingMemberRequest $request)
    {
        try {
            DB::transaction(function () use ($request) {
                $id = DB::table('parking_members')->insertGetId($request->only((new ParkingMember())->getFillable()));

                DB::table('member_vehicles')->insert(array_map(function($vehicle) use ($id) {
                    $vehicle['parking_member_id'] = $id;
                    return $vehicle;
                }, $request->vehicles));
            });
        } catch (\Exception $e) {
            return response(['message' => 'Data gagal disimpan. ' . $e->getMessage()], 500);
        }

        return ['message' => 'Data berhasil disimpan'];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(ParkingMember $parkingMember)
    {
        return $parkingMember;
    }

    public function search(Request $request)
    {
        if (!$request->card_number && !$request->plate_number) {
            return response(['message' => 'Card/Plate number required'], 500);
        }

        $member = ParkingMember::selectRaw('parking_members.*')
            ->join('member_vehicles', 'member_vehicles.parking_member_id', '=', 'parking_members.id')
            ->where('parking_members.is_active', 1)
            // comment this line. prosesnya nanti di client
            // ->where('parking_members.expiry_date', '>=', date('Y-m-d'))
            ->when($request->card_number, function($q) use ($request) {
                return $q->where('parking_members.card_number', 'LIKE', '%'.$request->card_number);
            })->when($request->plate_number, function($q) use ($request) {
                return $q->where('member_vehicles.plate_number', 'LIKE', $request->plate_number);
            })->first();

        if (!$member) {
            return response(['message' => 'No member found'], 404);
        }

        // kalau cari berdasarkan kartu berarti di gate in, cari apa dia ada transaksi yg blm closed
        if ($request->card_number)
        {
            $unclosed = ParkingTransaction::where('card_number', 'LIKE', '%'.$request->card_number)
                ->where('time_out', null)
                ->first();

            $setting = Setting::first();
            $member->unclosed = $setting && $setting->must_checkout && $unclosed ? true : false;

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
    public function update(ParkingMemberRequest $request, ParkingMember $parkingMember)
    {
        try {
            DB::transaction(function () use ($request, $parkingMember) {
                DB::table('parking_members')
                    ->where('id', $parkingMember->id)
                    ->update($request->only((new ParkingMember())->getFillable()));

                DB::table('member_vehicles')
                    ->where('parking_member_id', $parkingMember->id)
                    ->delete();

                DB::table('member_vehicles')->insert(array_map(function($vehicle) use ($parkingMember) {
                    $vehicle['parking_member_id'] = $parkingMember->id;
                    return $vehicle;
                }, $request->vehicles));
            });
        } catch (\Exception $e) {
            return response(['message' => 'Data gagal disimpan. ' . $e->getMessage()], 500);
        }

        return ['message' => 'Data berhasil disimpan'];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ParkingMember $parkingMember)
    {
        $parkingMember->delete();
        return ['message' => 'Member telah dihapus'];
    }

    public function getList()
    {
        return ParkingMember::selectRaw('id, name, card_number, paid')
            ->orderBy('name', 'ASC')->get();
    }
}
