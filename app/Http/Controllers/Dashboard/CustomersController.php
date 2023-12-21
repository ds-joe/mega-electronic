<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Customer\CreateCustomerRequest;
use App\Http\Requests\Dashboard\Customer\UpdateCustomerRequest;
use App\Models\Customer;
use Inertia\Inertia;
use App\Traits\Requests;


class CustomersController extends Controller
{
  use Requests;

  /**
   * Display customers page.
   * @return \Inertia\Response
   */
  public function show(): \Inertia\Response
  {
    # Customers data
    $customers = Customer::with('owner')->get();
    return $this->appendPage('Dashboard/Customers/index', __("pages/dashboard/customers"), [
      'customers' => $customers
    ]);
  } // End Method

  /**
   * Create customer.
   * @param CreateCustomerRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function store(CreateCustomerRequest $request): \Illuminate\Http\RedirectResponse
  {
    Customer::create([
      'first_name' => $request->first_name,
      'last_name' => $request->last_name,
      'email' => $request->email ? $request->email : null,
      'phone' => $request->phone ? $request->phone : null,
      'address' => $request->address ? $request->address : null,
      'created_by' => $request->user()->id,
    ]);
    return back()->with(
      $this->createRequestNotification(
        __("pages/dashboard/customers.customer_created_successfully"),
        'success'
      )
    );
  } // End Method

  /**
   * Update customer.
   * @param UpdateCustomerRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function update(UpdateCustomerRequest $request): \Illuminate\Http\RedirectResponse
  {
    $customer = Customer::findOrFail($request->id);
    $customer->first_name = $request->first_name;
    $customer->last_name = $request->last_name;
    $customer->email = $request->email ? $request->email : null;
    $customer->phone = $request->phone ? $request->phone : null;
    $customer->address = $request->address ? $request->address : null;
    $customer->save();
    return back()->with($this->createRequestNotification(__('pages/dashboard/customers.customer_updated_successfully'), 'success'));
  } // End Method

  /**
   * Delete customer.
   * @param int $id
   * @return \Illuminate\Http\RedirectResponse
   */
  public function delete(int $id): \Illuminate\Http\RedirectResponse
  {
    $customer = Customer::findOrFail($id);
    $customer->delete();
    return back()->with($this->createRequestNotification(__('pages/dashboard/customers.customer_deleted_successfully'), 'success'));
  } // End Method


}
