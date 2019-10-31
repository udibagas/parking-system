<?php

namespace App\Console\Commands;

use App\ParkingTransaction;
use Illuminate\Console\Command;

class DummyTransactionCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'trx:dummy';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create dummy ransaction';

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
        factory(ParkingTransaction::class, 10)->create();
        $this->info('Created 10 rows');
    }
}
