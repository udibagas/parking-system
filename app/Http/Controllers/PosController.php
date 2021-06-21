<?php

namespace App\Http\Controllers;

use App\Http\Requests\PosRequest;
use App\Pos;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\Printer;

class PosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Pos::orderBy('name', 'asc')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PosRequest $request)
    {
        Pos::create($request->all());
        return ['message' => 'Data telah disimpan'];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Pos  $pos
     * @return \Illuminate\Http\Response
     */
    public function show(Pos $pos)
    {
        return $pos;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Pos  $pos
     * @return \Illuminate\Http\Response
     */
    public function update(PosRequest $request, Pos $pos)
    {
        $pos->update($request->all());
        return ['message' => 'Data telah diupdate'];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Pos  $pos
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pos $pos)
    {
        $pos->delete();
        return ['message' => 'Data telah dihapus'];
    }

    public function getPosByIp(Request $request)
    {
        $pos = Pos::where('ip_address', $request->ip())->first();

        if (!$pos) {
            return response(['message' => 'POS TIDAK TERDAFTAR'], 500);
        }

        return $pos;
    }

    public function testPrinter(Pos $pos)
    {
        try {
            $connector = new FilePrintConnector($pos->printer_device);

            $p = new Printer($connector);
        } catch (\Exception $e) {
            return response(['message' => 'KONEKSI KE PRINTER GAGAL. ' . $e->getMessage()], 500);
        }

        try {
            $p->setJustification(Printer::JUSTIFY_CENTER);
            $p->text("TEST PRINTER\n");
            $p->text($pos->name . "\n");
            $p->text(date('d-M-Y H:i:s'));
            $p->text("\n\n");
            $p->setBarcodeHeight(100);
            $p->setBarcodeWidth(4);
            $p->setBarcodeTextPosition(Printer::BARCODE_TEXT_BELOW);
            $p->barcode("ABC123");
            $p->cut();
            $p->close();
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MENCETAK.' . $e->getMessage()], 500);
        }

        return ['message' => 'BERHASIL MENCETAK'];
    }

    public function testCamera(Pos $pos)
    {
        $client = new Client(['timeout' => 3]);

        try {
            $response = $client->request('GET', $pos->camera_snapshot_url, [
                'auth' => [
                    $pos->camera_username,
                    $pos->camera_password,
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
