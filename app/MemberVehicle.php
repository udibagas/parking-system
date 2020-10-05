<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MemberVehicle extends Model
{
    protected $fillable = [
        'member_id',
        'jenis_kendaraan',
        'plat_nomor',
        'merk',
        'type',
        'tahun',
        'warna',
    ];
}
