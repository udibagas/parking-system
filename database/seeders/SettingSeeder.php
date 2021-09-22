<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('settings')->truncate();
        DB::table('settings')->insert([
            'nama_lokasi' => 'MITRATEKNIK',
            'alamat_lokasi' => 'Semarang',
            'info_tambahan_tiket' => 'JANGAN TINGGALKAN BARANG BAWAAN ANDA',
            'jml_kendaraan_per_kartu' => 1,
            'hapus_snapshot_dalam_hari' => 30,
            'member_auto_open' => 1,
            'must_checkout' => 0,
            'plat_nomor_default' => 'H'
        ]);
    }
}
