<?php

namespace Database\Seeders;

use App\Models\AreaParkir;
use Illuminate\Database\Seeder;

class AreaParkirSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AreaParkir::create([
            'nama' => 'PARKIR 1',
            'jenis_kendaraan' => ['MOTOR', 'MOBIL', 'BOX'],
            'kapasitas' => 100,
            'terisi' => 0
        ]);
    }
}
