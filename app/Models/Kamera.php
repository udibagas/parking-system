<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Kamera extends Model
{
    use Notifiable;

    protected $fillable = [
        'nama',
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

    /**
     * The channels the user receives notification broadcasts on.
     *
     * @return string
     */
    public function receivesBroadcastNotificationsOn()
    {
        return 'notification';
    }
}
