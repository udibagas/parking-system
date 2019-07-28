<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParkingGatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parking_gates', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('type', 2); // IN or OUT
            $table->string('vehicle_type'); // MOBIL or MOTOR
            $table->string('controller_ip_address', 15);
            $table->integer('controller_port');
            $table->string('printer_ip_address', 15)->nullable();
            $table->string('camera_ip_address', 15);
            $table->string('camera_username');
            $table->string('camera_password');
            $table->string('camera_image_snapshot_url')->nullable();
            $table->string('camera_video_snapshot_url')->nullable();
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
        Schema::dropIfExists('parking_gates');
    }
}
