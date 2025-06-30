<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use App\Services\PerformanceOptimizationService;

class PortfolioController extends Controller
{
    protected $performanceService;

    public function __construct(PerformanceOptimizationService $performanceService)
    {
        $this->performanceService = $performanceService;
    }

    // Define portfolio items with their metadata
    private function getPortfolioItems(): array
    {
        return $this->performanceService->getCachedPortfolioItems();
    }

    /**
     * Display the portfolio index
     */
    public function index()
    {
        $items = $this->getPortfolioItems();
        
        return view('portfolio.index', [
            'items' => $items,
            'structuredData' => $this->performanceService->getStructuredData(),
            'criticalResources' => $this->performanceService->getCriticalResources()
        ]);
    }

    /**
     * Display a specific portfolio item
     */
    public function show(Request $request, string $project = null)
    {
        // If no project specified, try to get from route parameter
        if (!$project) {
            $project = $request->route()->parameter('project');
        }
        
        if (!$project) {
            abort(404, 'Portfolio project not specified');
        }
        
        $items = $this->getPortfolioItems();
        
        if (!isset($items[$project])) {
            abort(404, "Portfolio project '{$project}' not found");
        }

        $item = $items[$project];
        
        return view($item['view'], [
            'title' => $item['title'],
            'nextProject' => isset($items[$item['next']]) ? array_merge(['id' => $item['next']], $items[$item['next']]) : null,
            'prevProject' => isset($items[$item['prev']]) ? array_merge(['id' => $item['prev']], $items[$item['prev']]) : null,
            'currentProject' => $project,
            'metaData' => $this->performanceService->getPortfolioMetaData($project),
            'structuredData' => $this->performanceService->getStructuredData($project),
            'criticalResources' => $this->performanceService->getCriticalResources()
        ]);
    }

    /**
     * API endpoint for portfolio data
     */
    public function apiIndex()
    {
        $items = $this->getPortfolioItems();
        
        $formattedItems = collect($items)->map(function($item, $key) {
            return [
                'id' => $key,
                'title' => $item['title'],
                'description' => $item['description'],
                'technologies' => $item['technologies'],
                'featured_image' => $item['featured_image'],
                'url' => route('portfolio.' . $key),
                'view' => $item['view'],
                'navigation' => [
                    'next' => $item['next'],
                    'prev' => $item['prev']
                ]
            ];
        })->values();

        return response()->json([
            'items' => $formattedItems,
            'total' => count($items)
        ]);
    }

    /**
     * Get portfolio navigation data
     */
    public function getNavigation(string $project)
    {
        $items = $this->getPortfolioItems();
        
        if (!isset($items[$project])) {
            abort(404);
        }

        $item = $items[$project];
        
        return response()->json([
            'current' => $project,
            'next' => $item['next'] ? [
                'id' => $item['next'],
                'title' => $items[$item['next']]['title'],
                'url' => route('portfolio.' . $item['next'])
            ] : null,
            'prev' => $item['prev'] ? [
                'id' => $item['prev'],
                'title' => $items[$item['prev']]['title'],
                'url' => route('portfolio.' . $item['prev'])
            ] : null
        ]);
    }
}
