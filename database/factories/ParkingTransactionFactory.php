<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\ParkingTransaction;
use Faker\Generator as Faker;

$factory->define(ParkingTransaction::class, function (Faker $faker) {
    return [
        'time_in' => now(),
        'barcode_number' => str_random(5),
        'vehicle_type' => 'MOTOR'
    ];
});
