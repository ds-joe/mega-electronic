<?php
namespace App\Traits\Images;

use Illuminate\Support\Facades\Config;
use Vite;

trait ImagesPaths
{
  private array $imagesPaths;

  public function __construct()
  {
    $disk = Vite::asset(Config::get('filesystems.disks.public.name') . "/storage");
    $this->imagesPaths = [
      'root' => $disk,
      'users' => "users",
      'profile' => "users/profile",
      "brands" => "brands",
      'products' => "products"
    ];
  }

  /**
   * Get images paths.
   * @return array
   */
  public function getImagesPaths(): array
  {
    return $this->imagesPaths;
  }

  /**
   * Set images paths.
   * @param array $paths
   * @return array
   */
  public function setImagesPaths(array $paths): array
  {
    $this->imagesPaths = [
      ...$this->imagesPaths,
      ...$paths
    ];
    return $this->imagesPaths;
  }

}
