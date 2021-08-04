<?php

namespace App\Models;

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

    public function scopeActive($q)
    {
        return $q->where('status', 1);
    }
}
