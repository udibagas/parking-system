<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pos extends Model
{
    protected $fillable = [
        'name',
        'ip_address',
        'printer_device',
        'camera_snapshot_url',
        'camera_username',
        'camera_password',
        'gate_device_name',
        'gate_device_baudrate',
        'gate_command_open',
        'gate_command_close'
    ];
}
