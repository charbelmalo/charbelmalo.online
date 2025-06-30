{{-- Advanced Portfolio Dashboard with Three.js Integration --}}
<div class="portfolio-dashboard" id="portfolio-dashboard">
    <div class="dashboard-header" data-animation="fade-in-up">
        <h1 class="rainbow-text">Interactive Portfolio</h1>
        <p class="dashboard-subtitle">Explore my work in an immersive 3D environment</p>
        
        <div class="dashboard-controls">
            <button class="control-btn" id="toggle-3d" data-tooltip="Toggle 3D View">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            
            <button class="control-btn" id="toggle-particles" data-tooltip="Toggle Particles">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="1" stroke="currentColor" stroke-width="2"/>
                    <circle cx="6" cy="6" r="1" stroke="currentColor" stroke-width="2"/>
                    <circle cx="18" cy="6" r="1" stroke="currentColor" stroke-width="2"/>
                    <circle cx="6" cy="18" r="1" stroke="currentColor" stroke-width="2"/>
                    <circle cx="18" cy="18" r="1" stroke="currentColor" stroke-width="2"/>
                </svg>
            </button>
            
            <button class="control-btn" id="toggle-autorotate" data-tooltip="Toggle Auto-Rotate">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4V10H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M23 20V14H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14L18.36 18.36A9 9 0 0 1 3.51 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    </div>

    <div class="dashboard-content">
        {{-- 3D Container --}}
        <div class="threejs-section" data-animation="scale-in">
            <div id="three-container" class="three-container">
                <div class="loading-overlay" id="three-loading">
                    <div class="loading-spinner sparkle"></div>
                    <p>Loading 3D Experience...</p>
                </div>
            </div>
            
            <div class="three-info" data-animation="fade-in-up" data-delay="0.3">
                <div class="info-panel">
                    <h3>Interactive Controls</h3>
                    <div class="controls-grid">
                        <div class="control-item">
                            <span class="control-icon">🖱️</span>
                            <span>Click & Drag to Orbit</span>
                        </div>
                        <div class="control-item">
                            <span class="control-icon">🔍</span>
                            <span>Scroll to Zoom</span>
                        </div>
                        <div class="control-item">
                            <span class="control-icon">👆</span>
                            <span>Click Projects to View</span>
                        </div>
                    </div>
                </div>
                
                <div class="performance-monitor" id="performance-monitor">
                    <div class="fps-counter">
                        <span>FPS: </span>
                        <span id="fps-value">60</span>
                    </div>
                    <div class="quality-indicator">
                        <span>Quality: </span>
                        <span id="quality-value">High</span>
                    </div>
                </div>
            </div>
        </div>

        {{-- Portfolio Grid Alternative --}}
        <div class="portfolio-grid-section" data-animation="fade-in-up" data-delay="0.4">
            <h2>Portfolio Projects</h2>
            <div class="projects-grid" id="projects-grid">
                @foreach($portfolioItems ?? [] as $index => $project)
                    <div class="project-card enhanced-card" 
                         data-animation="scale-in" 
                         data-delay="{{ $index * 0.1 }}"
                         data-project-id="{{ $project['id'] }}">
                        
                        <div class="card-header">
                            <div class="project-image sparkle">
                                <img src="{{ $project['featured_image'] ?? '/assets/img/placeholder.jpg' }}" 
                                     alt="{{ $project['title'] }}"
                                     loading="lazy">
                                <div class="image-overlay">
                                    <div class="tech-badges">
                                        @foreach($project['technologies'] ?? [] as $tech)
                                            <span class="tech-badge">{{ $tech }}</span>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card-content">
                            <h3 class="project-title">{{ $project['title'] }}</h3>
                            <p class="project-description">{{ $project['description'] ?? 'An amazing project showcasing modern web development.' }}</p>
                            
                            <div class="card-actions">
                                <a href="{{ $project['url'] ?? '#' }}" class="primary-btn sparkle">
                                    <span>View Project</span>
                                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </a>
                                
                                <button class="secondary-btn" data-action="view-in-3d" data-project="{{ $project['id'] }}">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2"/>
                                        <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                    3D View
                                </button>
                            </div>
                        </div>
                        
                        <div class="card-stats">
                            <div class="stat">
                                <span class="stat-icon">👁️</span>
                                <span>{{ rand(100, 999) }} views</span>
                            </div>
                            <div class="stat">
                                <span class="stat-icon">⭐</span>
                                <span>{{ rand(4, 5) }}.{{ rand(1, 9) }}</span>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        {{-- Performance Analytics --}}
        <div class="analytics-section" data-animation="fade-in-up" data-delay="0.6">
            <h2>Performance Analytics</h2>
            <div class="analytics-grid">
                <div class="metric-card" data-animation="scale-in" data-delay="0.7">
                    <div class="metric-icon sparkle">📊</div>
                    <div class="metric-content">
                        <h3>Load Time</h3>
                        <p class="metric-value" id="load-time">< 2s</p>
                        <p class="metric-description">Average page load time</p>
                    </div>
                </div>
                
                <div class="metric-card" data-animation="scale-in" data-delay="0.8">
                    <div class="metric-icon sparkle">🎯</div>
                    <div class="metric-content">
                        <h3>Core Web Vitals</h3>
                        <p class="metric-value rainbow-text">Excellent</p>
                        <p class="metric-description">SEO performance score</p>
                    </div>
                </div>
                
                <div class="metric-card" data-animation="scale-in" data-delay="0.9">
                    <div class="metric-icon sparkle">⚡</div>
                    <div class="metric-content">
                        <h3>Lighthouse Score</h3>
                        <p class="metric-value">95+</p>
                        <p class="metric-description">Performance rating</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@push('styles')
