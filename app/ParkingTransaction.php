<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParkingTransaction extends Model
{
    protected $fillable = [
        'is_member',
        'jenis_kendaraan',
        'gate_in_id',
        'gate_out_id',
        'time_in',
        'time_out',
        'nomor_barcode',
        'nomor_kartu',
        'note',
        'user_id',
        'member_id',
        'plat_nomor',
        'tarif',
        'operator',
        'denda',
        'edit',
        'edit_by',
        'manual',
        'shift_id'
    ];

    protected $appends = ['durasi'];

    public function setNomorBarcodeAttribute($value)
    {
        $this->attributes['nomor_barcode'] = strtoupper($value);
    }

    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }

    public function getDurasiAttribute()
    {
        $in = new \DateTime($this->time_in);
        $out = new \DateTime($this->time_out);
        $interval = $in->diff($out);
        return $interval->format('%dH %H:%I:%S');
    }

    public function gateIn()
    {
        return $this->belongsTo(GateIn::class);
    }

    public function gateOut()
    {
        return $this->belongsTo(GateOut::class);
    }

    public function snapshots()
    {
        return $this->hasMany(Snapshot::class);
    }

    public function shift()
    {
        return $this->belongsTo(Shift::class);
    }

    public static function setShift($timeIn)
    {
        $shift = Shift::whereRaw('TIME(?) BETWEEN mulai AND selesai', [$timeIn, $timeIn])->first();
        return $shift ? $shift->id : null;
    }
}
