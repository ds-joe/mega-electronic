<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Http\Requests\Auth\RegisterRequest;

use App\Traits\Languages\AuthLayout as AuthLayoutLanguage;

class RegisterController extends Controller
{
  use AuthLayoutLanguage;

  /**
   * @desc This method using to return sign up view.
   * @return \Inertia\Response
   */
  public function show(): \Inertia\Response
  {
    return Inertia::render(
      "Auth/Signup/index",
      array_merge(
        $this->authWords(__("pages/auth/signup"))
      )
    );
  }

  /**
   * @desc This method using to create a user from auth gate.
   * @param RegisterRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function store(RegisterRequest $request): \Illuminate\Http\RedirectResponse
  {
    $user = User::create([
      "full_name" => $request->full_name,
      "email" => $request->email,
      "password" => Hash::make($request->password)
    ]);
    return redirect(RouteServiceProvider::HOME);
  }
}