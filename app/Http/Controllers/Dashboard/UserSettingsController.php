<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserSettingsController extends Controller
{

  /** Toggle dark mode
   * @param Request $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function toggleDarkMode(Request $request): \Illuminate\Http\RedirectResponse
  {
    $settings = $request->user()->settings;
    $settings->update([
      'dark_mode' => $settings->dark_mode ? false : true,
    ]);
    return back();
  }

  /** Toggle page direction
   * @param Request $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function togglePageDirection(Request $request): \Illuminate\Http\RedirectResponse
  {
    $settings = $request->user()->settings;
    $settings->update([
      'direction' => $settings->direction === 'rtl' ? "ltr" : 'rtl',
    ]);
    return back();
  }

}
