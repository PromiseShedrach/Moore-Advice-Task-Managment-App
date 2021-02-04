<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //create admin
        User::firstOrCreate(['name' => 'Administrator', 'email' => 'admin@gmail.com', 'role' => 'Admin', 'password' => '$2y$10$/bcJvAPtPPVNPZTz6noOKuYdEgWgwdjY4.DS7nB0c8q53zXt7ZppS']);
    }
}
