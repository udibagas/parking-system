<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLastSyncOnJenisKendaraan extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('jenis_kendaraans', function (Blueprint $table) {
            $table->dateTime('last_sync')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('jenis_kendaraans', function (Blueprint $table) {
            $table->dropColumn('last_sync');
        });
    }
}
