<?php

namespace App\Jobs;

use App\Models\Kamera;
use App\Models\ManualOpenLog;
use App\Notifications\KameraErrorNotification;
use GuzzleHttp\Client;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Storage;

class TakeSnapshotManualOpen implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $gate;

    public $manualOpenLog;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(ManualOpenLog $manualOpenLog)
    {
        $this->gate = $manualOpenLog->gateOut;

        $this->manualOpenLog = $manualOpenLog;
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
        $snapshots = [];

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
                $path = 'public/snapshots/' . date('Y/m/d/H/') . $fileName;
                Storage::put($path, $response->getBody());
            } catch (\Exception $e) {
                $kamera->notify(new KameraErrorNotification($kamera));
                continue;
            }

            $snapshots[] = [
                'kamera' => $kamera,
                'path' => $path,
                'filename' => $fileName,
            ];
        }

        if (count($snapshots) > 0) {
            $this->manualOpenLog->update(['snapshots' => $snapshots]);
        }
    }
}
