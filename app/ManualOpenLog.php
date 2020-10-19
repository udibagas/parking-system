<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ManualOpenLog extends Model
{
    protected $fillable = ['user_id', 'gate_out_id', 'alasan', 'snapshots'];

    protected $with = ['user'];

    protected $casts = ['snapshots' => 'json'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function gateOut()
    {
        return $this->belongsTo(GateOut::class);
    }
}
