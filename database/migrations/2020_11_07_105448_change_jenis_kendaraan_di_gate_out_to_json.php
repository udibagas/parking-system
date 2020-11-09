<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeJenisKendaraanDiGateOutToJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('gate_outs', function (Blueprint $table) {
            $table->dropColumn('jenis_kendaraan');
        });

        Schema::table('gate_outs', function (Blueprint $table) {
            $table->json('jenis_kendaraan')->nullable();
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
        });
    }
}
