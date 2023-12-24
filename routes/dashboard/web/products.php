<?php
use App\Utils\Table;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Dashboard\ProductsController;
use App\Providers\RouteServiceProvider;

# Products Controller
Route::controller(ProductsController::class)->group(function () {
  Table::createRoute(RouteServiceProvider::DASHBOARD_BASE . "/products/table", 'getProductsTable', 'products.table');
  Table::createRoute(RouteServiceProvider::DASHBOARD_BASE . "/brands/table", 'getBrandsTable', 'brands.table');
  Table::createRoute(RouteServiceProvider::DASHBOARD_BASE . "/categories/table", 'getCategoriesTable', 'categories.table');
  Route::get(RouteServiceProvider::DASHBOARD_BASE . "/products", 'show')->name('products.show');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/brands/create", "createBrand")->name('brands.create');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/brands/update", "updateBrand")->name('brands.update');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/categories/create", "createCategory")->name('categories.create');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/categories/update", "updateCategory")->name('categories.update');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/products/create", "createProduct")->name('products.create');
  Route::post(RouteServiceProvider::DASHBOARD_BASE . "/products/update", "updateProduct")->name('products.update');
  Route::patch(RouteServiceProvider::DASHBOARD_BASE . "/category/delete/{id}", "deleteCategory")->name('category.delete');
  Route::patch(RouteServiceProvider::DASHBOARD_BASE . "/brand/delete/{id}", "deleteBrand")->name('brand.delete');
  Route::patch(RouteServiceProvider::DASHBOARD_BASE . "/product/delete/{id}", "deleteProduct")->name('product.delete');

});
