<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParkingTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parking_transactions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->boolean('is_member');
            $table->string('vehicle_type'); // MOBIL or MOTOR
            $table->dateTime('time_in');
            $table->string('barcode_number')->nullable();
            $table->string('card_number')->nullable();
            $table->bigInteger('user_id')->nullable();
            $table->bigInteger('parking_member_id')->nullable();
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
        Schema::dropIfExists('parking_transactions');
    }
}
