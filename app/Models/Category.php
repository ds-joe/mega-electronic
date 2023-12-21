<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends Model
{
  use HasFactory;

  protected $casts = [
    'created_at' => 'date:Y-m-d',
    'updated_at' => 'date:Y-m-d'
  ];
  protected $fillable = [
    "name",
    "created_by"
  ];

  /**
   * Get category created owner.
   * @return BelongsTo
   */
  public function createdOwner(): BelongsTo
  {
    return $this->belongsTo(User::class, 'created_by');
  }
}
