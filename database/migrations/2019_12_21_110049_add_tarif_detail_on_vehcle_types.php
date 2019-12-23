<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTarifDetailOnVehcleTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('vehicle_types', function (Blueprint $table) {
            $table->boolean('mode_tarif')->default(0);
            $table->integer('menit_pertama')->nullable();
            $table->integer('tarif_menit_pertama')->nullable();
            $table->integer('menit_selanjutnya')->nullable();
            $table->integer('tarif_menit_selanjutnya')->nullable();
            $table->integer('tarif_maksimum')->nullable();
            $table->integer('tarif_menginap')->nullable();
            $table->integer('mode_menginap')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('vehicle_types', function (Blueprint $table) {
            $table->dropColumn([
                'mode_tarif', 'menit_pertama', 'tarif_menit_pertama',
                'menit_selanjutnya', 'tarif_menit_selanjutnya',
                'tarif_maksimum', 'tarif_menginap', 'mode_menginap'
            ]);
        });
    }
}
