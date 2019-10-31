<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ManualOpenLog extends Model
{
    protected $fillable = ['user_id', 'parking_gate_id', 'alasan', 'snapshot'];

    protected $with = ['user'];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
