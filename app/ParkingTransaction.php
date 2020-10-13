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
        'manual'
    ];

    protected $appends = ['durasi'];

    public function setNomorBarcodeAttribute($value)
    {
        $this->attributes['nomor_barcode'] = strtoupper($value);
    }

    public function member()
    {
        return $this->belongsTo(ParkingMember::class, 'parking_member_id');
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
}
