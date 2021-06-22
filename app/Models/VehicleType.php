<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleType extends Model
{
    protected $fillable = [
        'name', 'shortcut_key', 'tarif_flat'
    ];
}
