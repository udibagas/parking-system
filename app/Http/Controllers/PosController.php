<?php

namespace App\Http\Controllers;

use App\Http\Requests\PosRequest;
use App\Models\Pos;
use Illuminate\Http\Request;

class PosController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:1')->except(['index']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Pos::with(['gateOuts'])->orderBy('nama', 'asc')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PosRequest $request)
    {
        $pos = Pos::create($request->all());

        return ['message' => 'Data telah disimpan', 'data' => $pos];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Pos  $pos
     * @return \Illuminate\Http\Response
     */
    public function show(Pos $po)
    {
        return $po;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Pos  $pos
     * @return \Illuminate\Http\Response
     */
    public function update(PosRequest $request, Pos $po)
    {
        $po->update($request->all());

        return ['message' => 'Data telah disimpan', 'data' => $po];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Pos  $pos
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pos $po)
    {
        $po->delete();

        return ['message' => 'Data telah dihapus'];
    }
}
