<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParkingGate extends Model
{
    protected $fillable = [
        'name', 'type', 'vehicle_type',
        'gate_ip_address', 'gate_port',
        'printer_ip_address',
        'camera_ip_address', 'camera_username',
        'camera_password',
        'camera_image_snapshot_url',
        'camera_video_snapshot_url'
    ];
}
