<?php

namespace App\Console\Commands;

use App\Models\ParkingTransaction;
use Illuminate\Console\Command;

class DeleteTransactionCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'trx:delete {age}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Hapus transaksi dalam hari';

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
        ParkingTransaction::whereRaw('DATEDIFF(NOW(), created_at) >= :age', [
            ':age' => $this->argument('age')
        ])->delete();

        $this->info('Transaksi dihapus ' . $this->argument('age') . ' hari ke belakang di hapus');
    }
}
