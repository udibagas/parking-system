<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ParkingTransaction extends Model
{
    protected $fillable = [
        'is_member', 'vehicle_type', 'pos_id',
        'time_in', 'barcode_number', 'card_number',
        'user_id', 'parking_member_id', 'plate_number',
        'fare', 'snapshot_in', 'operator', 'drive_thru'
    ];

    protected $appends = ['snapshot_url'];

    public function member()
    {
        return $this->belongsTo(ParkingMember::class, 'parking_member_id');
    }

    public function pos()
    {
        return $this->belongsTo(Pos::class);
    }

    public function getSnapshotUrlAttribute()
    {
        return url(Storage::url($this->snapshot_in));
    }

    protected static function booted()
    {
        static::creating(function ($model) {
            $model->time_in = now();
            $model->barcode_number = strtoupper(Str::random(5));
        });

        static::created(function ($model) {
            if ($model->is_member) {
                ParkingMember::where('id', $model->parking_member_id)->update([
                    'last_transaction' => now()
                ]);
            }
        });
    }
}
