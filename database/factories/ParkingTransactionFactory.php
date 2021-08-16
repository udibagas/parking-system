<?php

namespace Database\Factories;

use App\Models\GateIn;
use App\Models\ParkingTransaction;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ParkingTransactionFactory extends Factory {

    protected $model = ParkingTransaction::class;

    public function definition()
    {
        $timeIn = now();

        return [
            'time_in' => $timeIn,
            'shift_id' => ParkingTransaction::setShift($timeIn),
            'gate_in_id' => GateIn::where('status', 1)->first()->id,
            'nomor_barcode' => Str::random(5),
            'jenis_kendaraan' => 'MOTOR'
        ];
    }

}
