<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserLog extends Model
{
    protected $fillable = ['user_id', 'action'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function booted()
    {
        static::created(function ($model) {
            if ($model->action == 'LOGIN') {
                AbsensiOperator::create(['user_id' => $model->user_id, 'login' => $model->created_at]);
            } else {
                AbsensiOperator::whereNull('logout') // jam logoutnya masih null
                    ->where('user_id', $model->user_id) // user yg sama
                    ->update(['logout' => $model->created_at]);
            }
        });
    }
}
