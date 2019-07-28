<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ParkingMember;
use App\Http\Requests\ParkingMemberRequest;

class ParkingMemberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $sort = $request->sort ? $request->sort : 'name';
        $order = $request->order == 'ascending' ? 'asc' : 'desc';

        return ParkingMember::when($request->keyword, function ($q) use ($request) {
                return $q->where('name', 'LIKE', '%' . $request->keyword . '%')
                    ->orWhere('card_number', 'LIKE', '%' . $request->keyword . '%')
                    ->orWhere('plate_number', 'LIKE', '%' . $request->keyword . '%');
            })->when($request->is_active, function ($q) use ($request) {
                return $q->whereIn('is_active', $request->is_active);
            })->when($request->vehicle_type, function ($q) use ($request) {
                return $q->whereIn('vehicle_type', $request->vehicle_type);
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
        return ParkingMember::create($request->all());
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ParkingMemberRequest $request, ParkingMember $parkingMember)
    {
        $parkingMember->update($request->all());
        return $parkingMember;
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
}
