<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ParkingMember;
use App\Http\Requests\ParkingMemberRequest;
use App\Models\Setting;
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

        $data = ParkingMember::with('group')->when($request->keyword, function ($q) use ($request) {
            return $q->where(function ($qq) use ($request) {
                return $qq->where('name', 'LIKE', '%' . $request->keyword . '%')
                    ->orWhere('card_number', 'LIKE', '%' . $request->keyword . '%');
            });
        })->when($request->is_active, function ($q) use ($request) {
            return $q->whereIn('is_active', $request->is_active);
        })->when($request->group_member_id, function ($q) use ($request) {
            return $q->whereIn('group_member_id', $request->group_member_id);
        })->when($request->expired == ['y'] || $request->expired == 'y', function ($q) {
            return $q->whereRaw('expiry_date < DATE(NOW())');
        })->when($request->expired == ['n'] || $request->expired == 'n', function ($q) {
            return $q->whereRaw('expiry_date >= DATE(NOW())');
        })->when($request->paid == ['y'] || $request->paid == 'y', function ($q) {
            return $q->where('paid', 1);
        })->when($request->paid == ['n'] || $request->paid == 'n', function ($q) {
            return $q->where('paid', 0);
        })->orderBy($sort, $order);



        if ($request->action == 'print') {
            return view('parking_member.print', [
                'data' => $data->get(),
                'setting' => Setting::first()
            ]);
        }

        return $request->paginated ? $data->paginate($request->pageSize) : $data->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ParkingMemberRequest $request)
    {
        DB::transaction(function () use ($request) {
            $m = ParkingMember::create($request->all());
            $m->vehicles()->createMany($request->vehicles);
        });

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
            ->when($request->card_number, function ($q) use ($request) {
                return $q->where('parking_members.card_number', 'LIKE', '%' . $request->card_number);
            })->when($request->plate_number, function ($q) use ($request) {
                return $q->where('member_vehicles.plate_number', 'LIKE', $request->plate_number);
            })->first();

        if (!$member) {
            return response(['message' => 'MEMBER TIDAK DITEMUKAN'], 404);
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
        DB::transaction(function () use ($request, $parkingMember) {
            $parkingMember->update($request->all());
            $parkingMember->vehicles()->delete();
            $parkingMember->vehicles()->createMany($request->vehicles);
        });

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
        DB::transaction(function () use ($parkingMember) {
            $parkingMember->delete();
            $parkingMember->vehicles()->delete();
        });

        return ['message' => 'Member telah dihapus'];
    }
}
