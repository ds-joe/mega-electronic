<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Dashboard\ProductsController;
use App\Providers\RouteServiceProvider;

# Products Controller
Route::controller(ProductsController::class)->group(function () {
  Route::get(RouteServiceProvider::DASHBOARD_BASE . "/products", 'show')->name('products.show');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/brands/create", "createBrand")->name('brands.create');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/brands/update", "updateBrand")->name('brands.update');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/categories/create", "createCategory")->name('categories.create');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/categories/update", "updateCategory")->name('categories.update');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/products/create", "createProduct")->name('products.create');
  Route::patch(RouteServiceProvider::DASHBOARD_BASE . "/category/delete/{id}", "deleteCategory")->name('category.delete');
  Route::patch(RouteServiceProvider::DASHBOARD_BASE . "/brand/delete/{id}", "deleteBrand")->name('brand.delete');
});
