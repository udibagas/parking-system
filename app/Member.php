<?php

namespace App;

use DateTime;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = [
        'nama', 'nomor_kartu',
        'status', 'expiry_date', 'balance',
        'last_transaction', 'email', 'phone',
        'group_member_id', 'berbayar', 'siklus_pembayaran_unit',
        'register_date', 'siklus_pembayaran', 'tarif'
    ];

    protected $appends = ['expired_in', 'expired'];

    protected $with = ['vehicles', 'group'];

    public function vehicles()
    {
        return $this->hasMany(MemberVehicle::class);
    }

    public function getExpiredInAttribute()
    {
        return (int) (new DateTime($this->expiry_date))->diff(new DateTime(date('Y-m-d')))->format('%a');
    }

    public function getExpiredAttribute()
    {
        return strtotime(date('Y-m-d')) > strtotime($this->expiry_date);
    }

    public function group()
    {
        return $this->belongsTo(GroupMember::class, 'group_member_id');
    }
}
