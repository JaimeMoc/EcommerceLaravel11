<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin Principal',
            'email' => 'admin@test.com',
            'password' => Hash::make('cl13nt3004@'),
            'role' => 'admin'
        ]);

        User::create([
            'name' => 'Cliente Uno',
            'email' => 'cliente@test.com',
            'password' => Hash::make('cl13nt3004@'),
            'role' => 'cliente'
        ]);
    }
}