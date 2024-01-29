<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Dashboard\HomeController;
use App\Providers\RouteServiceProvider;



Route::middleware('auth')->group(function () {

  # Home Controller
  Route::controller(HomeController::class)->group(function () {
    Route::get(RouteServiceProvider::DASHBOARD_BASE, 'show');
  });

  require(__DIR__ . "/profile.php");
  require(__DIR__ . "/userSettings.php");

  # User verified controllers
  Route::middleware('user.verified')->group(function () {
    require(__DIR__ . "/users.php");
    require(__DIR__ . "/products.php");
    require(__DIR__ . "/customers.php");
    require(__DIR__ . "/sales.php");
    require(__DIR__ . "/expenses.php");
  });
});
