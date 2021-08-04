<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AreaParkir extends Model
{
    protected $fillable = [
        'nama',
        'keterangan',
        'jenis_kendaraan',
        'kapasitas',
        'terisi'
    ];

    protected $casts = [
        'jenis_kendaraan' => 'json'
    ];
}
