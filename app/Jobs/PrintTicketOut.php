<?php

namespace App\Jobs;

use App\Notifications\PrintStrukFailedNotification;
use App\ParkingTransaction;
use App\Setting;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\Printer;

class PrintTicketOut implements ShouldQueue
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

        $printer = $parkingTransaction->gateOut->pos->printer;

        if (!$printer) {
            return;
        }

        try {
            $connector = new NetworkPrintConnector($printer->ip_address, $printer->port ?: 9100);
            $p = new Printer($connector);
        } catch (\Exception $e) {
            $printer->notify(new PrintStrukFailedNotification($parkingTransaction, 'Koneksi ke printer gagal'));
        }

        try {
            $p->setJustification(Printer::JUSTIFY_CENTER);
            $p->text("STRUK PARKIR\n");
            $p->setTextSize(2, 2);
            $p->text($setting->nama_lokasi . "\n");
            $p->setTextSize(1, 1);
            $p->text($setting->alamat_lokasi . "\n\n");
            $p->text('Rp. ' . number_format($parkingTransaction->tarif + $parkingTransaction->denda, 0, ',', '.') . ",-\n");
            $p->text($parkingTransaction->plat_nomor . "/" . $parkingTransaction->jenis_kendaraan . "/" . $parkingTransaction->gateOut->nama);
            $p->text("\n\n");

            $p->setJustification(Printer::JUSTIFY_LEFT);
            $p->text(str_pad('WAKTU MASUK', 15, ' ') . ' : ' . date('d-M-Y H:i:s', strtotime($parkingTransaction->time_in)) . "\n");
            $p->text(str_pad('WAKTU KELUAR', 15, ' ') . ' : ' . date('d-M-Y H:i:s', strtotime($parkingTransaction->time_out)) . "\n");
            $p->text(str_pad('DURASI', 15, ' ') . ' : ' . $parkingTransaction->durasi . "\n");

            // kalau tiket hilang
            if ($parkingTransaction->nomor_barcode == 'xxxxx' || $parkingTransaction->denda > 0) {
                $p->text(str_pad('DENDA', 15, ' ') . ' : Rp. ' . number_format($parkingTransaction->denda, 0, ',', '.') . "\n");
            }

            $p->text(str_pad('PETUGAS', 15, ' ') . ' : ' . strtoupper(auth()->user()->name) . "\n\n");

            $p->setJustification(Printer::JUSTIFY_CENTER);
            $p->text("TERIMAKASIH ATAS KUNJUNGAN ANDA\n\n");

            $p->cut();
            $p->close();
        } catch (\Exception $e) {
            $printer->notify(new PrintStrukFailedNotification($parkingTransaction, $e->getMessage()));
        }
    }
}
