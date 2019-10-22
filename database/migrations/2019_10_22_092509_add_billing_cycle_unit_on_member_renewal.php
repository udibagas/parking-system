<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBillingCycleUnitOnMemberRenewal extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('member_renewals', function (Blueprint $table) {
            $table->integer('billing_cycle')->default(0);
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
        Schema::table('member_renewals', function (Blueprint $table) {
            $table->dropColumn(['billing_cycle_unit', 'billing_cycle']);
        });
    }
}
