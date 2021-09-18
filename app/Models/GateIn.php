<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class GateIn extends Model
{
    use Notifiable;

    protected $fillable = [
        'nama',
        'jenis_kendaraan',
        'controller_ip_address',
        'controller_port',
        'status',
        'shortcut_key',
        'kamera',
        'printer_id'
    ];

    protected $casts = ['kamera' => 'json'];

    protected $appends = ['kameraList'];

    public function printer()
    {
        return $this->belongsTo(Printer::class);
    }

    public function getKameraListAttribute()
    {
        return $this->kamera ? Kamera::whereIn('id', $this->kamera)->get() : null;
    }

    public function snapshots()
    {
        return $this->morphMany(Snapshot::class, 'snapshotable');
    }

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
