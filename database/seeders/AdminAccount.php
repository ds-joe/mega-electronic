<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminAccount extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    User::create([
      'full_name' => "Admin",
      'email' => "admin@gmail.com",
      'password' => "123456789",
      'avatar' => null,
      'type' => "admin",
      'verified' => true
    ]);
  }
}