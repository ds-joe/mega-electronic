<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Product extends Model
{
  use HasFactory;

  protected $casts = [
    'created_at' => 'date:Y-m-d',
    'updated_at' => 'date:Y-m-d'
  ];

  protected $fillable = [
    'sku',
    'name',
    'price',
    'rate',
    'image',
    'description',
    'created_by',
    'brand_id',
    'category_id'
  ];

  /**
   * Get product category.
   * @return BelongsTo
   */
  public function category(): BelongsTo
  {
    return $this->belongsTo(Category::class);
  }

  /**
   * Get product brand
   * @return BelongsTo
   */
  public function brand(): BelongsTo
  {
    return $this->belongsTo(Brand::class);
  }

  /**
   * Get created owner
   * @return BelongsTo
   */
  public function owner(): BelongsTo
  {
    return $this->belongsTo(User::class, 'created_by');
  }

  /**
   * Get product colors
   * @return HasMany
   */
  public function colors(): HasMany
  {
    return $this->hasMany(ProductHasColor::class);
  }


}
