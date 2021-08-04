<?php

namespace App\Listeners;

use App\Models\AreaParkir;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class KendaraanMasukListener implements ShouldQueue
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
        AreaParkir::whereJsonContains('jenis_kendaraan', $event->jenisKendaraan)->increment('terisi');
    }
}