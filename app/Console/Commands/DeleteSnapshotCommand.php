<?php

namespace App\Console\Commands;

use App\ParkingTransaction;
use Illuminate\Console\Command;

class DeleteSnapshotCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'snapshot:delete {age}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Hapus snapshot';

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
        $data = ParkingTransaction::whereRaw('DATEDIFF(DATE(created_at), NOW()) = :age', [
            ':age' => $this->argument('age')
        ])->get();

        foreach ($data as $d)
        {
            if ($d->snapshot_in && file_exists($d->snapshot_in)) {
                unlink($d->snapshot_in);
                $this->info('File '. $d->snapshot_in. ' telah dihapus');
            }

            if ($d->snapshot_out && file_exists($d->snapshot_out)) {
                unlink($d->snapshot_out);
                $this->info('File '. $d->snapshot_in. ' telah dihapus');
            }
        }
    }
}
