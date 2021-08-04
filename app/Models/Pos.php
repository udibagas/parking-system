<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pos extends Model
{
    protected $fillable = [
        'nama',
        'ip_address',
        'printer_id',
    ];

    protected $with = ['printer'];

    public function printer()
    {
        return $this->belongsTo(Printer::class);
    }

    public function gateOuts()
    {
        return $this->hasMany(GateOut::class);
    }
}
