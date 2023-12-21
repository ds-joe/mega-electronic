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
    Schema::create('sale_has_products', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('product_id');
      $table->unsignedBigInteger('sale_id');
      $table->decimal('quantity', 12, 2)->default(1);
      $table->foreign('product_id')->references('id')->on('products')->cascadeOnDelete();
      $table->foreign('sale_id')->references('id')->on('sales')->cascadeOnDelete();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('sale_has_products');
  }
};
