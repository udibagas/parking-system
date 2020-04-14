<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'jml_kendaraan_per_kartu', 'masa_aktif_member',
        'location_name', 'location_address', 'additional_info_ticket',
        'default_plate_number', 'member_auto_open',
        'hapus_snapshot_dalam_hari', 'hapus_transaksi_dalam_hari',
        'camera_snapshot_url', 'camera_username',
        'camera_password', 'camera_auth_type',
        'printer_ip_address', 'printer_device'
    ];
}
