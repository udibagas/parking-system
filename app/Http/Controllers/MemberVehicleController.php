<?php

namespace App\Http\Controllers;

use App\MemberVehicle;

class MemberVehicleController extends Controller
{
    public function destroy(MemberVehicle $memberVehicle)
    {
        $memberVehicle->delete();
        return ['message' => 'Data berhasil disimpan'];
    }
}
