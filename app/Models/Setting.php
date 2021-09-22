<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'jml_kendaraan_per_kartu',
        'masa_aktif_member',
        'nama_lokasi',
        'alamat_lokasi',
        'info_tambahan_tiket',
        'plat_nomor_default',
        'must_checkout',
        'member_auto_open',
        'disable_plat_nomor',
        'hapus_snapshot_dalam_hari',
        'hapus_transaksi_dalam_hari',
        'id_pelanggan',
        'server_address'
    ];

    protected $casts = ['disable_plat_nomor' => 'boolean'];
}
