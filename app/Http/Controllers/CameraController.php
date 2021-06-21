<?php

namespace App\Http\Controllers;

use App\Camera;
use App\Http\Requests\CameraRequest;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class CameraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Camera::orderBy('name', 'asc')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CameraRequest $request)
    {
        Camera::create($request->all());
        return ['message' => 'Data telah disimpan'];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Camera  $camera
     * @return \Illuminate\Http\Response
     */
    public function show(Camera $camera)
    {
        return $camera;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Camera  $camera
     * @return \Illuminate\Http\Response
     */
    public function update(CameraRequest $request, Camera $camera)
    {
        $camera->update($request->all());
        return ['message' => 'Data telah diupdate'];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Camera  $camera
     * @return \Illuminate\Http\Response
     */
    public function destroy(Camera $camera)
    {
        $camera->delete();
        return ['message' => 'Data telah dihapus'];
    }

    // todo
    public function test(Camera $camera)
    {
        $client = new Client(['timeout' => 3]);

        try {
            $response = $client->request('GET', $camera->snapshot_url, [
                'auth' => [
                    $camera->username,
                    $camera->password,
                    'digest'
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
