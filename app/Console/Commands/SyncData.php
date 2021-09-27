<?php

namespace App\Console\Commands;

use App\Models\ParkingTransaction;
use App\Models\Setting;
use GuzzleHttp\Client;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SyncData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'data:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync data to cloud';

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
     * @return int
     */
    public function handle()
    {
        // TODO: ambil data hari ini grouping berdasarkan jenis kendaraan
        // data yang perlu dikirim adalah
        //     - data transaksi harian berdasarkan jenis kendaraan
        //     - data kendaraan yang masih terparkir
        //     - tarif

        $sql = <<<SQL
            SELECT
                DATE(time_out) AS tanggal,
                CAST(SUM(tarif + denda) AS UNSIGNED) AS pendapatan,
                COUNT(id) AS jumlah_kendaraan,
                jenis_kendaraan,
                `group`
            FROM parking_transactions
            WHERE time_out IS NOT NULL
            GROUP BY jenis_kendaraan, tanggal, `group`
        SQL;

        $data           = DB::select($sql, [date('Y-m-d')]);
        $customer_id    = Setting::first()->id_pelanggan;
        // $terparkir      = ParkingTransaction::whereNull('time_out')->count();

        $this->line("SENDING : " . json_encode($data));

        try {
            $client   = new Client(['timeout' => 10]);
            $response = $client->post(env('CLOUD_SERVER_URL', 'http://localhost:8000/api/sync'), [
                'headers' => ['Content-Type' => 'application/json'],
                'json' => compact('data', 'customer_id'),
            ]);

            $this->line($response->getBody());
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
