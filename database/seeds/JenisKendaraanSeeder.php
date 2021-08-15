<?php

use App\Models\JenisKendaraan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JenisKendaraanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'nama' => 'MOTOR',
                'shortcut_key' => '1',
                'mode_tarif' => JenisKendaraan::MODE_TARIF_FLAT,
                'tarif_flat' => 1000
            ],
            [
                'nama' => 'MOBIL',
                'shortcut_key' => '2',
                'mode_tarif' => JenisKendaraan::MODE_TARIF_FLAT,
                'tarif_flat' => 2000
            ],
            [
                'nama' => 'BOX',
                'shortcut_key' => '3',
                'mode_tarif' => JenisKendaraan::MODE_TARIF_FLAT,
                'tarif_flat' => 2000
            ]
        ];

        DB::table('jenis_kendaraans')->truncate();
        DB::table('jenis_kendaraans')->insert($data);
    }
}
