<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropSomeColumnsOnParkingMember extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('parking_members', function (Blueprint $table) {
            $table->dropColumn(['plate_number', 'vehicle_type']);
            $table->bigInteger('group_member_id')->nullable();
            $table->bigInteger('fare')->default(0);
            $table->boolean('paid')->default(0);
            $table->date('register_date')->nullable();
            $table->tinyInteger('billing_cycle')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('parking_members', function (Blueprint $table) {

            $table->dropColumn([
                'group_member_id', 'paid',
                'register_date', 'billing_cycle',
                'fare'
            ]);

            $table->string('plate_number')->nullable();
            $table->string('vehicle_type')->nullable();
        });
    }
}
