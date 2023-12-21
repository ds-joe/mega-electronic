<?php

namespace App\Http\Requests\Dashboard\Customer;

use Illuminate\Foundation\Http\FormRequest;

class CreateCustomerRequest extends FormRequest
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
      'first_name' => 'required|string|max:250',
      'last_name' => "required|string|max:250",
      'phone' => "sometimes|nullable|string|max:100",
      "email" => "sometimes|nullable|email|string|max:250",
      'address' => 'sometimes|nullable|string|max:500'
    ];
  }
}
