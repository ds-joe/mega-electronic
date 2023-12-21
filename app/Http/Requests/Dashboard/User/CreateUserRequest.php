<?php

namespace App\Http\Requests\Dashboard\User;

use App\Traits\Images\ImagesValidation;
use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
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
      'full_name' => "required|string|max:350",
      'email' => "required|string|email|max:250|unique:users,email",
      'avatar' => "sometimes|nullable|" . $this->imageRules,
      "password" => "required|confirmed|min:6",
      'password_confirmation' => "required",
      'type' => "required|in:supporter,admin",
      'verified' => "required|boolean"
    ];
  }
}
