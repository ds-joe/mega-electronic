<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Traits\Languages\AuthLayout as AuthLayoutLanguage;

class LoginController extends Controller
{

  use AuthLayoutLanguage;

  /**
   * @desc This method using to handle login request.
   * @param Request $request
   * @return \Inertia\Response
   */
  public function show(Request $request): \Inertia\Response
  {
    return Inertia::render(
      "Auth/Signin/index",
      array_merge(
        $this->authWords(__("pages/auth/signin"))
      )
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
    return redirect()->intended(RouteServiceProvider::HOME);
  }

  /**
   * Destroy an authenticated session.
   */
  public function destroy(Request $request): \Illuminate\Http\RedirectResponse
  {
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/');
  }
}