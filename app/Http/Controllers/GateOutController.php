<?php

namespace App\Http\Controllers;

use App\Models\GateOut;
use App\Http\Requests\GateOutRequest;
use App\Models\Kamera;
use App\Notifications\KameraErrorNotification;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GateOutController extends Controller
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
    public function index(Request $request)
    {
        $data = GateOut::orderBy('nama', 'asc')->with(['pos']);
        return $request->paginated ? $data->paginate($request->pageSize) : $data->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GateOutRequest $request)
    {
        $gateOut = GateOut::create($request->all());

        return ['message' => 'Data telah disimpan', 'data' => $gateOut];
    }

    public function show(GateOut $gateOut)
    {
        return $gateOut->load(['pos']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\GateOut  $gateOut
     * @return \Illuminate\Http\Response
     */
    public function update(GateOutRequest $request, GateOut $gateOut)
    {
        $gateOut->update($request->all());

        return ['message' => 'Data telah disimpan', 'data' => $gateOut];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\GateOut  $gateOut
     * @return \Illuminate\Http\Response
     */
    public function destroy(GateOut $gateOut)
    {
        $gateOut->delete();
        return ['message' => 'Data telah dihapus'];
    }

    public function takeSnapshot(GateOut $gateOut)
    {
        $kameras = Kamera::whereIn('id', $gateOut->kamera)->active()->get();
        $client = new Client(['timeout' => 3]);

        foreach ($kameras as $kamera) {
            try {
                $response = $client->request('GET', $kamera->snapshot_url, [
                    'auth' => [
                        $kamera->username,
                        $kamera->password,
                        $kamera->auth_type == 'digest' ? 'digest' : null
                    ]
                ]);

                $fileName = $gateOut->nama . '-' . $kamera->nama . date('-YmdHis') . '.jpeg';
                $path = 'snapshots/' . date('Y/m/d/H/') . $fileName;
                Storage::put($path, $response->getBody());
            } catch (\Exception $e) {
                $kamera->notify(new KameraErrorNotification($kamera));
                continue;
            }
        }

        return ['message' => 'OK'];
    }
}
