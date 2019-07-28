<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MemberRenewal extends Model
{
    protected $fillable = [
        'parking_member_id', 'user_id',
        'from_date', 'to_date', 'amount'
    ];
}
