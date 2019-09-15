<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMemberVehiclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('member_vehicles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('parking_member_id');
            $table->string('vehicle_type');
            $table->string('plate_number');
            $table->string('merk');
            $table->string('type');
            $table->string('tahun', 4);
            $table->string('warna');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('member_vehicles');
    }
}
