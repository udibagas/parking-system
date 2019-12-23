<?php

use App\LocationIdentity;
use App\Setting;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddLocationInformationOnSetting extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::table('settings', function (Blueprint $table) {
            $table->string('location_name')->nullable();
            $table->string('location_address')->nullable();
            $table->text('additional_info_ticket')->nullable();
            $table->string('default_plate_number')->nullable();
        });

        // $location = LocationIdentity::where('active', 1)->first();
        // $setting = Setting::first();

        // if ($location)
        // {
        //     $data = [
        //         'location_name' => $location->name,
        //         'location_address' => $location->address,
        //         'additional_info_ticket' => $location->additional_info_ticket,
        //         'default_plate_number' => $location->default_plate_number,
        //     ];

        //     if ($setting) {
        //         $setting->update($data);
        //     } else {
        //         Setting::create($data);
        //     }
        // }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn(['location_name', 'location_address', 'additional_info_ticket', 'default_plate_number']);
        });
    }
}
