<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMemberRenewalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('member_renewals', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('parking_member_id');
            $table->bigInteger('user_id');
            $table->date('from_date');
            $table->date('to_date');
            $table->bigInteger('amount')->default(0);
            $table->integer('billing_cycle')->default(0);
            $table->string('billing_cycle_unit')->default('months');
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
        Schema::dropIfExists('member_renewals');
    }
}
