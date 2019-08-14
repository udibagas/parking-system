<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\LocationIdentity;
use App\Http\Requests\LocationIdentityRequest;

class LocationIdentityController extends Controller
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

        return LocationIdentity::when($request->keyword, function ($q) use ($request) {
                return $q->where('name', 'LIKE', '%' . $request->keyword . '%');
            })->when($request->active, function ($q) use ($request) {
                return $q->whereIn('active', $request->active);
            })->orderBy($sort, $order)->paginate($request->pageSize);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LocationIdentityRequest $request)
    {
        return LocationIdentity::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $locationIdentity = LocationIdentity::where($request->all())->first();

        if (!$locationIdentity) {
            return response(['message' => 'Data not found'], 404);
        }

        return $locationIdentity;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(LocationIdentityRequest $request, LocationIdentity $locationIdentity)
    {
        $locationIdentity->update($request->all());
        return $locationIdentity;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(LocationIdentity $locationIdentity)
    {
        $locationIdentity->delete();
        return ['message' => 'Data has been deleted!'];
    }
}