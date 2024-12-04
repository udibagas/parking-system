<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MemberRenewal extends Model
{
    protected $fillable = [
        'member_id',
        'user_id',
        'dari_tanggal',
        'sampai_tanggal',
        'jumlah',
        'siklus_pembayaran_unit',
        'siklus_pembayaran'
    ];

    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
