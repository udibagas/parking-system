<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PrinterSeeder extends Seeder
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
                'nama' => 'PRINTER-1',
                'ip_address' => '192.168.1.135',
                'port' => 9100,
                'status' => 1
            ],
            [
                'nama' => 'PRINTER-2',
                'ip_address' => '192.168.1.136',
                'port' => 9100,
                'status' => 1
            ],
            [
                'nama' => 'PRINTER-3',
                'ip_address' => '192.168.1.137',
                'port' => 9100,
                'status' => 1
            ],
            [
                'nama' => 'PRINTER-4',
                'ip_address' => '192.168.1.138',
                'port' => 9100,
                'status' => 1
            ],
            [
                'nama' => 'PRINTER-5',
                'ip_address' => '192.168.1.139',
                'port' => 9100,
                'status' => 1
            ],
        ];

        DB::table('printers')->truncate();
        DB::table('printers')->insert($data);
    }
}
