<?php

namespace App\Jobs;

use App\Notifications\PrintTicketFailedNotification;
use App\ParkingTransaction;
use App\Setting;
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
            $printer->notify(new PrintTicketFailedNotification($parkingTransaction));
        }

        try {
            $p->setJustification(Printer::JUSTIFY_CENTER);
            $p->text("TIKET PARKIR\n");
            $p->text($setting->nama_lokasi . "\n");
            $p->text($setting->alamat_lokasi . "\n\n");

            $p->text('Rp. ' . number_format($parkingTransaction->tarif, 0, ',', '.') . ",-\n");
            $p->text($parkingTransaction->plat_nomor . "/" . $parkingTransaction->jenis_kendaraan);
            $p->text("\n\n");

            $p->setJustification(Printer::JUSTIFY_LEFT);
            $p->text(str_pad('GATE', 15, ' ') . ' : ' . $parkingTransaction->gateIn->nama . "\n");
            $p->text(str_pad('WAKTU', 15, ' ') . ' : ' . date('d-m-Y H:i:s', strtotime($parkingTransaction->time_in)) . "\n\n");
            $p->setJustification(Printer::JUSTIFY_CENTER);
            $p->setBarcodeHeight(100);
            $p->setBarcodeWidth(4);
            $p->barcode($parkingTransaction->nomor_barcode, 'CODE39');
            $p->text("\n");
            $p->text($setting->additional_info_ticket . "\n");
            $p->cut();
            $p->close();
        } catch (\Exception $e) {
            $printer->notify(new PrintTicketFailedNotification($parkingTransaction));
        }
    }
}
