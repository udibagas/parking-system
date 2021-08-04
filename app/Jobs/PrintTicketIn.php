<?php

namespace App\Jobs;

use App\Notifications\PrintTicketFailedNotification;
use App\Models\ParkingTransaction;
use App\Models\Setting;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\Printer;

class PrintTicketIn implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $parkingTransaction;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(ParkingTransaction $parkingTransaction)
    {
        $this->parkingTransaction = $parkingTransaction;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $parkingTransaction = $this->parkingTransaction;
        $setting = Setting::first();

        if (!$setting) {
            return;
        }

        if (!$setting->nama_lokasi) {
            return;
        }

        $printer = $parkingTransaction->gateIn->printer;

        if (!$printer) {
            return;
        }

        try {
            $connector = new NetworkPrintConnector($printer->ip_address, $printer->port ?: 9100);
            $p = new Printer($connector);
        } catch (\Exception $e) {
            $printer->notify(new PrintTicketFailedNotification($parkingTransaction, 'Koneksi ke printer gagal'));
        }

        try {
            $p->setJustification(Printer::JUSTIFY_CENTER);
            $p->text("TIKET PARKIR\n");
            $p->setTextSize(2, 2);
            $p->text($setting->nama_lokasi . "\n\n");
            $p->setTextSize(1, 1);
            // $p->text($setting->alamat_lokasi . "\n\n");

            $p->setJustification(Printer::JUSTIFY_LEFT);
            $p->text(str_pad('GATE', 10, ' ') . " : {$parkingTransaction->gateIn->nama}/{$parkingTransaction->jenis_kendaraan}\n");
            $p->text(str_pad('TANGGAL', 10, ' ') . ' : ' . date('d-M-Y', strtotime($parkingTransaction->time_in)) . "\n");
            $p->text(str_pad('JAM', 10, ' ') . ' : ' . date('H:i:s', strtotime($parkingTransaction->time_in)) . "\n\n");
            $p->setJustification(Printer::JUSTIFY_CENTER);
            $p->setBarcodeHeight(100);
            $p->setBarcodeWidth(4);
            $p->setBarcodeTextPosition(Printer::BARCODE_TEXT_BELOW);
            $p->barcode($parkingTransaction->nomor_barcode);
            $p->text("\n");
            $p->text($setting->info_tambahan_tiket . "\n\n");
            $p->cut();
            $p->close();
        } catch (\Exception $e) {
            $printer->notify(new PrintTicketFailedNotification($parkingTransaction, $e->getMessage()));
        }
    }
}
