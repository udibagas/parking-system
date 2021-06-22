<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MemberVehicle extends Model
{
    protected $fillable = [
        'parking_member_id', 'vehicle_type',
        'plate_number', 'merk', 'type',
        'tahun', 'warna',
    ];
}
