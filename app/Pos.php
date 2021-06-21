<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pos extends Model
{
    protected $fillable = [
        'name',
        'ip_address',
        'printer_device',
        'camera_id'
    ];

    public function camera()
    {
        return $this->belongsTo(Camera::class);
    }
}
