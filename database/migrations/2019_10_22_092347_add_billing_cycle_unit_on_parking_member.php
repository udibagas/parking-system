<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBillingCycleUnitOnParkingMember extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('parking_members', function (Blueprint $table) {
            $table->string('billing_cycle_unit')->default('months');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('parking_members', function (Blueprint $table) {
            $table->dropColumn(['billing_cycle_unit']);
        });
    }
}
