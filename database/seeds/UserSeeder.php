<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->truncate();

        User::create([
            'name' => 'Admin',
            'email' => 'admin@mitrateknik.co.id',
            'phone' => '0888',
            'password' => 'admin123',
            'role' => 1,
            'status' => 1
        ]);
    }
}
