<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Dashboard\UsersController;
use App\Providers\RouteServiceProvider;

# Products Controller
Route::controller(UsersController::class)->group(function () {
  Route::get(RouteServiceProvider::DASHBOARD_BASE . "/users", 'show')->name('users.show');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/users/create", 'store')->name('users.create');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/users/update", 'update')->name('users.update');
  Route::patch(RouteServiceProvider::DASHBOARD_BASE . "/users/delete/{id}", 'delete')->name('users.delete');
});
