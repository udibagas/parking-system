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
            $table->bigInteger('member_id');
            $table->bigInteger('user_id');
            $table->date('dari_tanggal');
            $table->date('sampai_tanggal');
            $table->bigInteger('jumlah')->default(0);
            $table->integer('siklus_pembayaran')->default(0);
            $table->string('siklus_pembayaran_unit')->default('months');
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
