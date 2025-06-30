<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\View;

class PerformanceOptimizationService
{
    /**
     * Cache portfolio data to reduce repeated computations
     */
    public function getCachedPortfolioItems(): array
    {
        return Cache::remember('portfolio.items', 3600, function () {
            return [
                'grower' => [
                    'title' => 'The Grower AI',
                    'view' => 'portfolio.grower',
                    'next' => 'hovi',
                    'prev' => 'nfe',
                    'description' => 'AI-powered agricultural management platform',
                    'technologies' => ['Laravel', 'Vue.js', 'Python', 'TensorFlow'],
                    'featured_image' => '/assets/img/portfolio/grower-featured.jpg'
                ],
                'hovi' => [
                    'title' => 'Hovi',
                    'view' => 'portfolio.hovi',
                    'next' => 'pellini',
                    'prev' => 'grower',
                    'description' => 'Modern hospitality management system',
                    'technologies' => ['React', 'Node.js', 'MongoDB'],
                    'featured_image' => '/assets/img/portfolio/hovi-featured.jpg'
                ],
                'pellini' => [
                    'title' => 'Pellini',
                    'view' => 'portfolio.pellini',
                    'next' => 'vertical-software',
                    'prev' => 'hovi',
                    'description' => 'Premium coffee e-commerce platform',
                    'technologies' => ['Laravel', 'Alpine.js', 'Tailwind CSS'],
                    'featured_image' => '/assets/img/portfolio/pellini-featured.jpg'
                ],
                'vertical-software' => [
                    'title' => 'Vertical Software',
                    'view' => 'portfolio.vertical-software',
                    'next' => 'nfe',
                    'prev' => 'pellini',
                    'description' => 'Enterprise software solutions platform',
                    'technologies' => ['Laravel', 'Vue.js', 'PostgreSQL'],
                    'featured_image' => '/assets/img/portfolio/vertical-software-featured.jpg'
                ],
                'nfe' => [
                    'title' => 'NFE',
                    'view' => 'portfolio.nfe',
                    'next' => 'grower',
                    'prev' => 'vertical-software',
                    'description' => 'Brazilian electronic invoice system',
                    'technologies' => ['PHP', 'MySQL', 'XML Processing'],
                    'featured_image' => '/assets/img/portfolio/nfe-featured.jpg'
                ]
            ];
        });
    }

    /**
     * Generate optimized meta data for portfolio items
     */
    public function getPortfolioMetaData(string $project): array
    {
        $items = $this->getCachedPortfolioItems();
        
        if (!isset($items[$project])) {
            return [];
        }

        $item = $items[$project];
        
        return [
            'title' => $item['title'] . ' | Charbel Malo Portfolio',
            'description' => $item['description'],
            'og:title' => $item['title'],
            'og:description' => $item['description'],
            'og:image' => url($item['featured_image']),
            'og:type' => 'website',
            'twitter:card' => 'summary_large_image',
            'twitter:title' => $item['title'],
            'twitter:description' => $item['description'],
            'twitter:image' => url($item['featured_image']),
            'canonical' => route('portfolio.' . $project)
        ];
    }

    /**
     * Preload critical resources for better performance
     */
    public function getCriticalResources(): array
    {
        return [
            'fonts' => [
                '/assets/css/fonts/roboto-regular.woff2',
                '/assets/css/fonts/roboto-bold.woff2'
            ],
            'images' => [
                '/assets/img/hero-background.webp',
                '/assets/img/logo.svg'
            ],
            'scripts' => [
                '/build/assets/app.js'
            ],
            'styles' => [
                '/build/assets/app.css'
            ]
        ];
    }

    /**
     * Generate structured data for better SEO
     */
    public function getStructuredData(string $project = null): array
    {
        $baseData = [
            '@context' => 'https://schema.org',
            '@type' => 'Person',
            'name' => 'Charbel Malo',
            'jobTitle' => 'Full Stack Developer',
            'url' => url('/'),
            'sameAs' => [
                'https://linkedin.com/in/charbelmalo',
                'https://github.com/charbelmalo'
            ]
        ];

        if ($project) {
            $items = $this->getCachedPortfolioItems();
            if (isset($items[$project])) {
                $item = $items[$project];
                return [
                    '@context' => 'https://schema.org',
                    '@type' => 'CreativeWork',
                    'name' => $item['title'],
                    'description' => $item['description'],
                    'creator' => $baseData,
                    'url' => route('portfolio.' . $project),
                    'image' => url($item['featured_image'])
                ];
            }
        }

        return $baseData;
    }

    /**
     * Clear all performance caches
     */
    public function clearCaches(): void
    {
        Cache::forget('portfolio.items');
        Cache::forget('portfolio.meta');
        Cache::forget('portfolio.structured_data');
    }
}
