<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VehicleType extends Model
{
    protected $fillable = [
        'name', 'shortcut_key', 'tarif_flat',
        'denda_tiket_hilang', 'is_default',
        'mode_tarif', 'menit_pertama', 'tarif_menit_pertama',
        'menit_selanjutnya', 'tarif_menit_selanjutnya',
        'tarif_maksimum', 'tarif_menginap', 'mode_menginap'
    ];
}
