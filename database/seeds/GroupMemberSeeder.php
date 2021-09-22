<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GroupMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = ['nama' => 'PETUGAS', 'keterangan' => 'Petugas parkir'];
        DB::table('group_members')->truncate();
        DB::table('group_members')->insert($data);
    }
}
