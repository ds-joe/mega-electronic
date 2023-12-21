<?php

namespace App\Http\Requests\Dashboard\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
    $id = $this->id;

    return [
      'id' => "required|numeric",
      'full_name' => "required|string|max:350",
      'email' => "required|string|email|max:250|unique:users,email,{$id}",
      'avatar' => "sometimes|nullable|" . $this->imageRules,
      "new_password" => "sometimes|nullable|confirmed|min:6",
      'new_password_confirmation' => "sometimes",
      'type' => "required|in:supporter,admin",
      'verified' => "required|boolean"
    ];
  }
}
