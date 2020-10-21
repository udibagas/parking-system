<?php

namespace App\Http\Controllers;

use App\Http\Requests\KameraRequest;
use App\Kamera;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class KameraController extends Controller
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
        return Kamera::orderBy('nama', 'asc')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(KameraRequest $request)
    {
        $kamera = Kamera::create($request->all());
        return ['message' => 'Data telah disimpan', 'data' => $kamera];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Kamera  $kamera
     * @return \Illuminate\Http\Response
     */
    public function update(KameraRequest $request, Kamera $kamera)
    {
        $kamera->update($request->all());
        return ['message' => 'Data telah disimpan', 'data' => $kamera];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Kamera  $kamera
     * @return \Illuminate\Http\Response
     */
    public function destroy(Kamera $kamera)
    {
        $kamera->delete();
        return ['message' => 'Data telah dihapus'];
    }

    public function test(Kamera $kamera)
    {
        $client = new Client(['timeout' => 3]);

        try {
            $response = $client->request('GET', $kamera->snapshot_url, [
                'auth' => [
                    $kamera->username,
                    $kamera->password,
                    $kamera->auth_type == 'digest' ? 'digest' : null
                ]
            ]);

            if ($response->getHeader('Content-Type')[0] != 'image/jpeg') {
                return response(['message' => 'GAGAL MENGAMBIL GAMBAR. URL SNAPSHOT KAMERA TIDAK SESUAI'], 500);
            }
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MENGAMBIL GAMBAR. ' . $e->getMessage()], 500);
        }

        return [
            'message' => 'BERHASIL MENGAMBIL SNAPSHOT',
            'snapshot' => base64_encode($response->getBody()->getContents())
        ];
    }
}
