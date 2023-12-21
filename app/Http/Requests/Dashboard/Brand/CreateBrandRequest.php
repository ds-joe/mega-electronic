<?php

namespace App\Http\Requests\Dashboard\Brand;

use App\Traits\Images\ImagesValidation;
use Illuminate\Foundation\Http\FormRequest;

class CreateBrandRequest extends FormRequest
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
      'name' => 'required|string|max:250|unique:brands,name',
      'image' => "sometimes|nullable|" . $this->imageRules,
      "description" => "sometimes|nullable"
    ];
  }
}
