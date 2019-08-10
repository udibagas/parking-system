<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ParkingTransaction;
use App\Http\Requests\ParkingTransactionRequest;
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\Printer;
use PhpSerial\PhpSerial;

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

    public function printTicket(Request $request, ParkingTransaction $parkingTransaction)
    {
        // $connector = new NetworkPrintConnector("10.x.x.x", 9100);
        $connector = new FilePrintConnector("/dev/ttyS0");
        $printer = new Printer($connector);

        try {
            if ($request->trx == 'IN') {
                $printer->text("IN!\n");
            }

            if ($request->trx == 'OUT') {
                $printer->text("OUT!\n");
            }

            $printer->cut();
        } catch (\Exeption $e) {
            // print failed
        } finally {
            $printer->close();
        }
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
        } catch (\Exception $e) {
            return response(['message' => 'Failed to open gate! '. $e->getMessage()], 500);
        }

        return ['message' => 'Gate opened!'];
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
