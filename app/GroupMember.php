<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GroupMember extends Model
{
    protected $fillable = ['name', 'description', 'contact_person_name', 'contact_person_email', 'contact_person_phone'];
}
