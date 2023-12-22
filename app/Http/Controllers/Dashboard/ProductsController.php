<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Brand\CreateBrandRequest;
use App\Http\Requests\Dashboard\Brand\UpdateBrandRequest;
use App\Http\Requests\Dashboard\Category\CreateCategoryRequest;
use App\Http\Requests\Dashboard\Category\UpdateCategoryRequest;
use App\Http\Requests\Dashboard\Product\CreateProductRequest;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductHasColor;
use App\Traits\Images\ImageName;
use App\Traits\Images\ImagesPaths;
use App\Traits\Requests;
use App\Traits\Utils\Dates;
use App\Utils\Table;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Carbon\Carbon;


class ProductsController extends Controller
{
  use ImageName, Requests, Dates, ImagesPaths;

  private array $productsAllowedSortColumns = ["id", 'sku', 'name', 'price', 'rate', 'created_at'];
  private array $productsAllowedSearchColumns = ['sku', 'name', 'price', 'rate', 'created_at'];
  private array $categoriesAllowedSortColumns = ['id', 'name', 'created_at'];
  private array $categoriesAllowedSearchColumns = ['name'];
  private array $brandsAllowedSortColumns = ['id', 'name', 'created_at'];
  private array $brandsAllowedSearchColumns = ['name'];

  /**
   * display products page.
   * @param Request $request
   * @return \Inertia\Response
   */
  public function show(Request $request): \Inertia\Response
  {

    $categoriesWeeklyChartData = $this->getRecordsCountsBetweenDates(Category::class, Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek())
      ->get()
      ->pluck('count');
    $brandsWeeklyChartData = $this->getRecordsCountsBetweenDates(Brand::class, Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek())
      ->get()
      ->pluck('count');


    return $this->appendPage(
      "Dashboard/Products/index",
      __("pages/dashboard/products"),
      [
        'products_chart' => $this->productsChartData(),
        'products_table' => Table::defaultTable(Product::class, ['owner', 'brand', 'category'], $this->productsAllowedSortColumns, $this->productsAllowedSearchColumns),

        'categories_table' => Table::defaultTable(Category::class, ['owner'], $this->categoriesAllowedSortColumns, $this->categoriesAllowedSearchColumns),
        'categories_chart' => [
          'labels' => $this->getCurrentWeekDays(),
          'data' => $categoriesWeeklyChartData
        ],

        'brands_table' => Table::defaultTable(Brand::class, ['owner'], $this->brandsAllowedSortColumns, $this->brandsAllowedSearchColumns),
        'brands_chart' => [
          'labels' => $this->getCurrentWeekDays(),
          'data' => $brandsWeeklyChartData
        ],

        "status_cards" => [
          "categories" => Category::count(),
          "brands" => Brand::count(),
          'products' => Product::count()
        ],
        'brands' => Brand::select('name', 'id')->get(),
        'categories' => Brand::select('name', 'id')->get(),
      ]
    );
  } // End Method


  /**
   * Get products table.
   * @param Request $request
   * @return void
   */
  public function getProductsTable(Request $request): void
  {
    $table = Table::handleResponse($request, Product::class, ['owner', 'brand', 'category'], $this->productsAllowedSortColumns, $this->productsAllowedSearchColumns);
    $this->setPageData([
      'products_table' => $table
    ]);
  }

  /**
   * Get brands table.
   * @param Request $request
   * @return void
   */
  public function getBrandsTable(Request $request): void
  {
    $table = Table::handleResponse($request, Brand::class, ['owner'], $this->brandsAllowedSortColumns, $this->brandsAllowedSearchColumns);
    $this->setPageData([
      'brands_table' => $table
    ]);
  }

  /**
   * Get categories table.
   * @param Request $request
   * @return void
   */
  public function getCategoriesTable(Request $request): void
  {
    $table = Table::handleResponse($request, Category::class, ['owner'], $this->categoriesAllowedSortColumns, $this->categoriesAllowedSearchColumns);
    $this->setPageData([
      'categories_table' => $table
    ]);
  }

