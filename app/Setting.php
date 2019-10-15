<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['jml_kendaraan_per_kartu', 'masa_aktif_member'];
}
