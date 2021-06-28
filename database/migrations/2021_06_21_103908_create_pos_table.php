<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->ipAddress('ip_address');
            $table->string('printer_device')->comment('contoh: /dev/ttyUSB0');
            $table->string('gate_device_name');
            $table->smallInteger('gate_device_baudrate');
            $table->string('gate_command_open');
            $table->string('gate_command_close')->nullable();
            $table->string('camera_snapshot_url');
            $table->string('camera_username');
            $table->string('camera_password');
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
        Schema::dropIfExists('pos');
    }
}
