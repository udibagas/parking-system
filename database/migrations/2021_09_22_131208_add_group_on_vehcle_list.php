<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddGroupOnVehcleList extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('jenis_kendaraans', function (Blueprint $table) {
            $table->string('group')->nullable();
        });

        Schema::table('parking_transactions', function (Blueprint $table) {
            $table->string('group')->nullable();
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
            $table->dropColumn('group');
        });

        Schema::table('parking_transactions', function (Blueprint $table) {
            $table->dropColumn('group');
        });
    }
}
