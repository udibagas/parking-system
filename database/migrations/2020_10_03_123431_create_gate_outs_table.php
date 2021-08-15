<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGateOutsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gate_outs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('shortcut_key');
            $table->string('nama');
            $table->string('jenis_kendaraan');
            $table->string('device');
            $table->smallInteger('baudrate');
            $table->string('open_command');
            $table->string('close_command')->nullable();
            $table->json('kamera')->nullable();
            $table->unsignedBigInteger('pos_id');
            $table->boolean('status')->default(true);
            $table->string('running_text_device')->nullable();
            $table->smallInteger('running_text_baudrate')->nullable();
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
        Schema::dropIfExists('gate_outs');
    }
}
