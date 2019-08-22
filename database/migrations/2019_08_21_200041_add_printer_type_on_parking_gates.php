<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPrinterTypeOnParkingGates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('parking_gates', function (Blueprint $table) {
            $table->string('printer_type')->default('network');
            $table->string('printer_device')->nullable();
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
            $table->dropColumn(['printer_type', 'printer_device']);
        });
    }
}
