<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@admin.com'], 
            [
                'name' => 'admin',
                'email' => 'admin@admin.com',
                'password' => Hash::make('admin1234'), 
                'role' => "admin",
            ],
        );

        User::updateOrCreate(
            ['email' => 'user@user.com'], 
            [
                'name' => 'user',
                'email' => 'user@user.com',
                'password' => Hash::make('user1234')
            ]
        );
    }
}
