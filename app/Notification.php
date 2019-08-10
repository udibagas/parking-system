<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = ['message', 'read', 'parking_gate_id'];
}
