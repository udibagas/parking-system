<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GateOut extends Model
{
    protected $fillable = [
        'nama',
        'jenis_kendaraan',
        'device',
        'baudrate',
        'open_command',
        'close_command',
        'kamera',
        'pos_id',
        'status'
    ];

    protected $casts = ['kamera' => 'json', 'status' => 'boolean'];

    protected $appends = ['kameraList'];

    public function pos()
    {
        return $this->belongsTo(Pos::class);
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
