<?php
use App\Utils\Table;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Dashboard\ExpensesController;
use App\Providers\RouteServiceProvider;


Route::controller(ExpensesController::class)->group(function () {
  Table::createRoute(RouteServiceProvider::DASHBOARD_BASE . "/expenses/table", 'getTable', "expenses.table");
  Route::get(RouteServiceProvider::DASHBOARD_BASE . "/expenses", 'show')->name('expenses.show');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/expenses/create", "store")->name('expenses.create');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/expenses/update", "update")->name('expenses.update');
  Route::patch(RouteServiceProvider::DASHBOARD_BASE . "/expenses/delete/{id}", "delete")->name('expenses.delete');
});
