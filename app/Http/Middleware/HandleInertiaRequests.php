<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
  /**
   * The root template that is loaded on the first page visit.
   *
   * @var string
   */
  protected $rootView = 'app';

  /**
   * Determine the current asset version.
   */
  public function version(Request $request): string|null
  {
    return parent::version($request);
  }

  /**
   * @desc This function using to define layout words.
   * @return array
   */
  private function layoutWords(): array
  {
    return [
      "auth" => array_merge(
        __("components/auth/navbar")
      )
    ];
  }

  /**
   * Define the props that are shared by default.
   *
   * @return array<string, mixed>
   */
  public function share(Request $request): array
  {
    return [
      ...parent::share($request),
      'layoutsWords' => $this->layoutWords(),
      'auth' => [
        'user' => $request->user(),
      ],
      // 'ziggy' => fn() => [
      //   ...(new Ziggy)->toArray(),
      //   'location' => $request->url(),
      // ],
    ];
  }
}