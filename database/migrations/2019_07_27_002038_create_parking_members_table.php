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
            $table->string('vehicle_type'); // mobil atau motor
            $table->boolean('is_active')->default(0);
            $table->date('expiry_date')->nullable();
            $table->bigInteger('balance')->default(0);
            $table->dateTime('last_transaction')->nullable();
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
