<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LocationIdentity extends Model
{
    protected $fillable = ['name', 'address', 'active'];
}
