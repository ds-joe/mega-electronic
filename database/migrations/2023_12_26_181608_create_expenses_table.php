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
    Schema::create('expenses', function (Blueprint $table) {
      $table->id();
      $table->decimal("amount", 12, 2);
      $table->timestamp('date')->nullable();
      $table->text('description')->nullable();
      $table->enum('method', ['cash', 'payment']);
      $table->string('receipt')->nullable();
      $table->unsignedBigInteger('created_by');
      $table->foreign('created_by')->references('id')->on('users')->cascadeOnDelete();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('expenses');
  }
};
