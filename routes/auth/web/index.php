<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;

Route::middleware('guest')->controller(LoginController::class)->group(function () {
  Route::get("/auth/login", "show")->name("auth.login");
  Route::post("/auth/login", 'store');
});

Route::middleware('auth')->controller(LoginController::class)->group(function () {
  Route::post("/auth/logout", 'destroy')->name('auth.logout');
});

Route::middleware('guest')->controller(RegisterController::class)->group(function () {
  Route::get("/auth/register", 'show')->name('auth.register');
  Route::post("/auth/register", "store");
});
