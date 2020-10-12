<?php

use Illuminate\Database\Seeder;
use App\User;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(SettingSeeder::class);
        $this->call(JenisKendaraanSeeder::class);
        $this->call(KameraSeeder::class);
        $this->call(PrinterSeeder::class);
        $this->call(PosSeeder::class);
        $this->call(GateInSeeder::class);
        $this->call(GateOutSeeder::class);
        $this->call(GroupMemberSeeder::class);
    }
}
