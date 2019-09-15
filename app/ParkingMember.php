<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParkingMember extends Model
{
    protected $fillable = [
        'name', 'card_number',
        'is_active', 'expiry_date', 'balance',
        'last_transaction', 'email', 'phone',
        'group_member_id', 'paid',
        'register_date', 'billing_cycle', 'fare'
    ];

    protected $with = ['vehicles'];

    public function vehicles() {
        return $this->hasMany(MemberVehicle::class);
    }
}
