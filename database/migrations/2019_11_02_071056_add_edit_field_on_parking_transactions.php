<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddEditFieldOnParkingTransactions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('parking_transactions', function (Blueprint $table) {
            $table->boolean('edit')->default(0);
            $table->boolean('manual')->default(0);
            $table->string('edit_by')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('parking_transactions', function (Blueprint $table) {
            $table->dropColumn(['edit', 'manual', 'edit_by']);
        });
    }
}
