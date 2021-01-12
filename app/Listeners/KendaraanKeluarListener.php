<?php

namespace App\Listeners;

use App\AreaParkir;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use PhpSerial\PhpSerial;

class KendaraanKeluarListener implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        AreaParkir::whereJsonContains('jenis_kendaraan', $event->parkingTransaction->jenis_kendaraan)->decrement('terisi');

        // TODO: tampilkan tarif di running text
        try {
            $serial = new PhpSerial;
            $serial->deviceSet($running);
            $serial->confBaudRate(2400);
            $serial->confParity("none");
            $serial->confCharacterLength(8);
            $serial->confStopBits(1);
            $serial->confFlowControl("none");
            $serial->deviceOpen();
            $serial->sendMessage("AZ123");
        } catch (\Exception $e) {
            // NOTHING TODO
            return;
        } finally {
            $serial->deviceClose();
        }
    }
}
