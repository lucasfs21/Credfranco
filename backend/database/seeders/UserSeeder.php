<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            ['name' => 'Alice Johnson', 'email' => 'alice.johnson@example.com', 'role_id' => 1],
            ['name' => 'Bob Smith', 'email' => 'bob.smith@example.com', 'role_id' => 2],
            ['name' => 'Charlie Brown', 'email' => 'charlie.brown@example.com', 'role_id' => 1],
            ['name' => 'David White', 'email' => 'david.white@example.com', 'role_id' => 2],
            ['name' => 'Eve Davis', 'email' => 'eve.davis@example.com', 'role_id' => 1],
            ['name' => 'Fay Moore', 'email' => 'fay.moore@example.com', 'role_id' => 2],
            ['name' => 'George Wilson', 'email' => 'george.wilson@example.com', 'role_id' => 1],
            ['name' => 'Hannah Clark', 'email' => 'hannah.clark@example.com', 'role_id' => 2],
            ['name' => 'Ivy Lewis', 'email' => 'ivy.lewis@example.com', 'role_id' => 1],
            ['name' => 'Jack Martinez', 'email' => 'jack.martinez@example.com', 'role_id' => 2],
        ];

        foreach ($users as $user) {
            DB::table('users')->insert([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => Hash::make('test'),
                'role_id' => $user['role_id'],
            ]);
        }
    }
}
