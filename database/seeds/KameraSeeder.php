<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KameraSeeder extends Seeder
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
                'nama' => 'KAMERA1',
                'ip_address' => '192.168.1.201',
                'snapshot_url' => 'http://192.168.1.201/cgi-bin/snapshot',
                'username' => 'admin',
                'password' => 'admin123',
                'auth_type' => 'digest',
                'status' => 1
            ],
            [
                'nama' => 'KAMERA2',
                'ip_address' => '192.168.1.202',
                'snapshot_url' => 'http://192.168.1.202/cgi-bin/snapshot',
                'username' => 'admin',
                'password' => 'admin123',
                'auth_type' => 'digest',
                'status' => 1
            ],
            [
                'nama' => 'KAMERA3',
                'ip_address' => '192.168.1.203',
                'snapshot_url' => 'http://192.168.1.203/cgi-bin/snapshot',
                'username' => 'admin',
                'password' => 'admin123',
                'auth_type' => 'digest',
                'status' => 1
            ],
            [
                'nama' => 'KAMERA4',
                'ip_address' => '192.168.1.204',
                'snapshot_url' => 'http://192.168.1.204/cgi-bin/snapshot',
                'username' => 'admin',
                'password' => 'admin123',
                'auth_type' => 'digest',
                'status' => 1
            ]
        ];

        DB::table('kameras')->truncate();
        DB::table('kameras')->insert($data);
    }
}
