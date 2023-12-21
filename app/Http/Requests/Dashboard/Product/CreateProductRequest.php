<?php

namespace App\Http\Requests\Dashboard\Product;

use App\Traits\Images\ImagesValidation;
use Illuminate\Foundation\Http\FormRequest;

class CreateProductRequest extends FormRequest
{

  use ImagesValidation;

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
      'name' => "required|string|max:250|unique:products,name",
      'price' => "required|numeric",
      'rate' => "required|numeric|max:5",
      'image' => "sometimes|nullable|" . $this->imageRules,
      'description' => "sometimes|nullable",
      'brand' => "required|numeric",
      'category' => "required|numeric",
      'colors' => "required|array"
    ];
  }
}
