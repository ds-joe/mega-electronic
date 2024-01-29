<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use App\Traits\Requests;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;


class UserVerified
{
  use Requests;

  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next): Response
  {
    if (auth()->check()) {
      if (boolval($request->user()->verified))
        return $next($request);
      return redirect(RouteServiceProvider::DASHBOARD_BASE)->with($this->createRequestNotification(__("validation.verified"), 'error'));
    }
    return back()->with($this->createRequestNotification(__("validation.verified"), 'error'));
  }
}
