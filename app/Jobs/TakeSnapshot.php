<?php

namespace App\Jobs;

use App\Models\Kamera;
use App\Notifications\KameraErrorNotification;
use App\Models\ParkingTransaction;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Notification;
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
        if ($this->gate->kamera === null) {
            return;
        }

        $kameras = Kamera::whereIn('id', $this->gate->kamera)->active()->get();
        $client = new Client(['timeout' => 3]);

        foreach ($kameras as $kamera) {
            try {
                $response = $client->request('GET', $kamera->snapshot_url, [
                    'auth' => [
                        $kamera->username,
                        $kamera->password,
                        $kamera->auth_type == 'digest' ? 'digest' : null
                    ]
                ]);

                $fileName = $this->gate->nama . '-' . $kamera->nama . date('-YmdHis') . '.jpeg';
                $path = 'snapshots/' . date('Y/m/d/H/') . $fileName;
                Storage::put($path, $response->getBody());
            } catch (\Exception $e) {
                $operators = User::active()->operator()->get();
                Notification::send($operators, new KameraErrorNotification($kamera));
                continue;
            }

            $this->gate->snapshots()->create([
                'kamera_id' => $kamera->id,
                'path' => $path,
                'filename' => $fileName,
                'parking_transaction_id' => $this->parkingTransaction->id
            ]);
        }
    }
}
