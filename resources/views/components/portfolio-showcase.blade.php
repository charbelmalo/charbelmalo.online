{{-- Enhanced Portfolio Showcase Component --}}
<div class="portfolio-showcase" data-animation="fade-in-up">
    <div class="showcase-header">
        <h2 class="rainbow-text" data-animation="rainbow">
            {{ $title ?? 'Portfolio Showcase' }}
        </h2>
        <p class="showcase-description" data-animation="fade-in-up" data-delay="0.2">
            Explore my latest projects with enhanced performance and modern animations
        </p>
    </div>

    <div class="showcase-grid">
        @forelse($projects ?? [] as $project)
            <div class="project-card sparkle" 
                 data-animation="scale-in" 
                 data-delay="{{ $loop->index * 0.1 }}"
                 data-project="{{ $project['id'] }}">
                
                <div class="project-image">
                    <img src="{{ $project['featured_image'] }}" 
                         alt="{{ $project['title'] }}"
                         loading="lazy"
                         data-animation="sparkle">
                </div>
                
                <div class="project-content">
                    <h3 class="project-title">{{ $project['title'] }}</h3>
                    <p class="project-description">{{ $project['description'] }}</p>
                    
                    <div class="project-technologies">
                        @foreach($project['technologies'] as $tech)
                            <span class="tech-badge" data-animation="fade-in-up" data-delay="{{ $loop->index * 0.05 }}">
                                {{ $tech }}
                            </span>
                        @endforeach
                    </div>
                    
                    <a href="{{ $project['url'] }}" 
                       class="project-link"
                       data-animation="sparkle">
                        View Project
                        <svg class="link-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                </div>
            </div>
        @empty
            <div class="no-projects" data-animation="fade-in-up">
                <p>No projects available at the moment.</p>
            </div>
        @endforelse
    </div>

    {{-- Navigation hints for keyboard users --}}
    <div class="navigation-hints" data-animation="fade-in-up" data-delay="0.5">
        <div class="hint">
            <kbd>←</kbd><kbd>→</kbd>
            <span>Navigate between projects</span>
        </div>
        <div class="hint">
            <kbd>ESC</kbd>
            <span>Return to portfolio</span>
        </div>
    </div>
</div>

@push('styles')
<style>
.portfolio-showcase {
    padding: 2rem 0;
    max-width: 1200px;
    margin: 0 auto;
}

.showcase-header {
    text-align: center;
    margin-bottom: 3rem;
}

.showcase-description {
    font-size: 1.1rem;
    color: var(--text-color-secondary, #666);
    max-width: 600px;
    margin: 1rem auto 0;
}

.showcase-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.project-card {
    background: var(--card-background, #fff);
    border-radius: var(--border-radius-lg, 16px);
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: 
        transform var(--animation-duration-normal) var(--ease-out-expo),
        box-shadow var(--animation-duration-normal) var(--ease-out-expo);
    cursor: pointer;
}

.project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.project-image {
    position: relative;
    height: 200px;
    overflow: hidden;
}

.project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--animation-duration-slow) var(--ease-out-expo);
}

.project-card:hover .project-image img {
    transform: scale(1.05);
}

.project-content {
    padding: 1.5rem;
}

.project-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-color-primary, #333);
}

.project-description {
    color: var(--text-color-secondary, #666);
    margin-bottom: 1rem;
    line-height: 1.6;
}

.project-technologies {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.tech-badge {
    background: var(--accent-color, #007bff);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: var(--border-radius-sm, 4px);
    font-size: 0.875rem;
    font-weight: 500;
}

.project-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary-color, #007bff);
    text-decoration: none;
    font-weight: 500;
    transition: color var(--animation-duration-normal) var(--ease-out-expo);
}

.project-link:hover {
    color: var(--primary-color-dark, #0056b3);
}

.link-arrow {
    width: 16px;
    height: 16px;
    transition: transform var(--animation-duration-normal) var(--ease-out-expo);
}

.project-link:hover .link-arrow {
    transform: translate(2px, -2px);
}

.navigation-hints {
    display: flex;
    justify-content: center;
    gap: 2rem;
    padding: 1rem;
    background: var(--background-subtle, #f8f9fa);
    border-radius: var(--border-radius-md, 8px);
}

.hint {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-color-secondary, #666);
}

.hint kbd {
    background: var(--kbd-background, #e9ecef);
    border: 1px solid var(--kbd-border, #ced4da);
    border-radius: 3px;
    padding: 0.2rem 0.4rem;
    font-size: 0.75rem;
    font-family: monospace;
}

.no-projects {
    grid-column: 1 / -1;
    text-align: center;
    padding: 3rem;
    color: var(--text-color-secondary, #666);
}

@media (max-width: 768px) {
    .showcase-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .navigation-hints {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
}
</style>
@endpush
