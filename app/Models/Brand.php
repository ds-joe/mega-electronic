<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Brand extends Model
{
  use HasFactory;

  protected $casts = [
    'created_at' => 'date:Y-m-d',
    'updated_at' => 'date:Y-m-d'
  ];

  protected $fillable = [
    "name",
    "image",
    "description",
    "created_by"
  ];

  /**
   * Get brand created owner.
   * @return BelongsTo
   */
  public function owner(): BelongsTo
  {
    return $this->belongsTo(User::class, 'created_by');
  }

}
