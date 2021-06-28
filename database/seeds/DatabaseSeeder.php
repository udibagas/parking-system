<?php

use App\Models\Pos;
use App\Models\Setting;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\VehicleType;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@mitrateknik.co.id',
            'password' => bcrypt('admin123'),
            'role' => 1,
            'status' => 1
        ]);

        Setting::create([
            'jml_kendaraan_per_kartu' => 1,
            'location_name' => 'RSVP SEMARANG',
            'location_address' => 'Semarang',
            'additional_info_ticket' => 'Jangan tinggalkan barang bawaan Anda',
            'default_plate_number' => 'H',
            'member_auto_open' => 1,
            'hapus_snapshot_dalam_hari' => 0,
            'hapus_transaksi_dalam_hari' => 0,
        ]);

        // $this->call(UsersTableSeeder::class);

        Pos::create([
            'name' => 'POS1',
            'ip_address' => '127.0.0.1',
            'printer_device' => '/dev/ttyprintk',
            'camera_snapshot_url' => 'http://192.168.1.109/cgi-bin/snapshot.cgi',
            'camera_username' => 'admin',
            'camera_password' => 'admin123',
            'gate_device_name' => '/dev/ttyUSB0',
            'gate_device_baudrate' => 9600,
            'gate_command_open' => '*TRIG2*',
        ]);

        VehicleType::insert([
            [
                'name' => 'MOTOR',
                'shortcut_key' => '1',
                'tarif_flat' => '1000'
            ],

            [
                'name' => 'MOBIL',
                'shortcut_key' => '2',
                'tarif_flat' => '2000'
            ],

            [
                'name' => 'BOX',
                'shortcut_key' => '3',
                'tarif_flat' => '4000'
            ]
        ]);
    }
}
