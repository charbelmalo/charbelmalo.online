@extends('layouts.app')

@section('title', 'Portfolio | Charbel Malo')

@section('meta')
    <meta name="description" content="Explore Charbel Malo's portfolio featuring innovative web development projects, Three.js experiences, and modern application architecture.">
    <meta name="keywords" content="portfolio, web development, Three.js, Laravel, React, Vue.js, full stack developer">
    
    {{-- Open Graph --}}
    <meta property="og:title" content="Portfolio | Charbel Malo">
    <meta property="og:description" content="Explore innovative web development projects and interactive experiences">
    <meta property="og:image" content="{{ asset('assets/img/portfolio-preview.jpg') }}">
    <meta property="og:type" content="website">
    
    {{-- Preload critical resources --}}
    @if(isset($criticalResources))
        @foreach($criticalResources['fonts'] ?? [] as $font)
            <link rel="preload" href="{{ asset($font) }}" as="font" type="font/woff2" crossorigin>
        @endforeach
        
        @foreach($criticalResources['images'] ?? [] as $image)
            <link rel="preload" href="{{ asset($image) }}" as="image">
        @endforeach
    @endif
@endsection

@section('structured-data')
    @if(isset($structuredData))
        <script type="application/ld+json">
            {!! json_encode($structuredData, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) !!}
        </script>
    @endif
@endsection

@section('content')
    {{-- Hero Section --}}
    <section class="portfolio-hero" data-animation="fade-in-up">
        <div class="hero-content">
            <h1 class="hero-title rainbow-text">
                Creative Portfolio
            </h1>
            <p class="hero-subtitle" data-animation="fade-in-up" data-delay="0.2">
                Discover innovative projects that blend cutting-edge technology with exceptional user experience
            </p>
            
            <div class="hero-stats" data-animation="fade-in-up" data-delay="0.4">
                <div class="stat-item sparkle">
                    <span class="stat-number">{{ count($items ?? []) }}+</span>
                    <span class="stat-label">Projects</span>
                </div>
                <div class="stat-item sparkle">
                    <span class="stat-number">3+</span>
                    <span class="stat-label">Years Experience</span>
                </div>
                <div class="stat-item sparkle">
                    <span class="stat-number">50+</span>
                    <span class="stat-label">Technologies</span>
                </div>
            </div>
        </div>
        
        <div class="hero-visual" data-animation="scale-in" data-delay="0.3">
            <div class="floating-elements">
                <div class="floating-element" style="--delay: 0s;">💻</div>
                <div class="floating-element" style="--delay: 0.5s;">🚀</div>
                <div class="floating-element" style="--delay: 1s;">⚡</div>
                <div class="floating-element" style="--delay: 1.5s;">🎨</div>
                <div class="floating-element" style="--delay: 2s;">🔧</div>
            </div>
        </div>
    </section>

    {{-- Interactive Dashboard --}}
    <section class="dashboard-section">
        @include('components.portfolio-dashboard', [
            'portfolioItems' => collect($items ?? [])->map(function($item, $key) {
                return array_merge($item, [
                    'id' => $key,
                    'url' => route('portfolio.' . $key),
                    'featured_image' => $item['featured_image'] ?? '/assets/img/projects/' . $key . '.jpg',
                    'technologies' => $item['technologies'] ?? ['Laravel', 'Vue.js', 'MySQL'],
                    'description' => $item['description'] ?? 'An innovative project showcasing modern web development practices.'
                ]);
            })->values()->toArray()
        ])
    </section>

    {{-- Featured Projects Showcase --}}
    <section class="featured-projects" data-animation="fade-in-up">
        <div class="container">
            <h2 class="section-title sparkle">Featured Projects</h2>
            <p class="section-subtitle">Highlighting the most impactful and innovative work</p>
            
            <div class="featured-grid">
                @foreach(($items ?? []) as $key => $project)
                    @if($loop->index < 4) {{-- Show only first 4 as featured --}}
                        <article class="featured-card" 
                                 data-animation="scale-in" 
                                 data-delay="{{ $loop->index * 0.1 }}"
                                 data-project="{{ $key }}">
                            
                            <div class="card-image-container">
                                <img src="{{ $project['featured_image'] ?? '/assets/img/projects/' . $key . '.jpg' }}" 
                                     alt="{{ $project['title'] }}"
                                     class="card-image sparkle"
                                     loading="lazy">
                                
                                <div class="card-overlay">
                                    <div class="overlay-content">
                                        <h3 class="project-title">{{ $project['title'] }}</h3>
                                        <p class="project-description">
                                            {{ $project['description'] ?? 'An innovative project showcasing modern development.' }}
                                        </p>
                                        
                                        <div class="project-technologies">
                                            @foreach($project['technologies'] ?? ['Web Dev', 'Design'] as $tech)
                                                <span class="tech-badge">{{ $tech }}</span>
                                            @endforeach
                                        </div>
                                        
                                        <div class="card-actions">
                                            <a href="{{ route('portfolio.' . $key) }}" 
                                               class="view-project-btn sparkle">
                                                <span>View Project</span>
                                                <svg viewBox="0 0 24 24" fill="none">
                                                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    @endif
                @endforeach
            </div>
        </div>
    </section>

    {{-- Technology Stack --}}
    <section class="tech-stack" data-animation="fade-in-up">
        <div class="container">
            <h2 class="section-title">Technology Stack</h2>
            <p class="section-subtitle">Tools and technologies I work with</p>
            
            <div class="tech-categories">
                <div class="tech-category" data-animation="scale-in" data-delay="0.1">
                    <h3 class="category-title rainbow-text">Frontend</h3>
                    <div class="tech-items">
                        <span class="tech-item sparkle">React</span>
                        <span class="tech-item sparkle">Vue.js</span>
                        <span class="tech-item sparkle">Three.js</span>
                        <span class="tech-item sparkle">GSAP</span>
                        <span class="tech-item sparkle">Tailwind CSS</span>
                    </div>
                </div>
                
                <div class="tech-category" data-animation="scale-in" data-delay="0.2">
                    <h3 class="category-title rainbow-text">Backend</h3>
                    <div class="tech-items">
                        <span class="tech-item sparkle">Laravel</span>
                        <span class="tech-item sparkle">Node.js</span>
                        <span class="tech-item sparkle">Python</span>
                        <span class="tech-item sparkle">PostgreSQL</span>
                        <span class="tech-item sparkle">Redis</span>
                    </div>
                </div>
                
                <div class="tech-category" data-animation="scale-in" data-delay="0.3">
                    <h3 class="category-title rainbow-text">Tools & Platforms</h3>
                    <div class="tech-items">
                        <span class="tech-item sparkle">Docker</span>
                        <span class="tech-item sparkle">AWS</span>
                        <span class="tech-item sparkle">Vite</span>
                        <span class="tech-item sparkle">Git</span>
                        <span class="tech-item sparkle">CI/CD</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- Call to Action --}}
    <section class="portfolio-cta" data-animation="fade-in-up">
        <div class="container">
            <div class="cta-content">
                <h2 class="cta-title sparkle">Ready to Build Something Amazing?</h2>
                <p class="cta-description">
                    Let's collaborate on your next project and create something extraordinary together.
                </p>
                
                <div class="cta-actions">
                    <a href="{{ route('contact') }}" class="primary-cta sparkle">
                        <span>Start a Project</span>
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </a>
                    
                    <a href="#featured-projects" class="secondary-cta">
                        <span>View More Work</span>
                    </a>
                </div>
            </div>
        </div>
    </section>
