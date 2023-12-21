<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Dashboard\CustomersController;
use App\Providers\RouteServiceProvider;

# Products Controller
Route::controller(CustomersController::class)->group(function () {
  Route::get(RouteServiceProvider::DASHBOARD_BASE . "/customers", 'show')->name('customers.show');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/customers/create", "store")->name('customers.create');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/customers/update", "update")->name('customers.update');
  Route::patch(RouteServiceProvider::DASHBOARD_BASE . "/customer/delete/{id}", "delete")->name('customer.delete');
});
