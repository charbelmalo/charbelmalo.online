<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class PortfolioProject extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'description',
        'long_description',
        'featured_image',
        'gallery_images',
        'technologies',
        'project_url',
        'github_url',
        'status',
        'sort_order',
        'is_featured',
        'category',
        'meta_data',
        'project_date',
        'client',
        'completion_percentage',
    ];

    protected $casts = [
        'gallery_images' => 'array',
        'technologies' => 'array',
        'meta_data' => 'array',
        'is_featured' => 'boolean',
        'project_date' => 'date',
        'completion_percentage' => 'decimal:2',
    ];

    protected $attributes = [
        'status' => 'active',
        'sort_order' => 0,
        'is_featured' => false,
        'completion_percentage' => 100.00,
    ];

    // Scopes
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 'active');
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    public function scopeByCategory(Builder $query, string $category): Builder
    {
        return $query->where('category', $category);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('created_at', 'desc');
    }

    // Accessors
    public function getFeaturedImageUrlAttribute(): string
    {
        if ($this->featured_image) {
            return asset($this->featured_image);
        }
        return asset('assets/img/portfolio/default.jpg');
    }

    public function getProjectUrlAttribute($value): ?string
    {
        return $value ? (str_starts_with($value, 'http') ? $value : url($value)) : null;
    }

    public function getRouteNameAttribute(): string
    {
        return 'portfolio.' . $this->slug;
    }

    public function getViewNameAttribute(): string
    {
        return 'portfolio.' . $this->slug;
    }

    // Methods
    public function getNextProject(): ?self
    {
        return static::active()
            ->where('sort_order', '>', $this->sort_order)
            ->orWhere('sort_order', $this->sort_order)
            ->where('id', '>', $this->id)
            ->ordered()
            ->first() ?? static::active()->ordered()->first();
    }

    public function getPreviousProject(): ?self
    {
        return static::active()
            ->where('sort_order', '<', $this->sort_order)
            ->orWhere('sort_order', $this->sort_order)
            ->where('id', '<', $this->id)
            ->orderBy('sort_order', 'desc')
            ->orderBy('id', 'desc')
            ->first() ?? static::active()->orderBy('sort_order', 'desc')->orderBy('id', 'desc')->first();
    }

    public function toApiArray(): array
    {
        return [
            'id' => $this->slug,
            'title' => $this->title,
            'description' => $this->description,
            'long_description' => $this->long_description,
            'technologies' => $this->technologies,
            'featured_image' => $this->featured_image_url,
            'gallery_images' => $this->gallery_images ? array_map(fn($img) => asset($img), $this->gallery_images) : [],
            'project_url' => $this->project_url,
            'github_url' => $this->github_url,
            'category' => $this->category,
            'client' => $this->client,
            'project_date' => $this->project_date?->format('Y-m-d'),
            'completion_percentage' => $this->completion_percentage,
            'is_featured' => $this->is_featured,
            'url' => route('portfolio.' . $this->slug),
            'view' => $this->view_name,
            'navigation' => [
                'next' => $this->getNextProject()?->slug,
                'prev' => $this->getPreviousProject()?->slug,
            ]
        ];
    }

    public function getStructuredData(): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'CreativeWork',
            'name' => $this->title,
            'description' => $this->description,
            'image' => $this->featured_image_url,
            'url' => route('portfolio.' . $this->slug),
            'creator' => [
                '@type' => 'Person',
                'name' => 'Charbel Malo',
                'url' => url('/'),
            ],
            'dateCreated' => $this->project_date?->toISOString(),
            'keywords' => implode(', ', $this->technologies ?? []),
        ];
    }
}
