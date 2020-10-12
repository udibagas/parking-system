<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Snapshot extends Model
{
    protected $fillable = [
        'parking_transaction_id',
        'kamera_id',
        'snapshotable_id',
        'snapshotable_type',
        'path'
    ];

    public function snapshotable()
    {
        return $this->morphTo();
    }
}