@endsection

@push('styles')
<style>
.portfolio-hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 4rem;
    padding: 0 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    position: relative;
    overflow: hidden;
}

.hero-content {
    max-width: 600px;
}

.hero-title {
    font-size: 4rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
    background-size: 300% 300%;
    animation: rainbow-gradient 4s ease-in-out infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero-subtitle {
    font-size: 1.25rem;
    line-height: 1.6;
    opacity: 0.9;
    margin-bottom: 3rem;
}

.hero-stats {
    display: flex;
    gap: 2rem;
}

.stat-item {
    text-align: center;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s var(--ease-out-expo);
}

.stat-item:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.15);
}

.stat-number {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.stat-label {
    font-size: 0.9rem;
    opacity: 0.8;
}

.hero-visual {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.floating-elements {
    position: relative;
    width: 300px;
    height: 300px;
}

.floating-element {
    position: absolute;
    font-size: 3rem;
    animation: float 6s ease-in-out infinite;
    animation-delay: var(--delay);
}

.floating-element:nth-child(1) { top: 10%; left: 20%; }
.floating-element:nth-child(2) { top: 20%; right: 10%; }
.floating-element:nth-child(3) { bottom: 30%; left: 10%; }
.floating-element:nth-child(4) { bottom: 20%; right: 20%; }
.floating-element:nth-child(5) { top: 50%; left: 50%; transform: translate(-50%, -50%); }

.dashboard-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

.featured-projects {
    padding: 6rem 0;
    background: #f8f9fa;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.section-title {
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.section-subtitle {
    text-align: center;
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 4rem;
}

.featured-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.featured-card {
    border-radius: 20px;
    overflow: hidden;
    background: white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.4s var(--ease-out-expo);
    position: relative;
    height: 400px;
}

.featured-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.card-image-container {
    position: relative;
    height: 100%;
    overflow: hidden;
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s var(--ease-out-expo);
}

.featured-card:hover .card-image {
    transform: scale(1.1);
}

.card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
    display: flex;
    align-items: flex-end;
    padding: 2rem;
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.featured-card:hover .card-overlay {
    opacity: 1;
}

.overlay-content h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
}

.project-description {
    margin-bottom: 1rem;
    line-height: 1.5;
    opacity: 0.9;
}

.project-technologies {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.tech-badge {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    backdrop-filter: blur(10px);
}

.view-project-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s var(--ease-out-expo);
}

.view-project-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.view-project-btn svg {
    width: 16px;
    height: 16px;
}

.tech-stack {
    padding: 6rem 0;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
}

.tech-categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
}

.tech-category {
    text-align: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.category-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
}

.tech-items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
}

.tech-item {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s var(--ease-out-expo);
    cursor: pointer;
}

.tech-item:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

.portfolio-cta {
    padding: 6rem 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
}

.cta-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
}

.cta-description {
    font-size: 1.2rem;
    opacity: 0.9;
    margin-bottom: 3rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.cta-actions {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
}

.primary-cta, .secondary-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
    transition: all 0.3s var(--ease-out-expo);
}

.primary-cta {
    background: white;
    color: #333;
}

.primary-cta:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
}

.secondary-cta {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
}

.secondary-cta:hover {
    background: rgba(255, 255, 255, 0.2);
}

.primary-cta svg, .secondary-cta svg {
    width: 20px;
    height: 20px;
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

@keyframes rainbow-gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

@media (max-width: 768px) {
    .portfolio-hero {
        grid-template-columns: 1fr;
        text-align: center;
        padding: 2rem 1rem;
    }
    
    .hero-title {
        font-size: 2.5rem;
    }
    
    .hero-stats {
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .featured-grid {
        grid-template-columns: 1fr;
    }
    
    .tech-categories {
        grid-template-columns: 1fr;
    }
    
    .cta-actions {
        flex-direction: column;
        align-items: center;
    }
}
</style>
@endpush
