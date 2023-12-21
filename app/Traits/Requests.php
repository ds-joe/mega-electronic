<?php
namespace App\Traits;

use Inertia\Inertia;

trait Requests
{

  /**
   * Generate Request Data
   * @param array|string|float|int|null $data
   * @return array
   */
  protected function createRequestData(array|string|float|int|null $data): array
  {
    return [
      'request-data' => $data
    ];
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
    return Inertia::render(
      $page,
      array(
        'pageWords' => $pageWords,
        ...$data
      )
    );
  }

}
