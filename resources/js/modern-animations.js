/**
 * Modern Animation Manager
 * Optimized for performance with Intersection Observer and requestAnimationFrame
 */
class AnimationManager {
    constructor() {
        this.observers = new Map();
        this.animatedElements = new Set();
        this.rafId = null;
        this.isScrolling = false;
        
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollOptimization();
        this.bindEvents();
    }

    /**
     * Setup Intersection Observer for scroll-triggered animations
     */
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: [0, 0.1, 0.5, 1]
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const animationType = element.dataset.animation || 'fade-in-up';
                
                if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                    this.triggerAnimation(element, animationType);
                } else if (element.dataset.repeat === 'true') {
                    this.resetAnimation(element, animationType);
                }
            });
        }, options);

        this.observers.set('scroll', observer);
    }

    /**
     * Optimize scroll performance with throttling
     */
    setupScrollOptimization() {
        let scrollTimeout;
        
        const handleScroll = () => {
            if (!this.isScrolling) {
                this.isScrolling = true;
                document.body.classList.add('scrolling');
            }

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.isScrolling = false;
                document.body.classList.remove('scrolling');
                this.updateSparkleAnimations();
            }, 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    /**
     * Trigger animation with performance optimizations
     */
    triggerAnimation(element, type) {
        if (this.animatedElements.has(element)) return;

        // Use CSS custom properties for smooth transitions
        switch (type) {
            case 'sparkle':
                this.animateSparkle(element);
                break;
            case 'fade-in-up':
                element.classList.add('in-view');
                break;
            case 'scale-in':
            case 'scale':
                element.classList.add('in-view');
                break;
            case 'rainbow':
                this.animateRainbow(element);
                break;
            default:
                element.classList.add('in-view');
        }

        this.animatedElements.add(element);
    }

    /**
     * Reset animation for repeatable elements
     */
    resetAnimation(element, type) {
        element.classList.remove('in-view', 'animate-sparkle', 'animate-rainbow');
        this.animatedElements.delete(element);
    }

    /**
     * Optimized sparkle animation
     */
    animateSparkle(element) {
        element.classList.add('animate-sparkle');
        
        // Use CSS custom properties for smooth control
        element.style.setProperty('--sparkle-delay', Math.random() * 0.5 + 's');
    }

    /**
     * Performance-optimized rainbow animation
     */
    animateRainbow(element) {
        element.classList.add('animate-rainbow');
        
        // Stagger multiple rainbow elements
        const delay = Array.from(document.querySelectorAll('.rainbow-text')).indexOf(element) * 0.1;
        element.style.setProperty('--rainbow-delay', delay + 's');
    }

    /**
     * Update sparkle animations based on scroll position
     */
    updateSparkleAnimations() {
        if (this.rafId) return;

        this.rafId = requestAnimationFrame(() => {
            const sparkleElements = document.querySelectorAll('[data-animation="sparkle"]');
            const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);

            sparkleElements.forEach(element => {
                const elementProgress = this.getElementScrollProgress(element);
                
                if (elementProgress > 0.1 && elementProgress < 0.9) {
                    this.triggerAnimation(element, 'sparkle');
                }
            });

            this.rafId = null;
        });
    }

    /**
     * Calculate element's scroll progress
     */
    getElementScrollProgress(element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        const scrollProgress = (window.scrollY + windowHeight - elementTop) / 
                              (windowHeight + elementHeight);
        
        return Math.max(0, Math.min(1, scrollProgress));
    }

    /**
     * Auto-discover and register animated elements
     */
    registerElements() {
        // Register elements with data-animation attributes
        document.querySelectorAll('[data-animation]').forEach(element => {
            const animationType = element.dataset.animation;
            
            if (['sparkle', 'fade-in-up', 'scale-in', 'scale', 'rainbow'].includes(animationType)) {
                this.observers.get('scroll').observe(element);
            }
        });

        // Auto-register common animated classes
        document.querySelectorAll('.sparkle, .fade-in-up, .scale-in, .rainbow-text').forEach(element => {
            if (!element.dataset.animation) {
                if (element.classList.contains('sparkle')) element.dataset.animation = 'sparkle';
                if (element.classList.contains('fade-in-up')) element.dataset.animation = 'fade-in-up';
                if (element.classList.contains('scale-in')) element.dataset.animation = 'scale-in';
                if (element.classList.contains('rainbow-text')) element.dataset.animation = 'rainbow';
            }
            
            this.observers.get('scroll').observe(element);
        });
    }

    /**
     * Bind global events
     */
    bindEvents() {
        // Register elements when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.registerElements());
        } else {
            this.registerElements();
        }

        // Re-register elements after dynamic content changes
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Debounce to avoid excessive re-registration
                    clearTimeout(this.mutationTimeout);
                    this.mutationTimeout = setTimeout(() => this.registerElements(), 100);
                }
            });
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Destroy and cleanup
     */
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        this.animatedElements.clear();
        
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
    }
}

// Portfolio Navigation Enhancement
class PortfolioNavigation {
    constructor() {
        this.currentProject = null;
        this.projects = [];
        this.isLoading = false;
        
        this.init();
    }

    async init() {
        await this.loadPortfolioData();
        this.setupKeyboardNavigation();
        this.setupTouchNavigation();
    }

    async loadPortfolioData() {
        try {
            const response = await fetch('/api/portfolio');
            const data = await response.json();
            this.projects = data.items;
            
            // Set current project from URL or meta tag
            this.currentProject = this.getCurrentProjectFromUrl();
        } catch (error) {
            console.error('Failed to load portfolio data:', error);
        }
    }

    getCurrentProjectFromUrl() {
        const path = window.location.pathname;
        const match = path.match(/\/portfolio\/([^\/]+)/);
        return match ? match[1] : null;
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (this.isLoading) return;

            switch (e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    this.navigateToPrevious();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    this.navigateToNext();
                    break;
                case 'Escape':
                    this.navigateToIndex();
                    break;
            }
        });
    }

    setupTouchNavigation() {
        let startX = 0;
        let startY = 0;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (this.isLoading) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const deltaX = endX - startX;
            const deltaY = endY - startY;

            // Require minimum swipe distance
            if (Math.abs(deltaX) < 50 && Math.abs(deltaY) < 50) return;

            // Horizontal swipes for navigation
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    this.navigateToPrevious();
                } else {
                    this.navigateToNext();
                }
            }
        }, { passive: true });
    }

    async navigateToNext() {
        const navigation = await this.getNavigationData();
        if (navigation?.next) {
            this.navigateWithTransition(navigation.next.url);
        }
    }

    async navigateToPrevious() {
        const navigation = await this.getNavigationData();
        if (navigation?.prev) {
            this.navigateWithTransition(navigation.prev.url);
        }
    }

    navigateToIndex() {
        this.navigateWithTransition('/portfolio');
    }

    async getNavigationData() {
        if (!this.currentProject) return null;

        try {
            const response = await fetch(`/api/portfolio/${this.currentProject}/navigation`);
            return await response.json();
        } catch (error) {
            console.error('Failed to load navigation data:', error);
            return null;
        }
    }

    navigateWithTransition(url) {
        if (this.isLoading) return;

        this.isLoading = true;
        document.body.classList.add('page-transitioning');

        // Smooth transition effect
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    }
}

// Initialize when DOM is ready
const animationManager = new AnimationManager();
const portfolioNavigation = new PortfolioNavigation();

// Export for external use
window.AnimationManager = AnimationManager;
window.PortfolioNavigation = PortfolioNavigation;
