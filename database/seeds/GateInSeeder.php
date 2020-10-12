<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GateInSeeder extends Seeder
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
                'nama' => 'GATE MOTOR',
                'jenis_kendaraan' => 'MOTOR',
                'controller_ip_address' => '192.168.1.100',
                'controller_port' => 5000,
                'shortcut_key' => 1,
                'printer_id' => 2,
                'kamera' => json_encode([1]),
                'status' => 1
            ],
            [
                'nama' => 'GATE MOBIL',
                'jenis_kendaraan' => 'MOBIL',
                'controller_ip_address' => '192.168.1.101',
                'controller_port' => 5000,
                'shortcut_key' => 2,
                'printer_id' => 2,
                'kamera' => json_encode([2]),
                'status' => 1
            ],
        ];

        DB::table('gate_ins')->truncate();
        DB::table('gate_ins')->insert($data);
    }
}
