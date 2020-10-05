<?php

namespace App;

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

    protected $with = ['printer'];

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
}
