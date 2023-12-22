<?php
namespace App\Traits;

use App\Http\Middleware\HandleInertiaRequests;
use Inertia\Inertia;

trait Requests
{

  /**
   * Update | add page data
   * @param array $data
   * @return void
   */
  protected function setPageData(array $data = []): void
  {
    if (session()->has(HandleInertiaRequests::$session_names['page_data'])) {
      session()->remove(HandleInertiaRequests::$session_names['page_data']);
    }
    session()->push(HandleInertiaRequests::$session_names['page_data'], $data);
  }

  /**
   * Generate Request Notification
   * @param string $message
   * @param string $type
   * @return array
   */
  protected function createRequestNotification(string $message, string $type = "default"): array
  {
    $allowedTypes = ['success', 'default', 'warning', 'error'];
    if (!in_array($type, $allowedTypes)) {
      $type = 'default';
    }
    return [
      'notification' => [
        'message' => $message,
        'type' => $type
      ]
    ];
  }

  /**
   * Append new react page.
   * @param string $page
   * @param array|null|string $pageWords
   * @param array $data
   * @return \Inertia\Response
   */
  protected function appendPage(string $page, array|null|string $pageWords, array $data = []): \Inertia\Response
  {
    $sessionData = [];
    if (session()->has(HandleInertiaRequests::$session_names['page_data'])) {
      $sessionData = session()->get(HandleInertiaRequests::$session_names['page_data'])[0];
      session()->remove(HandleInertiaRequests::$session_names['page_data']);
    }
    return Inertia::render(
      $page,
      [
        'pageWords' => $pageWords,
        'pageData' => array_merge(
          $data,
          $sessionData
        )
      ]
    );
  }

}
