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
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Carbon\Carbon;


class ProductsController extends Controller
{
  use ImageName, Requests, Dates, ImagesPaths;

  /**
   * display products page.
   * @param Request $request
   * @return \Inertia\Response
   */
  public function show(Request $request): \Inertia\Response
  {

    # State cards data
    $categoriesStateCard = Category::count();
    $brandsStateCard = Brand::count();
    $productsStateCard = Product::count();

    # Categories Data
    $categoriesTableData = Category::with('createdOwner')->get();
    $categoriesWeeklyChartData = $this->getRecordsCountsBetweenDates(Category::class, Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek())
      ->get()
      ->pluck('count');

    # Brands Data
    $brandsTableData = Brand::with('createdOwner')->get();
    $brandsWeeklyChartData = $this->getRecordsCountsBetweenDates(Brand::class, Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek())
      ->get()
      ->pluck('count');

    # Products Data
    $productsTableData = Product::with('category', 'brand', 'createdOwner')->get();

    return $this->appendPage(
      "Dashboard/Products/index",
      __("pages/dashboard/products"),
      [
        "state_cards" => [
          "categories" => $categoriesStateCard,
          "brands" => $brandsStateCard,
          'products' => $productsStateCard
        ],
        "categories" => [
          "table" => $categoriesTableData,
          'chart' => [
            'labels' => $this->getCurrentWeekDays(),
            'data' => $categoriesWeeklyChartData
          ]
        ],
        'brands' => [
          'table' => $brandsTableData,
          'chart' => [
            'labels' => $this->getCurrentWeekDays(),
            'data' => $brandsWeeklyChartData
          ]
        ],
        'products' => [
          'table' => $productsTableData,
          'chart' => $this->productsChartData()
        ]
      ]
    );
  } // End Method

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
    $todayData = $this->getRecordsCountsBetweenDates(Product::class, Carbon::now()->startOfDay(), Carbon::now()->endOfDay())
      ->get()
      ->pluck('count');
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
      'today' => [
        'data' => $this->fillArray([...$todayData], 24, 0),
        'labels' => $this->getCurrentDayHours()
      ],
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
      ]
    ];
  } // End Method

}
