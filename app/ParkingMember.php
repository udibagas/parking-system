<?php

namespace App;

use DateTime;
use Illuminate\Database\Eloquent\Model;

class ParkingMember extends Model
{
    protected $fillable = [
        'name', 'card_number',
        'is_active', 'expiry_date',
        'last_transaction', 'email', 'phone',
        'group_member_id', 'paid', 'billing_cycle_unit',
        'register_date', 'billing_cycle', 'fare'
    ];

    protected $appends = ['expired_in', 'expired'];

    protected $with = ['vehicles'];

    public function vehicles()
    {
        return $this->hasMany(MemberVehicle::class);
    }

    public function groupMember()
    {
        return $this->belongsTo(GroupMember::class);
    }

    public function getExpiredInAttribute()
    {
        return (int) (new DateTime($this->expiry_date))->diff(new DateTime(date('Y-m-d')))->format('%a');
    }

    public function getExpiredAttribute()
    {
        return strtotime(date('Y-m-d')) > strtotime($this->expiry_date);
    }
}
