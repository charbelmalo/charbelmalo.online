<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use App\Services\PerformanceOptimizationService;
use App\Models\PortfolioProject;

class PortfolioController extends Controller
{
    protected $performanceService;

    public function __construct(PerformanceOptimizationService $performanceService)
    {
        $this->performanceService = $performanceService;
    }

    /**
     * Display the portfolio index
     */
    public function index()
    {
        $projects = PortfolioProject::active()
            ->ordered()
            ->with([])
            ->get();
        
        return view('portfolio.index', [
            'items' => $projects,
            'namespace' => 'portfolio', // Add namespace for Barba.js
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
        
        $currentProject = PortfolioProject::active()
            ->where('slug', $project)
            ->first();
        
        if (!$currentProject) {
            abort(404, "Portfolio project '{$project}' not found");
        }

        // Get next and previous projects based on sort order
        $nextProject = PortfolioProject::active()
            ->where('sort_order', '>', $currentProject->sort_order)
            ->orderBy('sort_order', 'asc')
            ->first();
            
        $prevProject = PortfolioProject::active()
            ->where('sort_order', '<', $currentProject->sort_order)
            ->orderBy('sort_order', 'desc')
            ->first();

        // Determine the view template (use existing blade files)
        $viewTemplate = $this->getProjectViewTemplate($project);
        
        return view($viewTemplate, [
            'project' => $currentProject,
            'title' => $currentProject->title,
            'nextProject' => $nextProject,
            'prevProject' => $prevProject,
            'currentProject' => $project,
            'namespace' => 'project', // Add namespace for Barba.js
            'metaData' => $this->performanceService->getPortfolioMetaData($project),
            'structuredData' => $this->performanceService->getStructuredData($project),
            'criticalResources' => $this->performanceService->getCriticalResources()
        ]);
    }

    /**
     * Get the appropriate view template for a project
     */
    private function getProjectViewTemplate(string $slug): string
    {
        $specificView = "portfolio.{$slug}";
        
        // Check if specific view exists, otherwise use generic template
        if (View::exists($specificView)) {
            return $specificView;
        }
        
        return 'portfolio.project'; // Generic project template
    }

    /**
     * API endpoint for portfolio data
     */
    public function apiIndex()
    {
        $projects = PortfolioProject::active()
            ->ordered()
            ->get()
            ->map(function($project) {
                return [
                    'id' => $project->slug,
                    'title' => $project->title,
                    'description' => $project->description,
                    'technologies' => $project->technologies_array,
                    'featured_image' => $project->featured_image,
                    'category' => $project->category,
                    'url' => route('portfolio.' . $project->slug),
                    'is_featured' => $project->is_featured,
                    'project_date' => $project->project_date?->format('Y-m-d'),
                    'meta_data' => $project->meta_data
                ];
            });

        return response()->json([
            'items' => $projects,
            'total' => $projects->count()
        ]);
    }

    /**
     * Get portfolio navigation data
     */
    public function getNavigation(string $project)
    {
        $currentProject = PortfolioProject::active()
            ->where('slug', $project)
            ->first();
        
        if (!$currentProject) {
            abort(404);
        }

        $nextProject = PortfolioProject::active()
            ->where('sort_order', '>', $currentProject->sort_order)
            ->orderBy('sort_order', 'asc')
            ->first();
            
        $prevProject = PortfolioProject::active()
            ->where('sort_order', '<', $currentProject->sort_order)
            ->orderBy('sort_order', 'desc')
            ->first();
        
        return response()->json([
            'current' => $project,
            'next' => $nextProject ? [
                'id' => $nextProject->slug,
                'title' => $nextProject->title,
                'url' => route('portfolio.' . $nextProject->slug)
            ] : null,
            'prev' => $prevProject ? [
                'id' => $prevProject->slug,
                'title' => $prevProject->title,
                'url' => route('portfolio.' . $prevProject->slug)
            ] : null
        ]);
    }

    /**
     * API endpoint for featured portfolio items
     */
    public function apiFeatured()
    {
        $projects = PortfolioProject::active()
            ->featured()
            ->ordered()
            ->limit(6)
            ->get()
            ->map(function($project) {
                return [
                    'id' => $project->slug,
                    'title' => $project->title,
                    'description' => $project->description,
                    'technologies' => $project->technologies_array,
                    'featured_image' => $project->featured_image,
                    'category' => $project->category,
                    'url' => route('portfolio.' . $project->slug),
                    'project_date' => $project->project_date?->format('Y-m-d')
                ];
            });

        return response()->json([
            'items' => $projects,
            'total' => $projects->count()
        ]);
    }
}
