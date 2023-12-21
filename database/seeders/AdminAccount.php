<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminAccount extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $user = User::create([
      'full_name' => "Admin",
      'email' => "admin@gmail.com",
      'password' => "123456789",
      'avatar' => null,
      'type' => "admin",
      'verified' => true
    ]);
    UserSetting::create([
      'user_id' => $user->id
    ]);
  }
}