  /**
   * create brand.
   * @param CreateBrandRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function createBrand(CreateBrandRequest $request): \Illuminate\Http\RedirectResponse
  {
    $imageName = null;

    # Create image if found.
    if ($request->hasFile('image')) {
      $file = $request->file('image');
      $imageName = $this->generateImageName($file->getClientOriginalName());
      Storage::disk('public')->putFileAs($this->imagesPaths['brands'], $request->file('image'), $imageName);
    }

    # Create Brand
    Brand::create([
      "name" => $request->name,
      "image" => $imageName,
      'description' => !empty($request->description) ? $request->description : null,
      'created_by' => $request->user()->id
    ]);

    return back()->with($this->createRequestNotification(__('pages/dashboard/products.brand_created_successfully'), 'success'));
  } // End Method

  /**
   * Create Category
   * @param CreateCategoryRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function createCategory(CreateCategoryRequest $request): \Illuminate\Http\RedirectResponse
  {
    Category::create([
      "name" => $request->name,
      "created_by" => $request->user()->id
    ]);
    return back()->with($this->createRequestNotification(__('pages/dashboard/products.category_created_successfully'), 'success'));
  } // End Method

  /**
   * Create Product
   * @param CreateProductRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function createProduct(CreateProductRequest $request): \Illuminate\Http\RedirectResponse
  {
    # Errors
    if (empty(Category::find($request->category)))
      return back()->withErrors([
        "category" => __("pages/dashboard/products.category_not_found")
      ]);
    if (empty(Brand::find($request->brand)))
      return back()->withErrors([
        "brand" => __("pages/dashboard/products.brand_not_found")
      ]);

    # Check if there images
    $imageName = null;

    # Create image if found.
    if ($request->hasFile('image')) {
      $file = $request->file('image');
      $imageName = $this->generateImageName($file->getClientOriginalName());
      Storage::disk('public')->putFileAs("products", $request->file('image'), $imageName);
    }

    # Create product
    $product = Product::create([
      'sku' => \Str::uuid(),
      'name' => $request->name,
      'price' => $request->price,
      'rate' => $request->rate,
      'image' => $imageName,
      'description' => $request->description,
      'brand_id' => $request->brand,
      'category_id' => $request->category,
      'created_by' => $request->user()->id
    ]);

    # Create our colors
    if (!empty($request->colors)) {
      foreach ($request->colors as $color) {
        if (!ProductHasColor::where('product_id', $product->id)->where('color', $color)->exists()) {
          ProductHasColor::create(['color' => $color, 'product_id' => $product->id]);
        }
      }
    }

    return back()->with($this->createRequestNotification(__('pages/dashboard/products.product_created_successfully'), 'success'));
  } // End Method

  /** Update category
   * @param UpdateCategoryRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function updateCategory(UpdateCategoryRequest $request): \Illuminate\Http\RedirectResponse
  {
    $category = Category::findOrFail($request->id);
    $category->name = $request->name;
    $category->save();
    return back()->with($this->createRequestNotification(__('pages/dashboard/products.category_updated_successfully'), 'success'));

  } // End Method

  /** Update brand
   * @param UpdateBrandRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function updateBrand(UpdateBrandRequest $request): \Illuminate\Http\RedirectResponse
  {
    $brand = Brand::findOrFail($request->id);
    $imageName = null;

    # Update image if found.
    if ($request->hasFile('image')) {
      $brand->image !== null && Storage::disk('public')->delete("brands/" . $brand->image);
      $file = $request->file('image');
      $imageName = $this->generateImageName($file->getClientOriginalName());
      Storage::disk('public')->putFileAs($this->imagesPaths['brands'], $request->file('image'), $imageName);
    }

    # Update Brand
    $brand->name = $request->name;
    $brand->image = $imageName !== null ? $imageName : $brand->image;
    $brand->description = !empty($request->description) ? $request->description : $brand->description;
    $brand->save();
    return back()->with($this->createRequestNotification(__('pages/dashboard/products.brand_updated_successfully'), 'success'));
  } // End Method

  /**
   * Delete Category
   * @param int $id
   * @return  \Illuminate\Http\RedirectResponse
   */
  public function deleteCategory(int $id): \Illuminate\Http\RedirectResponse
  {
    Category::findOrFail($id)->delete();
    return back()->with($this->createRequestNotification(__('pages/dashboard/products.category_deleted_successfully'), 'success'));
  } // End Method

  /**
   * Delete Brand
   * @param int $id
   * @return \Illuminate\Http\RedirectResponse
   */
  public function deleteBrand(int $id): \Illuminate\Http\RedirectResponse
  {
    $brand = Brand::findOrFail($id);
    $brand->image !== null && Storage::disk('public')->delete("brands/" . $brand->image);
    $brand->delete();
    return back()->with($this->createRequestNotification(__('pages/dashboard/products.brand_deleted_successfully'), 'success'));
  } // End Method

  /**
   * Products Yearly Chart Data
   * NOTE This method using only inside this controller not for requests.
   * @return array
   */
  private function productsChartData(): array
  {
    $weeklyData = $this->getRecordsCountsBetweenDates(Product::class, Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek())
      ->get()
      ->pluck('count');
    $monthlyData = $this->getRecordsCountsBetweenDates(Product::class, Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth())
      ->get()
      ->pluck('count');
    $yearlyData = $this->getRecordsCountsBetweenDates(Product::class, Carbon::now()->startOfYear(), Carbon::now()->endOfYear())
      ->get()
      ->pluck('count');
    return [
      'weekly' => [
        'data' => $this->fillArray([...$weeklyData], 7, 0),
        'labels' => $this->getCurrentWeekDays()
      ],
      'monthly' => [
        'data' => $this->fillArray([...$monthlyData], 7, 0),
        'labels' => $this->getCurrentMonthWeeks()
      ],
      'yearly' => [
        'data' => $this->fillArray([...$yearlyData], 12, 0),
        'labels' => $this->getCurrentYearMonths()
      ],
    ];
  } // End Method

}
