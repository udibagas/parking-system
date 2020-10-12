<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class JenisKendaraan extends Model
{
    protected $fillable = [
        'nama',
        'shortcut_key',
        'tarif_flat',
        'denda_tiket_hilang',
        'is_default',
        'mode_tarif',
        'menit_pertama',
        'tarif_menit_pertama',
        'menit_selanjutnya',
        'tarif_menit_selanjutnya',
        'tarif_maksimum',
        'tarif_menginap',
        'mode_menginap'
    ];

    const MODE_TARIF_FLAT = 0;

    const MODE_TARIF_PROGRESIF = 1;
}
