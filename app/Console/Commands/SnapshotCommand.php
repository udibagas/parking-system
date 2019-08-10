<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\ParkingGate;
use GuzzleHttp\Client;

class SnapshotCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'snapshot:take {gate}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command untuk ambil gambar';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $gate = ParkingGate::find($this->argument('gate'));

        if (!$gate) {
            $this->error('No gate found');
            return;
        }

        $client = new Client(['timeout' => 3]);
        $fileName = 'snapshot/'.date('YmdHis').'.jpg';

        try {
            $client->get($gate->camera_image_snapshot_url)
                ->setAuth($gate->camera_username, $gate->camera_password)
                ->setResponseBody($fileName)
                ->send();
        } catch (\Exception $e) {
            $this->error($e->getMessage());
            return;
        }

        $this->info('Snapshot saved to '.$fileName);
    }
}
