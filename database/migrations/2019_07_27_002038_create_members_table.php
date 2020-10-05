<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('members', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nama');
            $table->string('nomor_kartu');
            $table->boolean('status')->default(0);
            $table->date('expiry_date')->nullable();
            $table->bigInteger('balance')->default(0);
            $table->dateTime('last_transaction')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->bigInteger('group_member_id')->nullable();
            $table->bigInteger('fare')->default(0);
            $table->boolean('paid')->default(0);
            $table->date('register_date')->nullable();
            $table->tinyInteger('billing_cycle')->default(1);
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
        Schema::dropIfExists('members');
    }
}
