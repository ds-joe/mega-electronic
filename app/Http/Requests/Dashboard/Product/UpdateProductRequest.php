<?php

namespace App\Http\Requests\Dashboard\Product;

use App\Traits\Images\ImagesValidation;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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

    $id = $this->id;
    return [
      'id' => "required|numeric",
      'name' => "required|string|max:250|unique:products,name,{$id}",
      'price' => "required|numeric",
      'rate' => "required|numeric|max:5",
      'image' => "sometimes|nullable|" . $this->imageRules,
      'description' => "sometimes|nullable",
      'brand_id' => "required|numeric",
      'category_id' => "required|numeric"
    ];
  }
}
