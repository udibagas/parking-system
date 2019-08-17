<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\VehicleTypeRequest;
use App\VehicleType;

class VehicleTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return VehicleType::when($request->keyword, function ($q) use ($request) {
                return $q->where('name', 'LIKE', '%' . $request->keyword . '%');
            })
            ->orderBy($request->sort, $request->order == 'ascending' ? 'asc' : 'desc')
            ->paginate($request->pageSize);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(VehicleTypeRequest $request)
    {
        if ($request->is_default) {
            VehicleType::where('is_default', 1)->update(['is_default' => 0]);
        }

        return VehicleType::create($request->all());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(VehicleTypeRequest $request, VehicleType $vehicleType)
    {
        if ($request->is_default) {
            VehicleType::where('is_default', 1)->update(['is_default' => 0]);
        }

        $vehicleType->update($request->all());
        return $vehicleType;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(VehicleType $vehicleType)
    {
        $vehicleType->delete();
        return ['message' => 'Data has been deleted'];
    }

    public function getList()
    {
        return VehicleType::all();
    }
}
