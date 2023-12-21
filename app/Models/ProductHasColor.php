<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductHasColor extends Model
{
  use HasFactory;
  protected $fillable = [
    'color',
    'product_id'
  ];

  public $timestamps = false;
}
