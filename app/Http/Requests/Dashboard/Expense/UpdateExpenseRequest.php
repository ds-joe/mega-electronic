<?php

namespace App\Http\Requests\Dashboard\Expense;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExpenseRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true ;
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
      'amount' => "required|numeric",
      'date' => "sometimes|date",
      'description' => 'sometimes',
      'receipt' => 'sometimes|nullable|file|mimes:pdf,doc,docx,png,jpg,jpeg|max:5120'
    ];
  }
}
