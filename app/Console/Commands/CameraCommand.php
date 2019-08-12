<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;

class CameraCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'camera:snapshot {snapshot_url} {username} {password}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Take camera snapshot';

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
        $client = new Client(['timeout' => 3]);
        $fileName = 'snapshot/'.date('YmdHis-test').'.jpg';

        try {
            $client->get($this->argument('snapshot_url'))
                ->setAuth($this->argument('username'), $this->argument('password'))
                ->setResponseBody($fileName)
                ->send();
        } catch (\Exception $e) {
            $this->error($e->getMessage());
            return;
        }

        $this->info('Snapshot saved to '.$fileName);
    }
}
