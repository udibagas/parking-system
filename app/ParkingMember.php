<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParkingMember extends Model
{
    protected $fillable = [
        'name', 'card_number', 'vehicle_type',
        'is_active', 'expiry_date', 'balance',
        'last_transaction', 'plate_number',
        'email', 'phone'
    ];
}
