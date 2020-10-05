<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJenisKendaraansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jenis_kendaraans', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nama');
            $table->string('shortcut_key', 1);
            $table->integer('tarif_flat')->default(0);
            $table->integer('denda_tiket_hilang')->default(0);
            $table->boolean('mode_tarif')->default(0);
            $table->integer('menit_pertama')->nullable();
            $table->integer('tarif_menit_pertama')->nullable();
            $table->integer('menit_selanjutnya')->nullable();
            $table->integer('tarif_menit_selanjutnya')->nullable();
            $table->integer('tarif_maksimum')->nullable();
            $table->integer('tarif_menginap')->nullable();
            $table->integer('mode_menginap')->default(0);
            $table->boolean('is_default')->default(0);
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
        Schema::dropIfExists('jenis_kendaraans');
    }
}
