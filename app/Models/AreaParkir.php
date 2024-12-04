<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class AreaParkir extends Model
{
    use Notifiable;

    protected $fillable = [
        'nama',
        'keterangan',
        'jenis_kendaraan',
        'kapasitas',
        'terisi'
    ];

    protected $casts = [
        'jenis_kendaraan' => 'json'
    ];

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
