<?php

namespace App\Http\Requests\Dashboard\Sale;

use Illuminate\Foundation\Http\FormRequest;

class CreateSaleRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      "method" => "required|in:cash,payment",
      'discount' => "required|numeric",
      'customer_id' => "required|numeric",
      'products' => "required|array",
      "product.*.id" => "required|numeric",
      "product.*.quantity" => "required|numeric"
    ];
  }
}
