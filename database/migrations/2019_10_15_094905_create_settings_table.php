<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('jml_kendaraan_per_kartu')->default(0);
            $table->boolean('masa_aktif_member')->default(0)->comment('0 = 24 jam, 1 = lewat jam 00.00');
            $table->string('nama_lokasi')->nullable();
            $table->string('alamat_lokasi')->nullable();
            $table->text('info_tambahan_tiket')->nullable();
            $table->string('plat_nomor_default')->nullable();
            $table->boolean('must_checkout')->default(0);
            $table->boolean('member_auto_open')->default(0);
            $table->boolean('disable_plat_nomor')->default(0);
            $table->integer('hapus_snapshot_dalam_hari')->default(0);
            $table->smallInteger('hapus_transaksi_dalam_hari')->default(0);
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
        Schema::dropIfExists('settings');
    }
}
