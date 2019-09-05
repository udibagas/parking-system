<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ParkingGateRequest;
use App\ParkingGate;
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\Printer;
use PhpSerial\PhpSerial;
use GuzzleHttp\Client;

class ParkingGateController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:1')->except(['getList', 'search', 'openGate', 'takeSnapshot']);
    }

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
    public function search(Request $request)
    {
        $gate = ParkingGate::where('type', $request->type)
            ->where('active', 1)
            ->get();

        if (!$gate) {
            return response(['message' => 'Not found'], 404);
        }

        return $gate;
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

    public function getList()
    {
        return ParkingGate::orderBy('name', 'asc')->where('active', 1)->get();
    }

    public function testCamera(ParkingGate $parkingGate)
    {
        $client = new Client(['timeout' => 3]);

        try {
            $response = $client->request('GET', $parkingGate->camera_image_snapshot_url, [
                'auth' => [
                    $parkingGate->camera_username,
                    $parkingGate->camera_password,
                    $parkingGate->camera_auth_type == 'digest' ? 'digest' : null
                ]
            ]);
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MENGAMBIL GAMBAR. '. $e->getMessage()], 500);
        }

        return [
            'message' => 'BERHASIL MENGAMBIL SNAPSHOT',
            'snapshot' => $response->getBody()
        ];
    }

    public function testPrinter(ParkingGate $parkingGate)
    {
        try {
            if ($parkingGate->printer_type == "network") {
                $connector = new NetworkPrintConnector($parkingGate->printer_ip_address, 9100);
            } else if ($parkingGate->printer_type == "local") {
                $connector = new FilePrintConnector($parkingGate->printer_device);
            } else {
                return response(['message' => 'INVALID PRINTER'], 500);
            }

            $printer = new Printer($connector);
        } catch (\Exception $e) {
            return response(['message' => 'KONEKSI KE PRINTER GAGAL. ' . $e->getMessage()], 500);
        }

        try {
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->text("TEST PRINTER\n");
            $printer->text($parkingGate->name . "\n");
            $printer->text(date('d-M-Y H:i:s'));
            $printer->text("\n\n");
            $printer->setBarcodeHeight(100);
            $printer->setBarcodeWidth(4);
            $printer->setBarcodeTextPosition(Printer::BARCODE_TEXT_BELOW);
            $printer->barcode("ABC123");
            $printer->cut();
            $printer->close();
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MENCETAK.' . $e->getMessage()], 500);
        }

        return ['message' => 'BERHASIL MENCETAK'];
    }

    public function openGate(ParkingGate $parkingGate)
    {
        // ip address == device
        // port = baudrate
        try {
            $serial = new PhpSerial;
            $serial->deviceSet($parkingGate->controller_ip_address);
            $serial->confBaudRate($parkingGate->controller_port);
            $serial->confParity("none");
            $serial->confCharacterLength(8);
            $serial->confStopBits(1);
            $serial->confFlowControl("none");
            $serial->deviceOpen();
            $serial->sendMessage(env("GATE_CMD_OPEN", "AZ123"));
            sleep(1);
            $serial->sendMessage(env("GATE_CMD_CLOSE", "W"));
            $serial->deviceClose();
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MEMBUKA GATE. '. $e->getMessage()], 500);
        }

        return ['message' => 'GATE BERHASIL DIBUKA'];
    }

    public function takeSnapshot(ParkingGate $parkingGate)
    {
        if (!$parkingGate->camera_status || !$parkingGate->camera_image_snapshot_url) {
            return response(['message' => 'GAGAL MENGAMBIL GAMBAR. TIDAK ADA KAMERA.'], 404);
        }

        $client = new Client(['timeout' => 3]);
        $fileName = 'snapshot/'.date('YmdHis').'.jpg';

        try {
            $response = $client->request('GET', $parkingGate->camera_image_snapshot_url, [
                'auth' => [
                    $parkingGate->camera_username,
                    $parkingGate->camera_password,
                    $parkingGate->camera_auth_type == 'digest' ? 'digest' : null
                ]
            ]);
            file_put_contents($fileName, $response->getBody());
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MENGAMBIL GAMBAR. '. $e->getMessage()], 500);
        }

        return ['filename' => $fileName];
    }
}
