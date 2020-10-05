<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Printer extends Model
{
    use Notifiable;

    protected $fillable = [
        'nama',
        'ip_address',
        'port',
        'status'
    ];
}
