<?php
namespace App\Traits\Utils;

use Carbon\Carbon;


trait Dates
{

  /**
   * Current Day Hours
   * @return array
   */
  public function getCurrentDayHours(): array
  {
    $hours = [];
    $startOfDay = Carbon::now()->startOfDay();
    for ($hour = 0; $hour < 24; $hour++) {
      $hours[] = $startOfDay->copy()->addHours($hour)->format('h:i A');
    }
    return $hours;
  }

  /**
   * Current week days.
   * @return array
   */
  public function getCurrentWeekDays(): array
  {
    $days = [];
    $startOfWeek = Carbon::now()->startOfWeek();
    for ($day = 0; $day < 7; $day++) {
      $days[] = $startOfWeek->copy()->addDays($day)->format('D');
    }
    return $days;
  }

  /**
   * Current Month Weeks
   * @return array
   */
  public function getCurrentMonthWeeks(): array
  {
    $weeks = [];
    $startOfMonth = Carbon::now()->startOfMonth();
    for ($week = 0; $week < 5; $week++) {
      $weeks[] = $startOfMonth->copy()->addWeeks($week)->format('Y-m-d');
    }
    return $weeks;
  }

  /**
   * Yearly Months
   * @return array
   */
  public function getCurrentYearMonths(): array
  {
    $months = [];
    $startOfYear = Carbon::now()->startOfYear();
    for ($month = 0; $month < 12; $month++) {
      $months[] = $startOfYear->copy()->addMonths($month)->format("M");
    }
    return $months;
  }

  /**
   * fill a array.
   * @param array $array
   * @param int $places
   * @param mixed $data
   * @return array
   */
  public function fillArray(array $array, int $places, mixed $data)
  {
    for ($i = count($array); $i < $places; $i++) {
      $array[] = $data;
    }
    return $array;
  }

  /**
   * Get Records between two dates.
   * @param string $model
   * @param string $startDate
   * @param string $endDate
   * @return mixed
   */
  function getRecordsCountsBetweenDates(string $model, string $startDate, string $endDate, string $query = ""): mixed
  {
    if ($query !== "") {
      $query = ", {$query}";
    }
    return $model::whereBetween('created_at', [$startDate, $endDate])
      ->selectRaw("DATE(created_at) as record_time, COUNT(*) as count {$query}")
      ->groupBy('record_time')
      ->orderBy('record_time');
  }

}
