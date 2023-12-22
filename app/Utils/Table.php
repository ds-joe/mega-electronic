<?php
namespace App\Utils;

use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class Table
{
  protected int $currentStep;
  protected int $recordsByStep; // How many records every step.
  protected string|null $sortBy; // Order by.
  protected bool $reverse; // DESC or ASC.
  protected int|string $searchQuery;
  protected array $validSortColumns; // The columns you can sort (for security).
  protected array|null $validSearchColumns; // The columns you can search (for security).
  protected mixed $model;

  /**
   * The constructor.
   * @param string $model
   * @param int $recordsByStep
   * @param string|null $sortBy
   * @param bool $reverse
   * @param string $searchQuery
   * @param array $validSortColumns
   * @param array|null $validSearchColumns
   */
  public function __construct(string $model, array $with = [], int $currentStep = 1, int $recordsByStep = 10, string|null $sortBy = null, bool $reverse = false, string $searchQuery = "", array $validSortColumns = [], array|null $validSearchColumns = null)
  {
    $this->currentStep = $currentStep; // ✅
    $this->recordsByStep = $recordsByStep; // ✅
    $this->sortBy = $sortBy; // ✅
    $this->reverse = $reverse; // ✅
    $this->searchQuery = $searchQuery; // ✅
    $this->validSortColumns = $validSortColumns; // ✅
    $this->validSearchColumns = $validSearchColumns; // ✅
    $this->model = !empty($with) ? $model::with(...$with) : $model::with([]); // ✅
  }

  /**
   * NOTE: Next update isa
   * Set relationship behavior.
   * @param array $with
   * @return array
   */
  // private function setRelationshipBehavior(array $with): array
  // {
  //   $result = array();
  //   if(!empty($with) && !empty($this->validSearchColumns)) {
  //     foreach($with as $relationship){
  //       array_filter($this->validSearchColumns, function($searchColumn) use ($relationship, $result){
  //         if(stripos($searchColumn, "{$relationship}.")){
  //           $result = array_merge($result, [$relationship]);
  //         }
  //       });
  //     }
  //   }
  //   return $result;
  // }

  /**
   * NOTE: step 1
   * search.
   * @return void
   */
  private function search(): void
  {
    if ($this->validSearchColumns !== null) {
      for ($i = 0; $i < count($this->validSearchColumns); $i++) {
        $this->model->orWhere($this->validSearchColumns[$i], "like", "%{$this->searchQuery}%");
      }
    }
  }

  /**
   * NOTE: step 2
   * Get how many available steps.
   * @return int
   */
  private function getAvailableSteps(): int
  {
    $availableSteps = ceil($this->model->count() / ($this->recordsByStep <= 0 ? 1 : $this->recordsByStep));
    return $availableSteps >= 1 ? $availableSteps : 1;
  }

  /**
   * NOTE: step 3
   * Sort columns.
   * @return void
   */
  private function sortColumns(): void
  {
    if ($this->sortBy !== null && !in_array($this->sortBy, $this->validSortColumns)) {
      throw new Error("column {$this->sortBy} not valid.");
    }
    $this->sortBy !== null && $this->model->orderBy($this->sortBy, $this->reverse ? "DESC" : "ASC");
  }

  /**
   * NOTE: step 4
   * Set how many records we want to skip.
   * @return void
   */
  private function skipRecords(): void
  {
    $this->model->skip(($this->currentStep - 1) * $this->recordsByStep);
  }

  /**
   * NOTE: step 5
   * Set how many records we want to take.
   * @return void
   */
  private function takeRecords(): void
  {
    $this->model->take($this->recordsByStep);
  }
  /**
   * NOTE: step 6
   * Get result records.
   * @return \Illuminate\Database\Eloquent\Collection|array|null
   */
  private function getRecords(): \Illuminate\Database\Eloquent\Collection|array|null
  {
    return $this->model->get();
  }

  /**
   * Get result data
   * @return array
   */
  public function getTableData(): array
  {
    $this->search();
    $availableSteps = $this->getAvailableSteps();
    $this->sortColumns();
    $this->skipRecords();
    $this->takeRecords();

    return [
      'data' => $this->getRecords(),
      'available_steps' => $availableSteps,
      'allowed_sort_columns' => $this->validSortColumns
    ];
  }

  /**
   * Get model.
   * NOTE:  if you'll use this method, please use this method before get data.
   * NOTE: this method using to add some condition or something like that before get data.
   * @return mixed
   */
  public function model(): mixed
  {
    return $this->model;
  }

  /**
   * ************************************************************
   * Static Methods
   * ************************************************************
   */

  /**
   * Get table request params.
   * @param Request $request
   * @param string $model
   * @param array $with
   * @param array $validSortColumns
   * @param array|null $validSearchColumns
   */
  public static function handleResponse(Request $request, string $model, array $with = [], array $validSortColumns = [], array $validSearchColumns = null)
  {
    $table = new Table(
      $model,
      $with,
      $request->currentStep,
      $request->recordsByStep,
      $request->sortBy,
      $request->reverse,
      !empty($request->searchQuery) ? $request->searchQuery : "",
      $validSortColumns,
      $validSearchColumns
    );
    return $table->getTableData();
  }

  /**
   * Make a table route.
   * @param string $link
   * @param string $routeName
   * @param string $method
   * @return \Illuminate\Routing\Route
   */
  public static function createRoute(string $link, string $method, string $routeName)
  {
    return Route::patch($link . "/{currentStep}/{recordsByStep}/{sortBy?}/{reverse}/{searchQuery?}", $method)->name($routeName);
  }

  /**
   * Get default table.
   * @param string $model
   * @param array $with
   * @param array $validSortColumns
   * @return array|null $validSearchColumns
   * @return array
   */
  public static function defaultTable(string $model, array $with, array $validSortColumns = ['id'], array|null $validSearchColumns = null): array
  {
    $table = new Table($model, $with, 1, 50, 'id', true, '', $validSortColumns, $validSearchColumns);
    return $table->getTableData();
  }



}
