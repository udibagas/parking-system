<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ManualOpenLog extends Model
{
    protected $fillable = ['user_id', 'gate_out_id', 'alasan', 'snapshots'];

    protected $with = ['user'];

    protected $casts = ['snapshots' => 'json'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function gateOut()
    {
        return $this->belongsTo(GateOut::class);
    }

    public function getSnapshotsAttribute($snapshots)
    {
        $snapshots = json_decode($snapshots);

        if (is_array($snapshots)) {
            return array_map(function ($snapshot) {
                $snapshot['url'] = Storage::url($snapshot['path']);
                return $snapshot;
            }, $snapshots);
        }

        return null;
    }
}
