<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGateInsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gate_ins', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nama');
            $table->string('jenis_kendaraan');
            $table->string('controller_ip_address', 15)->nullable();
            $table->string('controller_port')->nullable();
            $table->string('shortcut_key', 1)->nullable();
            $table->unsignedBigInteger('printer_id');
            $table->json('kamera')->nullable()->comment('allow attach multiple camera on 1 gate');
            $table->boolean('status')->default(true);
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
        Schema::dropIfExists('gate_ins');
    }
}
