<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\GateIn;
use App\ParkingTransaction;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(ParkingTransaction::class, function (Faker $faker) {
    return [
        'time_in' => now(),
        'gate_in_id' => GateIn::where('status', 1)->first()->id,
        'nomor_barcode' => Str::random(5),
        'jenis_kendaraan' => 'MOTOR'
    ];
});
