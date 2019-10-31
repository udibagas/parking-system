<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\ParkingGate;
use App\ParkingTransaction;
use Faker\Generator as Faker;

$factory->define(ParkingTransaction::class, function (Faker $faker) {
    return [
        'time_in' => now(),
        'gate_in_id' => ParkingGate::where('type', 'IN')->where('active', 1)->first()->id,
        'barcode_number' => str_random(5),
        'vehicle_type' => 'MOTOR'
    ];
});
