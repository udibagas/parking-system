<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUhfReaderOnGate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('gate_outs', function (Blueprint $table) {
            $table->string('uhf_reader_host')->nullable();
            $table->integer('uhf_reader_port')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('gate_outs', function (Blueprint $table) {
            $table->dropColumn(['uhf_reader_host', 'uhf_reader_port']);
        });
    }
}
