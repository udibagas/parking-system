<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MemberRenewal;
use App\Http\Requests\MemberRenewalRequest;

class MemberRenewalController extends Controller
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

        return MemberRenewal::when($request->keyword, function ($q) use ($request) {
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
    public function store(MemberRenewalRequest $request)
    {
        $input = $request->all();
        $input['user_id'] = auth()->user()->id;
        return MemberRenewal::create($input);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(MemberRenewalRequest $request, MemberRenewal $memberRenewal)
    {
        $memberRenewal->update($request->all());
        return $memberRenewal;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(MemberRenewal $memberRenewal)
    {
        $memberRenewal->delete();
        return ['message' => 'Data telah dihapus'];
    }
}
