<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateManualOpenLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('manual_open_logs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('gate_out_id');
            $table->bigInteger('user_id')->comment('Operator');
            $table->string('alasan');
            $table->string('snapshot')->nullable();
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
        Schema::dropIfExists('manual_open_logs');
    }
}
