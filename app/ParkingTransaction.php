<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParkingTransaction extends Model
{
    protected $fillable = [
        'is_member', 'vehicle_type',
        'time_in', 'barcode_number', 'card_number',
        'user_id', 'parking_member_id', 'plate_number',
        'fare', 'snapshot_in', 'operator'
    ];

    protected $appends = ['durasi'];

    public function member()
    {
        return $this->belongsTo(ParkingMember::class, 'parking_member_id');
    }
}
