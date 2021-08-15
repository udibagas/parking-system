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
                'nama' => 'KAMERA-1',
                'snapshot_url' => 'http://192.168.1.108/cgi-bin/snapshot.cgi',
                'username' => 'admin',
                'password' => 'admin123',
                'auth_type' => 'digest',
                'status' => 1
            ],
            [
                'nama' => 'KAMERA-2',
                'snapshot_url' => 'http://192.168.1.109/cgi-bin/snapshot.cgi',
                'username' => 'admin',
                'password' => 'admin123',
                'auth_type' => 'digest',
                'status' => 1
            ],
            [
                'nama' => 'KAMERA-3',
                'snapshot_url' => 'http://192.168.1.110/cgi-bin/snapshot.cgi',
                'username' => 'admin',
                'password' => 'admin123',
                'auth_type' => 'digest',
                'status' => 1
            ],
            [
                'nama' => 'KAMERA-4',
                'snapshot_url' => 'http://192.168.1.110/cgi-bin/snapshot.cgi',
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
