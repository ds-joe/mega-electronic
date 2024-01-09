<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Expense\CreateExpenseRequest;
use App\Http\Requests\Dashboard\Expense\UpdateExpenseRequest;
use App\Models\Expense;
use App\Traits\Images\ImageName;
use App\Traits\Images\ImagesPaths;
use App\Traits\Requests;
use App\Utils\Table;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ExpensesController extends Controller
{

  use Requests, ImagesPaths, ImageName;

  private array $allowedSortColumns = ['id', 'method', 'amount', 'date'];
  private array $allowedSearchColumns = ['method', 'date'];

  /**
   * Display expenses page.
   * @return \Inertia\Response
   */
  public function show(): \Inertia\Response
  {
    $expensesTable = Table::defaultTable(Expense::class, ['owner'], $this->allowedSortColumns, $this->allowedSearchColumns);

    return $this->appendPage('Dashboard/Expenses/index', __("pages/dashboard/expenses"), [
      'expenses_table' => $expensesTable
    ]);
  } // End Method

  /**
   * Get expenses table.
   * @param Request $request
   * @return void
   */
  public function getTable(Request $request): void
  {
    $table = Table::handleResponse($request, Expense::class, ['owner'], $this->allowedSortColumns, $this->allowedSearchColumns);
    $this->setPageData([
      'expenses_table' => $table
    ]);
  } // End Method

  /**
   * Create an expense.
   * @param CreateExpenseRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function store(CreateExpenseRequest $request): \Illuminate\Http\RedirectResponse
  {
    $receipt = null;

    if (!empty($request->receipt)) {
      $file = $request->file('receipt');
      $receipt = $this->generateImageName($file->getClientOriginalName());
      Storage::disk('public')->putFileAs($this->imagesPaths['expenses'], $file);
    }

    Expense::create([
      'amount' => $request->amount,
      'date' => !empty($request->date) ? $request->date : null,
      'description' => !empty($request->description) ? $request->description : null,
      'method' => $request->method,
      'receipt' => $receipt,
      'created_by' => $request->user()->id
    ]);

    return back()->with($this->createRequestNotification(__("pages/dashboard/expenses.expense_created_successfully"), "success"));
  } // End Method

  /**
   * Update an expense.
   * @param UpdateExpenseRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function update(UpdateExpenseRequest $request): \Illuminate\Http\RedirectResponse
  {
    $expense = Expense::findOrFail($request->id);

    if (!empty($request->receipt)) {
      Storage::disk('public')->delete($this->imagesPaths['expenses'] . "/{$expense->receipt}");
      $file = $request->file('receipt');
      $expense->receipt = $this->generateImageName($file->getClientOriginalName());
      Storage::disk('public')->putFileAs($this->imagesPaths['expenses'], $file);
    }
    $expense->amount = $request->amount;
    $expense->date = !empty($request->date) ? $request->date : $expense->date;
    $expense->description = !empty($request->description) ? $request->description : $expense->description;
    $expense->method = $request->method;
    $expense->save();
    return back()->with($this->createRequestNotification(__("pages/dashboard/expenses.expense_updated_successfully"), "success"));
  } // End Method

  /**
   * Delete an expense.
   * @param int $id
   * @return \Illuminate\Http\RedirectResponse
   */
  public function delete(int $id): \Illuminate\Http\RedirectResponse
  {
    $expense = Expense::findOrFail($id);
    !empty($expense->receipt) && Storage::disk('public')->delete($this->imagesPaths['expenses'] . "/{$expense->receipt}");
    $expense->delete();
    return back()->with($this->createRequestNotification(__('pages/dashboard/expenses.expense_deleted_successfully'), 'success'));
  } // End Method


}
