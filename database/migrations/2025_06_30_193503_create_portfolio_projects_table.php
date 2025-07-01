<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('portfolio_projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('description');
            $table->text('long_description')->nullable();
            $table->string('featured_image')->nullable();
            $table->json('gallery_images')->nullable();
            $table->json('technologies');
            $table->string('project_url')->nullable();
            $table->string('github_url')->nullable();
            $table->string('status')->default('active'); // active, archived, draft
            $table->integer('sort_order')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->string('category')->nullable();
            $table->json('meta_data')->nullable(); // SEO and custom fields
            $table->date('project_date')->nullable();
            $table->string('client')->nullable();
            $table->decimal('completion_percentage', 5, 2)->default(100.00);
            $table->timestamps();
            
            // Indexes
            $table->index(['status', 'sort_order']);
            $table->index(['is_featured', 'status']);
            $table->index('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolio_projects');
    }
};
