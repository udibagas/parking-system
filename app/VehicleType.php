<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VehicleType extends Model
{
    protected $fillable = [
        'name', 'shortcut_key', 'tarif_flat',
        'denda_tiket_hilang'
    ];
}
