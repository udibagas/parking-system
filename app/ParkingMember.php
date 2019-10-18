<?php

namespace App;

use DateTime;
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

    protected $appends = ['expired_in', 'expired'];

    protected $with = ['vehicles'];

    protected $casts = ['paid' => 'boolean'];

    public function vehicles()
    {
        return $this->hasMany(MemberVehicle::class);
    }

    public function getExpiredInAttribute()
    {
        return (int) (new DateTime($this->expiry_date))->diff(new DateTime())->format('%a');
    }

    public function getExpiredAttribute()
    {
        return strtotime(now()) > strtotime($this->expiry_date);
    }
}
