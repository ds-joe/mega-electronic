<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
  /**
   * display home page.
   * @param Request $request
   * @return \Inertia\Response
   */
  public function show(Request $request): \Inertia\Response
  {
    return Inertia::render(
      "Dashboard/Home/index",
      [
        'pageWords' => __("pages/dashboard/home")
      ]
    );
  }

}
