<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParkingTransaction extends Model
{
    protected $fillable = [
        'is_member', 'vehicle_type', 'gate_in_id', 'gate_out_id',
        'time_in', 'time_out', 'barcode_number', 'card_number',
        'note', 'user_id', 'parking_member_id', 'plate_number',
        'fare', 'snapshot_in', 'snapshot_out', 'operator',
        'denda', 'edit', 'edit_by', 'manual'
    ];

    protected $appends = ['durasi'];

    public function member() {
        return $this->belongsTo(ParkingMember::class, 'parking_member_id');
    }

    public function getDurasiAttribute()
    {
        $in = new \DateTime($this->time_in);
        $out = new \DateTime($this->time_out);
        $interval = $in->diff($out);
        return $interval->format('%d %H:%I:%S');
    }
}
