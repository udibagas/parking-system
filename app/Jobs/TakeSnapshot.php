<?php

namespace App\Jobs;

use App\Notifications\KameraErrorNotification;
use App\ParkingTransaction;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Storage;

class TakeSnapshot implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $gate;

    public $parkingTransaction;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($gate, ParkingTransaction $parkingTransaction)
    {
        $this->gate = $gate;

        $this->parkingTransaction = $parkingTransaction;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $client = new Client(['timeout' => 3]);

        foreach ($this->gate->kameraList as $kamera) {
            try {
                $response = $client->request('GET', $kamera->snapshot_url, [
                    'auth' => [
                        $kamera->username,
                        $kamera->password,
                        $kamera->auth_type == 'digest' ? 'digest' : null
                    ]
                ]);

                $path = Storage::put(date('Y/m/d/H/') . $this->gate->nama . date('-YmdHis') . '.jpeg', $response->getBody());
            } catch (\Exception $e) {
                $kamera->notify(new KameraErrorNotification($kamera));
                continue;
            }

            $this->gate->snapshots()->create([
                'path' => $path,
                'parking_transaction_id' => $this->parkingTransaction->id
            ]);
        }
    }
}
