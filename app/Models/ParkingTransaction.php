<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ParkingTransaction extends Model
{
    protected $fillable = [
        'is_member', 'vehicle_type', 'pos_id',
        'time_in', 'barcode_number', 'card_number',
        'user_id', 'parking_member_id', 'plate_number',
        'fare', 'snapshot_in', 'operator', 'drive_thru'
    ];

    public function member()
    {
        return $this->belongsTo(ParkingMember::class, 'parking_member_id');
    }

    public function pos()
    {
        return $this->belongsTo(Pos::class);
    }
}
