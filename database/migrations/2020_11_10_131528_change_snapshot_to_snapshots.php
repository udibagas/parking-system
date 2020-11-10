<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeSnapshotToSnapshots extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('manual_open_logs', function (Blueprint $table) {
            $table->dropColumn('snapshot');
            $table->json('snapshots')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('manual_open_logs', function (Blueprint $table) {
            $table->dropColumn('snapshots');
            $table->json('snapshot')->nullable();
        });
    }
}
