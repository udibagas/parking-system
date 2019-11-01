<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParkingGate extends Model
{
    protected $fillable = [
        'name', 'type', 'vehicle_type',
        'controller_ip_address', 'controller_port',
        'controller_device', 'controller_baudrate',
        'printer_ip_address', 'printer_type', 'printer_device',
        'camera_ip_address', 'camera_username',
        'camera_password', 'camera_auth_type',
        'camera_image_snapshot_url',
        'camera_video_snapshot_url',
        'active', 'camera_status',
        'shortcut_key'
    ];
}
