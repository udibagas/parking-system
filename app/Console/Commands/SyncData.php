<?php

namespace App\Console\Commands;

use App\Models\JenisKendaraan;
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
                COALESCE(CAST(SUM(tarif + denda) AS UNSIGNED), 0) AS pendapatan,
                COUNT(id) AS jumlah_kendaraan,
                jenis_kendaraan,
                `group`
            FROM parking_transactions
            WHERE time_out IS NOT NULL
                AND DATE(time_out) = ?
                AND `group` IS NOT NULL
            GROUP BY jenis_kendaraan, tanggal, `group`
        SQL;

        $data           = DB::select($sql, [date('Y-m-d')]);

        $sql = <<<SQL
            SELECT
                DATE(time_in) AS tanggal,
                COUNT(id) AS jumlah,
                jenis_kendaraan,
                `group`
            FROM parking_transactions
            WHERE time_out IS NOT NULL
                AND `group` IS NOT NULL
            GROUP BY jenis_kendaraan, tanggal, `group`
        SQL;

        $terparkir = DB::select($sql);
        $customer_id = Setting::first()->id_pelanggan;
        $tarif = JenisKendaraan::all();

        // $this->line("CUSTOMER ID : " . $customer_id);
        // $this->line("PENDAPATAN : " . json_encode($data));
        // $this->line("TERPARKIR : " . json_encode($terparkir));
        // $this->line("TARIF : " . json_encode($tarif));

        try {
            $client   = new Client(['timeout' => 10]);
            $response = $client->post(env('CLOUD_SERVER_URL', 'http://127.0.0.1:8000/api/report'), [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json',
                ],
                'json' => compact('data', 'customer_id', 'terparkir', 'tarif'),
            ]);

            $body = $response->getBody();
            $json = json_decode($body);

            foreach ($json->tarif as $tarif) {
                $jenisKendaraan = JenisKendaraan::firstOrCreate([
                    'nama' => $tarif->nama,
                    'group' => $tarif->group,
                ], (array) $tarif);

                if (strtotime($tarif->updated_at) > strtotime($jenisKendaraan->last_sync)) {
                    $jenisKendaraan->update(array_merge((array) $tarif, ['last_sync' => now()]));
                }
            }
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
