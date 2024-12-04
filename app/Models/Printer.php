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

    protected $casts = [
        'status' => 'boolean'
    ];

    protected $appends = ['type'];

    public function scopeActive($q)
    {
        return $q->where('status', 1);
    }

    public function getTypeAttribute()
    {
        return filter_var($this->ip_address, FILTER_VALIDATE_IP) ? 'network' : 'local';
    }
}
