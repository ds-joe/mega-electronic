<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Sale extends Model
{
  use HasFactory;

  protected $casts = [
    'created_at' => 'date:Y-m-d',
    'updated_at' => 'date:Y-m-d'
  ];

  public $fillable = [
    'method',
    'amount',
    "discount",
    'created_by',
    "customer_id"
  ];

  /**
   * Get owner.
   * @return BelongsTo
   */
  public function owner(): BelongsTo
  {
    return $this->belongsTo(User::class, 'created_by');
  }

  /**
   * Get customer
   * @return BelongsTo
   */
  public function customer(): BelongsTo
  {
    return $this->belongsTo(Customer::class, "customer_id");
  }

  /**
   * Get products.
   * @return BelongsToMany
   */
  public function products(): BelongsToMany
  {
    return $this->belongsToMany(Product::class, SaleHasProduct::class);
  }
}
