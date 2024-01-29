<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('products', function (Blueprint $table) {
      $table->id();
      $table->string('sku');
      $table->string('name')->unique();
      $table->decimal('price', 12, 2);
      $table->decimal('rate', 12, 1);
      $table->string('image')->nullable();
      $table->text('description')->nullable();
      $table->unsignedBigInteger('brand_id');
      $table->unsignedBigInteger('category_id');
      $table->unsignedBigInteger('created_by');
      $table->foreign("brand_id")->references("id")->on('brands')->cascadeOnDelete();
      $table->foreign('category_id')->references('id')->on('categories')->cascadeOnDelete();
      $table->foreign('created_by')->references('id')->on('users')->cascadeOnDelete();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('products');
  }
};
