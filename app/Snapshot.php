<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Snapshot extends Model
{
    protected $fillable = [
        'parking_transaction_id',
        'kamera_id',
        'snapshotable_id',
        'snapshotable_type',
        'path',
        'filename'
    ];

    protected $appends = ['url'];

    public function snapshotable()
    {
        return $this->morphTo();
    }

    public function getUrlAttribute()
    {
        return Storage::url($this->path);
    }
}
