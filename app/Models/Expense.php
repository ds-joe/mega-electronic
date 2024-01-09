<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
  use HasFactory;
  protected $casts = [
    'created_at' => 'date:Y-m-d',
    'updated_at' => 'date:Y-m-d'
  ];
  protected $fillable = [
    'amount',
    'date',
    'description',
    'method',
    'receipt',
    'created_by'
  ];

  /**
   * Get created by
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function owner(): \Illuminate\Database\Eloquent\Relations\BelongsTo
  {
    return $this->belongsTo(User::class, 'created_by');
  }
}
