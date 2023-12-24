<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use DB;
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

    // $test = Sale::select(
    //   DB::raw('YEAR(created_at) as year'),
    //   DB::raw('WEEK(created_at) as week'),
    //   DB::raw('SUM(amount) as total_amount'),
    //   DB::raw('DAYOFWEEK(created_at) as day_of_week'),
    // )->groupBy('year', 'week', 'day_of_week')->get();

    return $this->appendPage("Dashboard/Home/index", __("pages/dashboard/home"), [
      // 'test' => $test
    ]);
  }

}
