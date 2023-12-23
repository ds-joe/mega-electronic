<?php
use App\Utils\Table;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Dashboard\SalesController;
use App\Providers\RouteServiceProvider;


Route::controller(SalesController::class)->group(function () {
  Table::createRoute(RouteServiceProvider::DASHBOARD_BASE . "/sales/table", 'getSalesTable', "sales.table");
  Table::createRoute(RouteServiceProvider::DASHBOARD_BASE . "/sale/products", 'getSalePageProducts', "sale.products");
  Route::get(RouteServiceProvider::DASHBOARD_BASE . "/sales", 'show')->name('sales.show');
  Route::get(RouteServiceProvider::DASHBOARD_BASE . "/sales/create/sale", 'sale')->name('sales.create.show');
  Route::get(RouteServiceProvider::DASHBOARD_BASE . "/sales/update/sale/{id}", 'updateSale')->name('sales.update.show');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/sales/create", "store")->name('sales.create');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/sales/update", "update")->name('sales.update');
  Route::patch(RouteServiceProvider::DASHBOARD_BASE . "/sales/delete/{id}", "delete")->name('sales.delete');
});
