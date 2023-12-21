<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
  use HasFactory;

  protected $casts = [
    'created_at' => 'date:Y-m-d',
    'updated_at' => 'date:Y-m-d'
  ];
  public $fillable = [
    'first_name',
    'last_name',
    'phone',
    'email',
    'address',
    'created_by'
  ];

  /**
   * Get customer owner.
   *
   */
  public function owner()
  {
    return $this->belongsTo(User::class, 'created_by');
  }
}
