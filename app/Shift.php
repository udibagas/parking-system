<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    protected $fillable = ['mulai', 'selesai', 'nama'];

    public function getMulaiAttribute($value)
    {
        return substr($value, 0, 5);
    }

    public function getSelesaiAttribute($value)
    {
        return substr($value, 0, 5);
    }
}
