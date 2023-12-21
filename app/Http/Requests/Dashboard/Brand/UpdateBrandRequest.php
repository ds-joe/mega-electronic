<?php

namespace App\Http\Requests\Dashboard\Brand;

use App\Traits\Images\ImagesValidation;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBrandRequest extends FormRequest
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
      'id' => 'required|numeric',
      'name' => "required|string|max:250|unique:brands,name,{$id}",
      'image' => "sometimes|nullable|" . $this->imageRules,
      "description" => "sometimes|nullable"
    ];
  }
}
