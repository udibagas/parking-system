<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AllowControllerIpNull extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('parking_gates', function (Blueprint $table) {
            $table->string('controller_ip_address', 15)->nullable()->change();
            $table->integer('controller_port')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('parking_gates', function (Blueprint $table) {
            //
        });
    }
}
