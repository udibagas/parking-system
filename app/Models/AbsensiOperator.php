<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbsensiOperator extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'login', 'logout'];

    protected $appends = ['durasi'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getDurasiAttribute()
    {
        if (!$this->logout) {
            return '';
        }

        $login = new \DateTime($this->login);
        $logout = new \DateTime($this->logout);
        $interval = $login->diff($logout);
        return $interval->format('%dH %H:%I:%S');
    }
}
