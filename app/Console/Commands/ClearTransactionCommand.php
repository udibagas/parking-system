<?php

namespace App\Console\Commands;

use App\Models\ParkingTransaction;
use Illuminate\Console\Command;

class ClearTransactionCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'trx:clear';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear transaction';

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
        ParkingTransaction::truncate();
        $this->info('Transaksi telah dihapus');
    }
}
