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
            'nama' => 'POS1',
            'ip_address' => '192.168.1.15',
            'printer_id' => 1
        ];

        DB::table('pos')->truncate();
        DB::table('pos')->insert($data);
    }
}
