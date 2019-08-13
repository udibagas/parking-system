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
        $fileName = './public/snapshot/'.date('YmdHis').'-test.jpg';

        try {
            $response = $client->request('GET', $this->argument('snapshot_url'), ['auth' => [$this->argument('username'), $this->argument('password')]]);
            file_put_contents($fileName, $response->getBody());
        } catch (\Exception $e) {
            $this->error($e->getMessage());
            return;
        }

        $this->info('Snapshot saved to '.$fileName);
    }
}
