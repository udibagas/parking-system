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
            $table->boolean('is_member')->default(0);
            $table->string('jenis_kendaraan'); // MOBIL or MOTOR
            $table->bigInteger('gate_in_id');
            $table->bigInteger('gate_out_id')->nullable();
            $table->dateTime('time_in');
            $table->dateTime('time_out')->nullable();
            $table->string('nomor_barcode')->nullable();
            $table->string('nomor_kartu')->nullable();
            $table->string('note')->nullable(); //pesan error
            $table->bigInteger('user_id')->nullable();
            $table->bigInteger('member_id')->nullable();
            $table->string('operator')->nullable();
            $table->boolean('is_member')->default(0)->change();
            $table->integer('denda')->nullable()->default(0);
            $table->boolean('edit')->default(0);
            $table->boolean('manual')->default(0);
            $table->string('edit_by')->nullable();
            $table->string('plat_nomor')->nullable();
            $table->integer('tarif')->default(0);
            $table->unsignedBigInteger('shift_id')->nullable();
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
