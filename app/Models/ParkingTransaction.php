<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use function Illuminate\Events\queueable;

class ParkingTransaction extends Model
{
    use HasFactory;

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

    protected static function booted()
    {
        static::created(queueable(function ($model) {
            AreaParkir::whereJsonContains('jenis_kendaraan', $model->jenis_kendaraan)->increment('terisi');

            if ($model->is_member) {
                Member::find($model->member_id)->update(['last_in' => $model->time_in]);
            }
        }));

        static::updated(queueable(function ($model) {
            if ($model->is_member && $model->time_out) {
                Member::find($model->member_id)->update(['last_out' => $model->time_out]);
            }

            // TODO: sepertinya logic-nya belum bener
            if (!$model->edit && $model->time_out) {
                AreaParkir::whereJsonContains('jenis_kendaraan', $model->jenis_kendaraan)->decrement('terisi');
            }
        }));
    }
}
