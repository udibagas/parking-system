<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ParkingGateRequest;
use App\ParkingGate;

class ParkingGateController extends Controller
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

        return ParkingGate::when($request->keyword, function ($q) use ($request) {
                return $q->where('name', 'LIKE', '%' . $request->keyword . '%')
                    ->orWhere('controller_ip_address', 'LIKE', '%' . $request->keyword . '%');
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
    public function store(ParkingGateRequest $request)
    {
        return ParkingGate::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ParkingGateRequest $request, ParkingGate $parkingGate)
    {
        $parkingGate->update($request->all());
        return $parkingGate;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ParkingGate $parkingGate)
    {
        $parkingGate->delete();
        return ['message' => 'Parking gate telah dihapus'];
    }
}
