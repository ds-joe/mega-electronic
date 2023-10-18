<?php
namespace App\Traits\Languages;

trait AuthLayout
{

  /**
   * @desc This method using to combine the auth layout words in one array and return two array (current page words) & (full layout words) like navbar, footer.....
   * @param array $pageWords the current page words.
   * @return array
   */
  public function authWords(array $pageWords): array
  {
    return [
      "layoutWords" => array_merge(
        __("components/auth/navbar")
      ),
      "pageWords" => $pageWords
    ];
  }
}