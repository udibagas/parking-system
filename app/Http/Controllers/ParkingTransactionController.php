<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ParkingTransaction;
use App\Http\Requests\ParkingTransactionRequest;
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\Printer;
use PhpSerial\PhpSerial;
use App\LocationIdentity;
use App\ParkingGate;
use GuzzleHttp\Client;

class ParkingTransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $sort = $request->sort ? $request->sort : 'updated_at';
        $order = $request->order == 'ascending' ? 'asc' : 'desc';

        return ParkingTransaction::when($request->keyword, function ($q) use ($request) {
                return $q->where('barcode_number', 'LIKE', '%' . $request->keyword . '%')
                    ->orWhere('ticket_number', 'LIKE', '%' . $request->keyword . '%');
            })->when($request->is_member, function ($q) use ($request) {
                return $q->whereIn('is_member', $request->is_member);
            })->orderBy($sort, $order)->paginate($request->pageSize);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $input['time_in'] = date('Y-m-d H:i:s');
        return ParkingTransaction::create($input);
    }

    public function takeSnapshot(Request $request, ParkingTransaction $parkingTransaction)
    {
        if ($request->trx == 'IN') {
            $gate = ParkingGate::find($parkingTransaction->gate_in_id);
        }

        if ($request->trx == 'OUT') {
            $gate = ParkingGate::find($parkingTransaction->gate_out_id);
        }

        if (!$gate) {
            return response(['message' => 'GAGAL MENGAMBIL GAMBAR. TIDAK ADA KAMERA.'], 404);
        }

        $client = new Client(['timeout' => 3]);
        $fileName = 'snapshot/'.date('YmdHis').'.jpg';

        try {
            $client->get($gate->camera_image_snapshot_url)
                ->setAuth($gate->camera_username, $gate->camera_password)
                ->setResponseBody($fileName)
                ->send();
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MENGAMBIL GAMBAR. '. $e->getMessage()], 500);
        }

        if ($request->trx == 'IN') {
            $parkingTransaction->update(['snapshot_in' => $fileName]);
        }

        if ($request->trx == 'OUT') {
            $parkingTransaction->update(['snapshot_out' => $fileName]);
        }

        return $parkingTransaction;
    }

    public function printTicket(Request $request, ParkingTransaction $parkingTransaction)
    {
        try {
            $connector = new NetworkPrintConnector("192.168.1.103", 9100);
            // $connector = new FilePrintConnector("/dev/ttyS0");
            $printer = new Printer($connector);
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MENCETAK STRUK.' . $e->getMessage()], 500);
        }

        $location = LocationIdentity::where('active', 1)->first();

        if (!$location) {
            return response(['message' => 'LOKASI TIDAK DISET'], 500);
        }

        try {
            if ($request->trx == 'IN') {
                $printer->text("IN!\n");
            }

            if ($request->trx == 'OUT') {
                $gateOut = ParkingGate::find($parkingTransaction->gate_out_id);
                $printer->setJustification(Printer::JUSTIFY_CENTER);
                $printer->text("STRUK PARKIR\n");
                $printer->setTextSize(2, 2);
                $printer->text($location->name . "\n");
                $printer->setTextSize(1, 1);
                $printer->text($location->address . "\n\n");

                $printer->setTextSize(2, 2);
                $printer->text($parkingTransaction->plate_number . "\n");
                $printer->text('Rp. ' . number_format($parkingTransaction->fare, 0, ',', '.') . "-\n");

                $printer->setTextSize(1, 1);
                $printer->setJustification(Printer::JUSTIFY_LEFT);
                $printer->text(str_pad('Gate', 20, ' ') . ' : ' . $gateOut->name . "\n");
                $printer->text(str_pad('Waktu Masuk', 20, ' ') . ' : ' . $parkingTransaction->time_in . "\n");
                $printer->text(str_pad('Waktu Keluar', 20, ' ') . ' : ' . $parkingTransaction->time_out . "\n");
                $printer->text(str_pad('Durasi', 20, ' ') . ' : ' . $parkingTransaction->durasi . "\n");
                $printer->text(str_pad('Petugas', 20, ' ') . ' : ' . auth()->user()->name . "\n\n\n");
                $printer->text("TERIMAKASIH ATAS KUNJUNGAN ANDA\n");
            }

            $printer->cut();
            $printer->close();
        } catch (\Exeption $e) {
            return response(['message' => 'GAGAL MENCETAK STRUK.' . $e->getMessage()], 500);
        }

        return ['message' => 'SILAKAN AMBIL STRUK'];
    }

    public function openGate()
    {
        try {
            $serial = new PhpSerial;
            $serial->deviceSet("/dev/ttyS0");
            $serial->confBaudRate(2400);
            $serial->confParity("none");
            $serial->confCharacterLength(8);
            $serial->confStopBits(1);
            $serial->confFlowControl("none");
            $serial->deviceOpen();
            $serial->sendMessage("1");
            $serial->deviceClose();
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MEMBUKA GATE. '. $e->getMessage()], 500);
        }

        return ['message' => 'GATE BERHASIL DIBUKA'];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $data = ParkingTransaction::where('barcode_number', $request->barcode_number)
            ->where('time_out', null)
            ->first();

        if ($data) {
            return $data;
        }

        return response(['message' => 'Data tidak ditemukan'], 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ParkingTransactionRequest $request, ParkingTransaction $parkingTransaction)
    {
        $parkingTransaction->update($request->all());
        return $parkingTransaction;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ParkingTransaction $parkingTransaction)
    {
        $parkingTransaction->delete();
        return ['message' => 'Transaksi telah dihapus'];
    }
}
