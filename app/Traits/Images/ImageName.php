<?php
namespace App\Traits\Images;

use Illuminate\Support\Carbon;

trait ImageName
{

  /**
   * Generate a unique image name.
   * @param string $originalName
   * @return string
   */
  protected function generateImageName(string $originalName): string
  {
    return Carbon::now()->format("Y_M_D-h-m-s") . "_" . \Str::random(20) . $originalName;
  }
}
