<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GateOut extends Model
{
    protected $fillable = [
        'shortcut_key',
        'nama',
        'jenis_kendaraan',
        'device',
        'baudrate',
        'open_command',
        'close_command',
        'kamera',
        'pos_id',
        'status',
        'running_text_device',
        'running_text_baudrate',
        'uhf_reader_host',
        'uhf_reader_port'
    ];

    protected $casts = ['kamera' => 'json', 'jenis_kendaraan' => 'json'];

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

    public function scopeActive($q)
    {
        return $q->where('status', 1);
    }
}
