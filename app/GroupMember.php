<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GroupMember extends Model
{
    protected $fillable = [
        'nama',
        'keterangan',
        'contact_person_name',
        'contact_person_email',
        'contact_person_phone'
    ];
}
