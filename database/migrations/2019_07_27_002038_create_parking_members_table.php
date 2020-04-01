<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParkingMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parking_members', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('card_number');
            $table->boolean('is_active')->default(0);
            $table->date('expiry_date')->nullable();
            $table->dateTime('last_transaction')->nullable();
            $table->bigInteger('group_member_id')->nullable();
            $table->bigInteger('fare')->default(0);
            $table->boolean('paid')->default(0);
            $table->date('register_date')->nullable();
            $table->tinyInteger('billing_cycle')->default(1);
            $table->string('billing_cycle_unit')->default('months');
            $table->string('phone')->nullable();
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
        Schema::dropIfExists('parking_members');
    }
}
