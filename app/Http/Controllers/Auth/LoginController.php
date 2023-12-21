<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{

  /**
   * @desc This method using to handle login request.
   * @param Request $request
   * @return \Inertia\Response
   */
  public function show(Request $request): \Inertia\Response
  {

    return Inertia::render(
      "Auth/Login/index",
      [
        'pageWords' => __("pages/auth/signin")
      ]
    );
  }

  /**
   * @desc This method using to make user login.
   * @param LoginRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function store(LoginRequest $request): \Illuminate\Http\RedirectResponse
  {
    $request->authenticate();
    $request->session()->regenerate();
    return redirect()->to(RouteServiceProvider::HOME);
  }

  /**
   * Destroy an authenticated session.
   */
  public function destroy(Request $request): \Illuminate\Http\RedirectResponse
  {
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect(RouteServiceProvider::HOME);
  }
}
