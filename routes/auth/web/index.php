<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;

Route::controller(LoginController::class)->group(function () {
  Route::get("/auth/login", "show")->name("auth.login");
  Route::post("/auth/login", 'store');
  Route::post("/auth/logout", 'destroy');
});

Route::controller(RegisterController::class)->group(function () {
  Route::get("/auth/register", 'show')->name('auth.register');
  Route::post("/auth/register", "store");
});