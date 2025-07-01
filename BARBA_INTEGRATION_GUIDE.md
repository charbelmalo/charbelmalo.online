<!-- 
Optimized HTML Structure for Barba.js Page Transitions
Add these attributes to your Laravel Blade templates for optimal performance
-->

<!-- Add to your main layout file (e.g., app.blade.php) -->
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="no-js">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <!-- Preconnect to external domains for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://cdn.jsdelivr.net">
    
    <!-- DNS prefetch for better performance -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    
    <title>{{ config('app.name', 'Laravel') }}</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    
    <!-- Styles -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    
    <!-- Critical CSS for immediate rendering -->
    <style>
        /* Critical above-the-fold styles */
        .page-preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    </style>
</head>
<body class="antialiased {{ $bodyClass ?? '' }}" data-namespace="{{ $namespace ?? 'default' }}">
    <!-- Preloader -->
    <div class="page-preloader" id="preloader">
        <div class="preloader-text">Loading...</div>
    </div>
    
    <!-- Navigation (outside Barba container to persist) -->
    <nav class="main-navigation" data-barba-prevent="all">
        <!-- Your navigation content -->
        <div class="nav-content">
            <a href="/" class="nav-logo">{{ config('app.name') }}</a>
            <ul class="nav-menu">
                <li><a href="/" data-barba-prevent="false">Home</a></li>
                <li><a href="/portfolio" data-barba-prevent="false">Portfolio</a></li>
                <li><a href="/about" data-barba-prevent="false">About</a></li>
                <li><a href="/contact" data-barba-prevent="false">Contact</a></li>
            </ul>
        </div>
    </nav>
    
    <!-- Barba.js wrapper -->
    <div data-barba="wrapper">
        <!-- Main content container -->
        <main data-barba="container" data-barba-namespace="{{ $namespace ?? 'default' }}">
            @yield('content')
        </main>
    </div>
    
    <!-- Footer (outside Barba container to persist) -->
    <footer class="site-footer" data-barba-prevent="all">
        <!-- Your footer content -->
        <div class="footer-content">
            <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
        </div>
    </footer>
    
    <!-- Three.js canvas container (outside Barba to persist) -->
    <div id="threejs-container" class="threejs-canvas"></div>
    
    <!-- Transition overlay -->
    <div class="transition-overlay"></div>
    
    <!-- Scripts -->
    <script>
        // Remove no-js class
        document.documentElement.classList.remove('no-js');
        
        // Hide preloader when page is loaded
        window.addEventListener('load', function() {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.classList.add('hidden');
                setTimeout(() => preloader.remove(), 500);
            }
        });
        
        // Add namespace-specific body classes
        document.body.classList.add('page-' + (document.querySelector('[data-barba="container"]')?.dataset.barbaNamespace || 'default'));
    </script>
</body>
</html>

<!-- 
Example page template (e.g., portfolio.blade.php)
-->
@extends('layouts.app')

@section('content')
<div class="portfolio-page" data-page-type="portfolio">
    <header class="page-header">
        <h1 class="page-title">Portfolio</h1>
        <p class="page-description">Explore my latest projects and creative work</p>
    </header>
    
    <section class="portfolio-grid">
        @foreach($projects as $index => $project)
        <article class="portfolio-item" 
                 data-project-type="{{ $project->type }}" 
                 data-project-id="{{ $project->id }}"
                 style="--item-index: {{ $index }}">
            <a href="{{ route('project.show', $project->slug) }}" 
               class="project-link"
               data-barba-prevent="false">
                <div class="project-image project__image__{{ $project->id }}">
                    <img src="{{ $project->featured_image }}" 
                         alt="{{ $project->title }}"
                         loading="lazy">
                </div>
                <div class="project-content">
                    <h3 class="project-title">{{ $project->title }}</h3>
                    <p class="project-description">{{ $project->excerpt }}</p>
                    <div class="project-tags">
                        @foreach($project->tags as $tag)
                        <span class="tag">{{ $tag }}</span>
                        @endforeach
                    </div>
                </div>
            </a>
        </article>
        @endforeach
    </section>
</div>
@endsection

<!-- 
Example project detail template (project.blade.php)
-->
@extends('layouts.app')

@section('content')
<div class="project-detail" data-page-type="project" data-project-id="{{ $project->id }}">
    <header class="project-header">
        <nav class="project-nav">
            <a href="{{ route('portfolio') }}" class="back-link" data-barba-prevent="false">
                ← Back to Portfolio
            </a>
        </nav>
        <h1 class="project-title">{{ $project->title }}</h1>
        <div class="project-meta">
            <span class="project-type">{{ $project->type }}</span>
            <span class="project-date">{{ $project->created_at->format('Y') }}</span>
        </div>
    </header>
    
    <section class="project-content">
        <div class="project-gallery">
            @foreach($project->images as $image)
            <div class="gallery-item">
                <img src="{{ $image->url }}" 
                     alt="{{ $image->alt }}"
                     loading="lazy">
            </div>
            @endforeach
        </div>
        
        <div class="project-description">
            {!! $project->description !!}
        </div>
        
        <div class="project-technologies">
            <h3>Technologies Used</h3>
            <ul class="tech-list">
                @foreach($project->technologies as $tech)
                <li class="tech-item">{{ $tech }}</li>
                @endforeach
            </ul>
        </div>
    </section>
    
    <!-- Three.js shader container for project-specific effects -->
    <div class="shader-container" data-shader-type="{{ $project->type }}"></div>
</div>
@endsection

<!-- 
Performance Optimization Notes:

1. Use data-barba-prevent="false" on internal links
2. Use data-barba-prevent="all" on external links and navigation
3. Add data-barba-namespace to identify page types
4. Use --item-index CSS custom property for staggered animations
5. Include loading="lazy" on images below the fold
6. Preconnect to external domains used by the page
7. Use semantic HTML structure for better accessibility
8. Add appropriate meta tags for SEO and social sharing
-->

<!-- 
Laravel Route Configuration for Barba.js:

// In your routes/web.php
Route::get('/', function () {
    return view('home', ['namespace' => 'home']);
})->name('home');

Route::get('/portfolio', function () {
    $projects = \App\Models\PortfolioProject::published()->get();
    return view('portfolio', [
        'projects' => $projects,
        'namespace' => 'portfolio'
    ]);
})->name('portfolio');

Route::get('/project/{slug}', function ($slug) {
    $project = \App\Models\PortfolioProject::where('slug', $slug)->firstOrFail();
    return view('project', [
        'project' => $project,
        'namespace' => 'project'
    ]);
})->name('project.show');

Route::get('/about', function () {
    return view('about', ['namespace' => 'about']);
})->name('about');

Route::get('/contact', function () {
    return view('contact', ['namespace' => 'contact']);
})->name('contact');
-->
