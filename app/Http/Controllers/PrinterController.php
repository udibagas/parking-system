<?php

namespace App\Http\Controllers;

use App\Http\Requests\PrinterRequest;
use App\Models\Printer;
use Illuminate\Http\Request;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\Printer as MyPrinter;

class PrinterController extends Controller
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
        return Printer::orderBy('nama', 'asc')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PrinterRequest $request)
    {
        $printer = Printer::create($request->all());

        return ['message' => 'Data telah disimpan', 'data' => $printer];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Printer  $printer
     * @return \Illuminate\Http\Response
     */
    public function update(PrinterRequest $request, Printer $printer)
    {
        $printer->update($request->all());

        return ['message' => 'Data telah disimpan', 'data' => $printer];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Printer  $printer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Printer $printer)
    {
        $printer->delete();

        return ['message' => 'Data telah dihapus'];
    }

    public function test(Printer $printer)
    {
        try {
            if (filter_var($printer->ip_address, FILTER_VALIDATE_IP)) {
                $connector = new NetworkPrintConnector($printer->ip_address, $printer->port ?: 9100);
            } else {
                $connector = new FilePrintConnector($printer->ip_address);
            }

            $p = new MyPrinter($connector);
        } catch (\Exception $e) {
            return response(['message' => 'KONEKSI KE PRINTER GAGAL. ' . $e->getMessage()], 500);
        }

        try {
            $p->setJustification(MyPrinter::JUSTIFY_CENTER);
            $p->text("TEST PRINTER\n");
            $p->text($printer->nama . "\n");
            $p->text(date('d-M-Y H:i:s'));
            $p->text("\n\n");
            $p->setBarcodeHeight(100);
            $p->setBarcodeWidth(4);
            $p->setBarcodeTextPosition(MyPrinter::BARCODE_TEXT_BELOW);
            $p->barcode("ABC123");
            $p->cut();
            $p->close();
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MENCETAK.' . $e->getMessage()], 500);
        }

        return ['message' => 'BERHASIL MENCETAK'];
    }
}
