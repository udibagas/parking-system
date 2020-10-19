<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Kamera extends Model
{
    use Notifiable;

    protected $fillable = [
        'nama',
        'ip_address',
        'snapshot_url',
        'username',
        'password',
        'auth_type',
        'status'
    ];

    public function scopeActive($q)
    {
        return $q->where('status', 1);
    }
}
