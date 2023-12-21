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
    Schema::create('sales', function (Blueprint $table) {
      $table->id();
      $table->enum('method', ['cash', 'payment'])->default('cash');
      $table->decimal("amount", 12, 2);
      $table->decimal("discount", 12, 2);
      $table->unsignedBigInteger('created_by');
      $table->unsignedBigInteger('customer_id');
      $table->foreign("created_by")->references("id")->on('users')->cascadeOnDelete();
      $table->foreign('customer_id')->references('id')->on('customers')->cascadeOnDelete();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('sales');
  }
};
