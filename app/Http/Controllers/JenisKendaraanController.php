<?php

namespace App\Http\Controllers;

use App\Http\Requests\JenisKendaraanRequest;
use App\JenisKendaraan;

class JenisKendaraanController extends Controller
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
        return JenisKendaraan::orderBy('nama', 'asc')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(JenisKendaraanRequest $request)
    {
        if ($request->is_default) {
            JenisKendaraan::where('is_default', 1)->update(['is_default' => 0]);
        }

        $jenisKendaraan = JenisKendaraan::create($request->all());

        return [
            'message' => 'Data telah disimpan',
            'data' => $jenisKendaraan
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(JenisKendaraanRequest $request, JenisKendaraan $jenisKendaraan)
    {
        if ($request->is_default) {
            JenisKendaraan::where('is_default', 1)->update(['is_default' => 0]);
        }

        $jenisKendaraan->update($request->all());

        return [
            'message' => 'Data telah disimpan',
            'data' => $jenisKendaraan
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(JenisKendaraan $jenisKendaraan)
    {
        $jenisKendaraan->delete();
        return ['message' => 'Data telah dihapus'];
    }
}
