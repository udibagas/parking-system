<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GateOutSeeder extends Seeder
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
                'shortcut_key' => '1',
                'nama' => 'GATE MOTOR',
                'jenis_kendaraan' => ['MOTOR'],
                'device' => '/dev/ttyUSB0',
                'baudrate' => 9600,
                'open_command' => '*TRIG1#',
                'kamera' => json_encode([3]),
                'pos_id' => 1,
                'status' => 1
            ],
            [
                'shortcut_key' => '2',
                'nama' => 'GATE MOBIL',
                'jenis_kendaraan' => ['MOBIL'],
                'device' => '/dev/ttyUSB0',
                'baudrate' => 9600,
                'open_command' => '*TRIG2#',
                'kamera' => json_encode([4]),
                'pos_id' => 1,
                'status' => 1
            ]
        ];

        DB::table('gate_outs')->truncate();
        DB::table('gate_outs')->insert($data);
    }
}
