<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRunningTextOnPos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('gate_outs', function (Blueprint $table) {
            $table->string('running_text_device')->nullable();
            $table->smallInteger('running_text_baudrate')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('gate_outs', function (Blueprint $table) {
            $table->dropColumn(['running_text_device', 'running_text_baudrate']);
        });
    }
}
