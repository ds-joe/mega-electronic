<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductHasImage extends Model
{
  use HasFactory;
  protected $fillable = [
    'image',
    'product_id'
  ];
  public $timestamps = false;
}
