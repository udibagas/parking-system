<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pos extends Model
{
    protected $fillable = [
        'nama',
        'ip_address',
        'ssh_port',
        'username',
        'password',
        'gate_out',
        'printer_id',
    ];

    protected $casts = ['gate_out' => 'json'];

    protected $appends = ['gateOutList'];

    protected $with = ['printer'];

    public function printer()
    {
        return $this->belongsTo(Printer::class);
    }

    public function getGateOutListAttribute()
    {
        return $this->gate_out ? GateOut::whereIn('id', $this->gate_out)->get() : null;
    }

    public function gateOut()
    {
        return $this->hasMany(GateOut::class);
    }
}
