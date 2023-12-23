<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Sale\CreateSaleRequest;
use App\Http\Requests\Dashboard\Sale\UpdateSaleRequest;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleHasProduct;
use App\Traits\Requests;
use App\Traits\Utils\Dates;
use App\Utils\Table;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SalesController extends Controller
{

  use Requests, Dates;
  private array $allowedSortColumns = ['id', 'method', 'amount', 'discount', 'created_at'];
  private array $allowedSearchColumns = ['method'];

  /**
   * Display sales page.
   * @return \Inertia\Response
   */
  public function show(): \Inertia\Response
  {

    $sales = Table::defaultTable(Sale::class, ['owner', 'customer'], $this->allowedSortColumns, $this->allowedSearchColumns);

    // Payment
    $paymentTotalAmount = Sale::where('method', 'payment')->sum('amount');
    $paymentTotalDiscount = Sale::where('method', 'payment')->sum('discount');
    $paymentTotalSales = Sale::where('method', 'payment')->count();

    // Cash Sales
    $cashTotalAmount = Sale::where('method', 'cash')->sum('amount');
    $cashTotalDiscount = Sale::where('method', 'cash')->sum('discount');
    $cashTotalSales = Sale::where('method', 'cash')->count();

    return $this->appendPage("Dashboard/Sales/index", __('pages/dashboard/sales'), [
      'sales_table' => $sales,
      'sales_status_cards' => [
        'payment' => [
          'total_amount' => $paymentTotalAmount,
          'total_discount' => $paymentTotalDiscount,
          'total_sales' => $paymentTotalSales,
        ],
        'cash' => [
          'total_amount' => $cashTotalAmount,
          'total_discount' => $cashTotalDiscount,
          'total_sales' => $cashTotalSales,
        ]
      ],
      'sales_chart' => $this->getChartData(),
    ]);

  } // End Method

  /**
   * Display sale page.
   * @return \Inertia\Response
   */
  public function sale(): \Inertia\Response
  {
    $products = Table::defaultTable(Product::class, [], ['id'], ['name', 'sku', 'price', 'rate', 'description', 'created_at']);
    $customers = Customer::all();
    return $this->appendPage("Dashboard/Sale/index", __('pages/dashboard/sales'), [
      'products' => $products,
      'customers' => $customers,
    ]);

  }

  /**
   * Display update sale page.
   * @param int $id
   * @return \Inertia\Response
   */
  public function updateSale(int $id): \Inertia\Response
  {
    $sale = Sale::with('products', 'customer', 'owner')->findOrFail($id);
    $products = Table::defaultTable(Product::class, []);
    $customers = Customer::all();
    return $this->appendPage('Dashboard/UpdateSale/index', __('pages/dashboard/sales'), [
      'sale' => $sale,
      'customers' => $customers,
      'products' => $products
    ]);
  }

  /**
   * Get sales table data.
   * @param Request $request
   * @return void
   */
  public function getSalesTable(Request $request): void
  {
    $table = Table::handleResponse($request, Sale::class, ['customer', 'owner'], $this->allowedSortColumns, $this->allowedSearchColumns);
    $this->setPageData([
      'sales_table' => $table
    ]);
  } // End Method

  /**
   * Get sale page products.
   * @param Request $request
   * @return void
   */
  public function getSalePageProducts(Request $request): void
  {
    $table = Table::handleResponse($request, Product::class, [], ['name'], ['name', 'sku', 'price', 'rate', 'description', 'created_at']);
    $this->setPageData([
      'products' => $table
    ]);
  } // End Method

  /**
   * Create sale.
   * @param CreateSaleRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function store(CreateSaleRequest $request): \Illuminate\Http\RedirectResponse
  {
    $products = (array) $request->products;
    $productsAmount = 0;

    # Validate customer.
    if (!$this->validateRequestCustomer($request->customer_id))
      return back()->with($this->createRequestNotification(__("pages/dashboard/sales.invalid_selected_customer"), 'danger'));

    # Validate products.
    if (!$this->validateRequestProducts($products))
      return back()->with($this->createRequestNotification(__("pages/dashboard/sales.invalid_selected_products"), 'danger'));

    # Get products total amount.
    $productsAmount = $this->getRequestProductsTotalAmount($products);

    $sale = Sale::create([
      'method' => $request->method,
      'amount' => $productsAmount,
      'discount' => $request->discount,
      'created_by' => $request->user()->id,
      'customer_id' => Customer::find($request->customer_id)->id
    ]);
    $this->createSaleProducts($sale->id, $products);

    return back()->with($this->createRequestNotification(__("pages/dashboard/sales.sale_created_successfully"), 'success'));
  } // End Method

  /**
   * Update sale.
   * @param UpdateSaleRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function update(UpdateSaleRequest $request): \Illuminate\Http\RedirectResponse
  {
    $sale = Sale::findOrFail($request->id);
    $products = (array) $request->products;
    $productsAmount = 0;

    # Validate products.
    if (!$this->validateRequestProducts($products))
      return back()->with($this->createRequestNotification(__("pages/dashboard/sales.invalid_selected_products"), 'danger'));

    # Validate customer.
    if (!$this->validateRequestCustomer($request->customer_id))
      return back()->with($this->createRequestNotification(__("pages/dashboard/sales.invalid_selected_customer"), 'danger'));

    # Get products total amount.
    $productsAmount = $this->getRequestProductsTotalAmount($products);

    # update sale details.
    $sale->method = $request->method;
    $sale->amount = $productsAmount;
    $sale->discount = $request->discount;
    $sale->customer_id = $request->customer_id;
    $sale->save();

    # Remove unregistered products.
    SaleHasProduct::where('sale_id', $sale->id)
      ->whereNotIn('product_id', array_column($products, 'id'))->delete();

    $this->createSaleProducts($sale->id, $products);

    # Update products quantity.
    foreach ($products as $product) {
      SaleHasProduct::where('sale_id', $sale->id)
        ->where('product_id', $product['id'])
        ->update(['quantity' => $product['quantity']]);
    }

    return back()->with($this->createRequestNotification(__("pages/dashboard/sales.sale_updated_successfully"), 'success'));
  } // End Method

  /**
   * Delete sale.
   * @param int $id
   * @return \Illuminate\Http\RedirectResponse
   */
  public function delete(int $id): \Illuminate\Http\RedirectResponse
  {
    Sale::findOrFail($id)->delete();
    return back()->with($this->createRequestNotification(__("pages/dashboard/sales.sale_removed_successfully"), 'success'));
  } // End Method

  /**
   * ********************************************************************
   * Private Methods
   * ********************************************************************
   */

  /**
   * Validate request products.
   * NOTE: this method using only inside this controller.
   * @param array $products
   * @return bool
   */
  private function validateRequestProducts(array $products): bool
  {
    $result = true;
    for ($i = 0; $i < count($products); $i++) {
      if (!Product::find($products[$i]['id'])->exists()) {
        $result = false;
      }
    }
    return $result;
  } // End Method

  /**
   * Validate request customer.
   * NOTE: this method using only inside this controller.
   * @param int $customer_id
   * @return bool
   */
  private function validateRequestCustomer(int $customer_id): bool
  {
    return Customer::find($customer_id) !== null;
  } // End Method

  /**
   * Get request products total amount.
   * NOTE: this method using only inside this controller.
   * @param array $products
   * @return float
   */
  private function getRequestProductsTotalAmount(array $products): float
  {
    $productsTotalAmount = 0;
    foreach ($products as $product) {
      $productsTotalAmount += (float) Product::find($product['id'])->price * $product['quantity'];
    }
    return $productsTotalAmount;
  } // End Method

  /**
   * Create sale product.
   * NOTE: this method using only inside this controller.
   * @param int $sale_id
   * @param array $products
   * @return void
   */
  private function createSaleProducts(int $sale_id, array $products): void
  {
    foreach ($products as $product) {
      if (
        !SaleHasProduct::where('sale_id', $sale_id)
          ->where('product_id', $product['id'])
          ->exists()
      ) {
        SaleHasProduct::create([
          'product_id' => $product['id'],
          'quantity' => $product['quantity'],
          'sale_id' => $sale_id
        ]);
      }
    }
  } // End Method

  /**
   * Get chart data.
   * NOTE: This method using only inside this controller.
   * @return array
   */
  private function getChartData(): array
  {
    // Cash Chart
    $cashWeeklyData = $this->getRecordsCountsBetweenDates(Sale::class, Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek(), "SUM(amount) as amount")
      ->where("method", 'cash')
      ->get()
      ->pluck('amount');
    $cashMonthlyData = $this->getRecordsCountsBetweenDates(Sale::class, Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth(), "SUM(amount) as amount")
      ->where("method", 'cash')
      ->pluck('amount');
    $cashYearlyData = $this->getRecordsCountsBetweenDates(Sale::class, Carbon::now()->startOfYear(), Carbon::now()->endOfYear(), "SUM(amount) as amount")
      ->where("method", 'cash')
      ->get()
      ->pluck('amount');

    // Payment Chart
    $paymentWeeklyData = $this->getRecordsCountsBetweenDates(Sale::class, Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek(), "SUM(amount) as amount")
      ->where("method", 'payment')
      ->get()
      ->pluck('amount');
    $paymentMonthlyData = $this->getRecordsCountsBetweenDates(Sale::class, Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth(), "SUM(amount) as amount")
      ->where("method", 'payment')
      ->pluck('amount');
    $paymentYearlyData = $this->getRecordsCountsBetweenDates(Sale::class, Carbon::now()->startOfYear(), Carbon::now()->endOfYear(), "SUM(amount) as amount")
      ->where("method", 'payment')
      ->get()
      ->pluck('amount');

    return [
      'cash' => [
        'weekly' => [
          'data' => $this->fillArray([...$cashWeeklyData], 7, 0),
        ],
        'monthly' => [
          'data' => $this->fillArray([...$cashMonthlyData], 7, 0),
        ],
        'yearly' => [
          'data' => $this->fillArray([...$cashYearlyData], 12, 0),
        ],
      ],
      'payment' => [
        'weekly' => [
          'data' => $this->fillArray([...$paymentWeeklyData], 7, 0),
          'labels' => $this->getCurrentWeekDays()
        ],
        'monthly' => [
          'data' => $this->fillArray([...$paymentMonthlyData], 7, 0),
          'labels' => $this->getCurrentMonthWeeks()
        ],
        'yearly' => [
          'data' => $this->fillArray([...$paymentYearlyData], 12, 0),
          'labels' => $this->getCurrentYearMonths()
        ],
      ]

    ];
  }

}
