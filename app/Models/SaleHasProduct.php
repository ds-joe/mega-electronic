<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleHasProduct extends Model
{
  use HasFactory;
  public $timestamps = false;
  protected $casts = [
    'created_at' => 'date:Y-m-d',
    'updated_at' => 'date:Y-m-d'
  ];
  public $fillable = [
    'product_id',
    'quantity',
    "sale_id"
  ];
}
