<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PosSeeder extends Seeder
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
                'nama' => 'POS-1',
                'ip_address' => '192.168.1.242',
                'printer_id' => 1
            ],
            [
                'nama' => 'POS-2',
                'ip_address' => '192.168.1.243',
                'printer_id' => 2
            ],
        ];

        DB::table('pos')->truncate();
        DB::table('pos')->insert($data);
    }
}
