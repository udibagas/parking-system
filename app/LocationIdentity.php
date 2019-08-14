<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LocationIdentity extends Model
{
    protected $fillable = [
        'name', 'address', 'active',
        'default_plate_number',
        'additional_info_ticket'
    ];
}