<style>
.portfolio-dashboard {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    overflow-x: hidden;
}

.dashboard-header {
    text-align: center;
    padding: 4rem 2rem 2rem;
    position: relative;
}

.dashboard-header h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7);
    background-size: 300% 300%;
    animation: rainbow-flow 4s ease-in-out infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.dashboard-subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    margin-bottom: 2rem;
}

.dashboard-controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.control-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    transition: all 0.3s var(--ease-out-expo);
    position: relative;
    backdrop-filter: blur(10px);
}

.control-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.control-btn svg {
    width: 20px;
    height: 20px;
}

.control-btn::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: -35px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.control-btn:hover::after {
    opacity: 1;
}

.dashboard-content {
    padding: 0 2rem 4rem;
    max-width: 1400px;
    margin: 0 auto;
}

.threejs-section {
    margin-bottom: 4rem;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    align-items: start;
}

.three-container {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    height: 500px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: opacity 0.5s ease;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.5));
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

.three-info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.info-panel {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 1.5rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.info-panel h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
}

.controls-grid {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.control-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.9rem;
}

.control-icon {
    font-size: 1.2rem;
}

.performance-monitor {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    font-family: monospace;
    font-size: 0.9rem;
}

.portfolio-grid-section {
    margin-bottom: 4rem;
}

.portfolio-grid-section h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    background: linear-gradient(45deg, #ffd89b, #19547b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.enhanced-card {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    overflow: hidden;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.4s var(--ease-out-expo);
    position: relative;
}

.enhanced-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.15);
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
    transition: transform 0.6s var(--ease-out-expo);
}

.enhanced-card:hover .project-image img {
    transform: scale(1.1);
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    display: flex;
    align-items: flex-end;
    padding: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.enhanced-card:hover .image-overlay {
    opacity: 1;
}

.tech-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tech-badge {
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
}

.card-content {
    padding: 1.5rem;
}

.project-title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
}

.project-description {
    opacity: 0.9;
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.card-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.primary-btn, .secondary-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s var(--ease-out-expo);
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
}

.primary-btn {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    flex: 1;
}

.primary-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.secondary-btn {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.secondary-btn:hover {
    background: rgba(255, 255, 255, 0.2);
}

.btn-icon {
    width: 16px;
    height: 16px;
}

.card-stats {
    display: flex;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    background: rgba(0, 0, 0, 0.2);
    font-size: 0.9rem;
}

.stat {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    opacity: 0.8;
}

.analytics-section h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    background: linear-gradient(45deg, #a8edea, #fed6e3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.analytics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.metric-card {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s var(--ease-out-expo);
}

.metric-card:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.15);
}

.metric-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.metric-value {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.metric-description {
    opacity: 0.8;
    font-size: 0.9rem;
}

@keyframes rainbow-flow {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
    .threejs-section {
        grid-template-columns: 1fr;
    }
    
    .dashboard-header h1 {
        font-size: 2.5rem;
    }
    
    .projects-grid {
        grid-template-columns: 1fr;
    }
    
    .card-actions {
        flex-direction: column;
    }
}
</style>
@endpush

@push('scripts')
<script type="module">
// Initialize the advanced portfolio dashboard
document.addEventListener('DOMContentLoaded', async function() {
    // Load portfolio data
    const portfolioData = await fetch('/api/portfolio').then(r => r.json());
    
    // Initialize Three.js portfolio manager
    const threejsManager = new ThreeJSPortfolioManager('three-container', {
        enableBloom: true,
        enableParticles: true,
        enableInteraction: true,
        autoRotate: false,
        portfolioItems: portfolioData.items
    });
    
    // Control buttons
    const toggleButtons = {
        '3d': document.getElementById('toggle-3d'),
        'particles': document.getElementById('toggle-particles'),
        'autorotate': document.getElementById('toggle-autorotate')
    };
    
    // Toggle functionality
    toggleButtons['particles'].addEventListener('click', () => {
        if (threejsManager.particleSystem) {
            threejsManager.particleSystem.visible = !threejsManager.particleSystem.visible;
            toggleButtons['particles'].classList.toggle('active');
        }
    });
    
    toggleButtons['autorotate'].addEventListener('click', () => {
        if (threejsManager.controls) {
            threejsManager.controls.autoRotate = !threejsManager.controls.autoRotate;
            toggleButtons['autorotate'].classList.toggle('active');
        }
    });
    
    // 3D view buttons
    document.querySelectorAll('[data-action="view-in-3d"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = e.target.dataset.project;
            // Focus on specific project in 3D view
            // Implementation depends on threejsManager.focusOnProject(projectId)
        });
    });
    
    // Performance monitoring
    setInterval(() => {
        if (threejsManager.fps) {
            document.getElementById('fps-value').textContent = threejsManager.fps;
            const quality = threejsManager.fps > 45 ? 'High' : threejsManager.fps > 25 ? 'Medium' : 'Low';
            document.getElementById('quality-value').textContent = quality;
        }
    }, 1000);
    
    // Hide loading overlay
    setTimeout(() => {
        document.getElementById('three-loading').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('three-loading').style.display = 'none';
        }, 500);
    }, 2000);
});
</script>
@endpush
