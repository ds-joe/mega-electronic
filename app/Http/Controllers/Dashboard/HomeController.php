<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Traits\Requests;

class HomeController extends Controller
{
  use Requests;

  /**
   * display home page.
   * @param Request $request
   * @return \Inertia\Response
   */
  public function show(Request $request): \Inertia\Response
  {
    return $this->appendPage("Dashboard/Home/index", __("pages/dashboard/home"));
  }

}
