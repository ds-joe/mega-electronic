<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Dashboard\UserSettingsController;
use App\Providers\RouteServiceProvider;

# Products Controller
Route::controller(UserSettingsController::class)->group(function () {
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/user/settings/toggle/dark_mode", "toggleDarkMode")->name('user.settings.toggle.dark_mode');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/user/settings/toggle/direction", "togglePageDirection")->name('user.settings.toggle.direction');
});
