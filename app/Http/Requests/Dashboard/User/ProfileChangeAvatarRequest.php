<?php

namespace App\Http\Requests\Dashboard\User;

use App\Traits\Images\ImagesValidation;
use Illuminate\Foundation\Http\FormRequest;

class ProfileChangeAvatarRequest extends FormRequest
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
      'avatar' => "required|nullable|" . $this->imageRules
    ];
  }
}
