<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Dashboard\ProfileController;
use App\Providers\RouteServiceProvider;

# Products Controller
Route::controller(ProfileController::class)->group(function () {
  Route::get(RouteServiceProvider::DASHBOARD_BASE . "/profile", 'show')->name('profile.show');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/profile/change/password", 'changePassword')->name('profile.change.password');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/profile/change/details", 'changeDetails')->name('profile.change.details');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/profile/change/avatar", 'changeAvatar')->name('profile.change.avatar');
});
