/**
 * Advanced Page Transition Manager with Barba.js
 * Optimized for performance and smooth integration with Three.js and shaders
 */
import barba from '@barba/core';
import { gsap } from 'gsap';

class PageTransitionManager {
    constructor() {
        this.isInitialized = false;
        this.transitionDuration = 0.8;
        this.currentNamespace = null;
        this.threeJSManager = null;
        this.shaderManager = null;
        
        // Performance optimization flags
        this.isTransitioning = false;
        this.preloadedPages = new Map();
        this.maxPreloadedPages = 3;
        
        // Prevent FOUC by hiding content initially
        this.preventFlash();
        
        this.init();
    }

    preventFlash() {
        // Add CSS to prevent flash of unstyled content
        const style = document.createElement('style');
        style.textContent = `
            /* AGGRESSIVE CONTENT HIDING - Hide everything by default */
            [data-barba="container"] {
                opacity: 0 !important;
                visibility: hidden !important;
                transition: none;
                will-change: opacity, transform;
                backface-visibility: hidden;
                transform: translateZ(0);
            }
            
            /* Hide ALL content inside containers including hero images */
            [data-barba="container"] *,
            [data-barba="container"] img,
            [data-barba="container"] picture,
            [data-barba="container"] video,
            .hero-section,
            .hero-image,
            .portfolio-hero,
            .project-hero {
                opacity: 0 !important;
                visibility: hidden !important;
            }
            
            .barba-ready [data-barba="container"],
            .barba-initialized [data-barba="container"] {
                opacity: 1 !important;
                visibility: visible !important;
                transition: opacity 0.3s ease-in-out;
            }
            
            .barba-ready [data-barba="container"] *,
            .barba-initialized [data-barba="container"] *,
            .barba-ready [data-barba="container"] img,
            .barba-initialized [data-barba="container"] img,
            .barba-ready [data-barba="container"] picture,
            .barba-initialized [data-barba="container"] picture,
            .barba-ready [data-barba="container"] video,
            .barba-initialized [data-barba="container"] video,
            .barba-ready .hero-section,
            .barba-initialized .hero-section,
            .barba-ready .hero-image,
            .barba-initialized .hero-image,
            .barba-ready .portfolio-hero,
            .barba-initialized .portfolio-hero,
            .barba-ready .project-hero,
            .barba-initialized .project-hero {
                opacity: 1 !important;
                visibility: visible !important;
            }
            
            .is-transitioning [data-barba="container"] {
                pointer-events: none;
            }

            .transition-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9));
                z-index: 999999;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.4s ease;
                backdrop-filter: blur(8px);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .transition-overlay::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 40px;
                height: 40px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-top: 2px solid rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                0% { transform: translate(-50%, -50%) rotate(0deg); }
                100% { transform: translate(-50%, -50%) rotate(360deg); }
            }

            .is-transitioning .transition-overlay {
                opacity: 1;
                pointer-events: auto;
            }
            
            /* CRITICAL: Force hide new content during transition */
            .is-transitioning [data-barba="container"]:not(.barba-current),
            .is-transitioning [data-barba="container"]:not(.barba-current) *,
            .is-transitioning [data-barba="container"]:not(.barba-current) img,
            .is-transitioning [data-barba="container"]:not(.barba-current) picture,
            .is-transitioning [data-barba="container"]:not(.barba-current) video {
                opacity: 0 !important;
                visibility: hidden !important;
                z-index: -1 !important;
            }
        `;
        document.head.appendChild(style);
        
        // Add transition overlay to body
        const overlay = document.createElement('div');
        overlay.className = 'transition-overlay';
        overlay.innerHTML = '<div class="transition-spinner"></div>';
        document.body.appendChild(overlay);
        
        // Mark as ready after ensuring styles are applied
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.documentElement.classList.add('barba-ready');
            });
        });
        
        // Failsafe: Always reveal content after 2 seconds maximum
        setTimeout(() => {
            const containers = document.querySelectorAll('[data-barba="container"]');
            containers.forEach(container => {
                if (container.style.opacity === '0' || getComputedStyle(container).opacity === '0') {
                    console.warn('⚠️ Force revealing hidden content (failsafe)');
                    container.style.opacity = '1';
                    container.style.transition = 'opacity 0.3s ease-in-out';
                }
            });
            document.documentElement.classList.add('barba-ready', 'barba-initialized');
        }, 2000);
    }

    init() {
        if (this.isInitialized) return;
        
        // Wait for DOM to be ready before initializing Barba.js
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeBarba();
            });
        } else {
            this.initializeBarba();
        }
        
        this.isInitialized = true;
        console.log('PageTransitionManager initialized with Barba.js');
    }

    initializeBarba() {
        // Check if container exists before initializing
        const barbaContainer = document.querySelector('[data-barba="container"]');
        if (!barbaContainer) {
            console.warn('Barba container not found. Revealing content anyway.');
            this.revealContent();
            return;
        }

        try {
            // Initialize Barba.js with optimized settings
            barba.init({
                timeout: 10000,
                cacheIgnore: ['/wp-admin/', '/wp-login.php'],
                debug: process.env.NODE_ENV === 'development',
                preventRunning: true,
                sync: true,
                transitions: [
                    this.createDefaultTransition(),
                    this.createProjectTransition(),
                    this.createPortfolioTransition()
                ]
            });

            this.setupHooks();
            this.setupPreventElements();
            this.optimizeScrollBehavior();
            
            // Show content now that Barba.js is ready
            this.revealContent();
            
            console.log('🚀 Barba.js initialized successfully');
        } catch (error) {
            console.error('❌ Barba.js initialization failed:', error);
            // Fallback: reveal content anyway
            this.revealContent();
        }
    }

    revealContent() {
        // Smoothly reveal the content
        requestAnimationFrame(() => {
            document.documentElement.classList.add('barba-initialized');
            
            // Force reveal all containers
            const containers = document.querySelectorAll('[data-barba="container"]');
            containers.forEach(container => {
                container.style.opacity = '1';
                container.style.transition = 'opacity 0.3s ease-in-out';
            });
            
            // Also ensure body content is visible
            document.body.style.opacity = '1';
            
            console.log('✅ Content revealed - Barba.js ready');
        });
    }

    createDefaultTransition() {
        return {
            name: 'default-transition',
            leave: (data) => this.performLeaveTransition(data),
            enter: (data) => this.performEnterTransition(data),
            beforeEnter: (data) => this.beforeEnterHook(data),
            afterEnter: (data) => this.afterEnterHook(data)
        };
    }

    createProjectTransition() {
        return {
            name: 'project-transition',
            from: {
                custom: ({ trigger }) => {
                    return trigger.classList && trigger.classList.contains('project-link');
                }
            },
            leave: (data) => this.performProjectLeaveTransition(data),
            enter: (data) => this.performProjectEnterTransition(data)
        };
    }

    createPortfolioTransition() {
        return {
            name: 'portfolio-transition',
            to: {
                namespace: 'portfolio'
            },
            leave: (data) => this.performPortfolioLeaveTransition(data),
            enter: (data) => this.performPortfolioEnterTransition(data)
        };
    }

    performLeaveTransition(data) {
        return new Promise((resolve) => {
            this.isTransitioning = true;
            document.body.classList.add('is-transitioning');
            
            // CRITICAL: Hide the destination page immediately to prevent bleeding through
            if (data.next && data.next.container) {
                gsap.set(data.next.container, {
                    opacity: 0,
                    visibility: 'hidden',
                    zIndex: -1,
                    position: 'absolute',
                    pointerEvents: 'none'
                });
            }
            
            // Set current page layering
            gsap.set(data.current.container, {
                zIndex: 10,
                position: 'relative',
                opacity: 1
            });
            
            const tl = gsap.timeline({
                onComplete: () => {
                    this.cleanupCurrentPage();
                    console.log('🎬 Leave transition complete');
                    resolve();
                }
            });

            // Smooth fade out with slight scale for depth
            tl.to(data.current.container, {
                opacity: 0,
                scale: 0.95,
                duration: this.transitionDuration * 0.5,
                ease: "power2.inOut"
            });

            // Animate Three.js scenes if present
            if (this.threeJSManager) {
                tl.to(this.threeJSManager.renderer.domElement, {
                    opacity: 0,
                    scale: 0.95,
                    duration: this.transitionDuration * 0.4,
                    ease: "power2.out"
                }, 0);
            }

            // Add shader transition effects
            this.addShaderLeaveEffects(tl);
        });
    }

    performEnterTransition(data) {
        return new Promise((resolve) => {
            console.log('🎬 Starting enter transition');
            
            // CRITICAL: Keep new content completely hidden until we're ready
            gsap.set(data.next.container, {
                opacity: 0,
                scale: 1.05,
                zIndex: 1,
                position: 'relative',
                visibility: 'visible',
                pointerEvents: 'auto'
            });

            const tl = gsap.timeline({
                onComplete: () => {
                    // Reset positioning after transition
                    gsap.set(data.next.container, {
                        zIndex: 'auto',
                        position: 'static',
                        scale: 1,
                        clearProps: 'all'
                    });
                    
                    document.body.classList.remove('is-transitioning');
                    this.isTransitioning = false;
                    console.log('🎬 Enter transition complete');
                    resolve();
                }
            });

            // IMPORTANT: Add a longer delay to ensure leave transition is completely done
            tl.to(data.next.container, {
                opacity: 1,
                scale: 1,
                duration: this.transitionDuration * 0.6,
                ease: "power2.out",
                delay: this.transitionDuration * 0.4  // Increased delay
            });

            // Reinitialize Three.js if needed
            this.reinitializeThreeJS(data.next.namespace, tl);
            
            // Add shader enter effects
            this.addShaderEnterEffects(tl, data.next.namespace);
        });
    }

    performProjectLeaveTransition(data) {
        return new Promise((resolve) => {
            const projectId = data.trigger.dataset.id;
            const projectImage = document.querySelector(`.project__image__${projectId}`);
            
            const tl = gsap.timeline({
                onComplete: resolve
            });

            if (projectImage) {
                // Create a morphing effect from project thumbnail to full view
                tl.to(projectImage, {
                    scale: 1.2,
                    z: 100,
                    duration: this.transitionDuration,
                    ease: "power2.inOut"
                });
            }

            // Add custom shader effect for project transition
            if (this.shaderManager) {
                const material = this.shaderManager.createMaterial('glitch', {
                    glitchIntensity: { value: 0.8 },
                    noiseScale: { value: 30.0 }
                });
                
                tl.to(material.uniforms.glitchIntensity, {
                    value: 0,
                    duration: this.transitionDuration,
                    ease: "power2.out"
                }, 0);
            }

            this.performLeaveTransition(data);
        });
    }

    performProjectEnterTransition(data) {
        // Enhanced project enter transition with Three.js integration
        return this.performEnterTransition(data);
    }

    performPortfolioLeaveTransition(data) {
        return new Promise((resolve) => {
            // Special portfolio leave transition with particle effects
            const tl = gsap.timeline({ onComplete: resolve });
            
            // Animate portfolio items out with stagger
            const portfolioItems = data.current.container.querySelectorAll('.portfolio-item');
            
            tl.staggerTo(portfolioItems, 0.3, {
                opacity: 0,
                y: -30,
                rotationX: 45,
                transformOrigin: "center bottom",
                ease: "power2.in"
            }, 0.05);

            // Add particle dispersion effect if Three.js is active
            if (this.threeJSManager && this.threeJSManager.particleSystem) {
                tl.to(this.threeJSManager.particleSystem.material.uniforms.opacity, {
                    value: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, 0);
            }
        });
    }

    performPortfolioEnterTransition(data) {
        return new Promise((resolve) => {
            const portfolioItems = data.next.container.querySelectorAll('.portfolio-item');
            
            // Set initial state
            gsap.set(portfolioItems, {
                opacity: 0,
                y: 50,
                rotationX: -45
            });

            const tl = gsap.timeline({ onComplete: resolve });
            
            tl.staggerTo(portfolioItems, 0.4, {
                opacity: 1,
                y: 0,
                rotationX: 0,
                ease: "back.out(1.7)"
            }, 0.08, 0.3);

            // Reinitialize portfolio Three.js effects
            this.initializePortfolioEffects(tl);
        });
    }

    addShaderLeaveEffects(timeline) {
        if (!this.shaderManager) return;

        // Apply glitch effect during transition
        const glitchMaterial = this.shaderManager.createMaterial('glitch', {
            glitchIntensity: { value: 0 },
            noiseScale: { value: 50.0 }
        });

        timeline.to(glitchMaterial.uniforms.glitchIntensity, {
            value: 1.0,
            duration: this.transitionDuration * 0.3,
            ease: "power2.in"
        }, 0);

        timeline.to(glitchMaterial.uniforms.glitchIntensity, {
            value: 0,
            duration: this.transitionDuration * 0.4,
            ease: "power2.out"
        }, this.transitionDuration * 0.3);
    }

    addShaderEnterEffects(timeline, namespace) {
        if (!this.shaderManager) return;

        // Create namespace-specific shader effects
        let effectType = 'holographic';
        
        switch (namespace) {
            case 'portfolio':
                effectType = 'energyField';
                break;
            case 'project':
                effectType = 'digitalRain';
                break;
            case 'about':
                effectType = 'holographic';
                break;
        }

        const material = this.shaderManager.createMaterial(effectType, {
            opacity: { value: 0 }
        });

        timeline.to(material.uniforms.opacity, {
            value: 1.0,
            duration: this.transitionDuration * 0.6,
            ease: "power2.out"
        }, this.transitionDuration * 0.2);
    }

    setupHooks() {
        // Optimized hooks for performance
        barba.hooks.before((data) => {
            document.documentElement.classList.add('is-transitioning');
            this.disableInteractions();
            this.preloadAssets(data.next.url);
        });

        barba.hooks.beforeEnter((data) => {
            this.updateBodyClasses(data);
            this.updateMetaTags(data);
        });

        barba.hooks.afterEnter((data) => {
            this.reinitializeComponents(data);
            this.updateAnalytics(data);
        });

        barba.hooks.after((data) => {
            document.documentElement.classList.remove('is-transitioning');
            this.enableInteractions();
            this.optimizePerformance();
            
            // Clean up old preloaded pages
            this.cleanupPreloadedPages();
        });
    }

    setupPreventElements() {
        // Prevent Barba.js on specific elements for better UX
        const preventSelectors = [
            '.wp-admin',
            '.elementor-editor-active',
            '[data-barba-prevent]',
            '.external-link',
            '.download-link',
            '.mailto-link',
            '.tel-link',
            'a[href^="#"]',
            'a[href^="mailto:"]',
            'a[href^="tel:"]',
            'a[target="_blank"]'
        ];

        preventSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.setAttribute('data-barba-prevent', 'all');
            });
        });
    }

    beforeEnterHook(data) {
        console.log('🎬 Before enter hook - preparing new page');
        
        // CRITICAL: Ensure new content is completely hidden
        if (data.next && data.next.container) {
            gsap.set(data.next.container, {
                opacity: 0,
                visibility: 'hidden',
                zIndex: -1,
                position: 'absolute',
                pointerEvents: 'none'
            });
        }
        
        // Scroll to top optimized for performance
        if (window.scrollTo) {
            window.scrollTo(0, 0);
        }
        
        // Update current namespace
        this.currentNamespace = data.next.namespace;
        
        // Update body classes for new page
        this.updateBodyClasses(data);
    }

    afterEnterHook(data) {
        console.log('🎬 After enter hook - finalizing page');
        
        // Mark transition as complete
        document.body.classList.add('transition-complete');
        
        // Ensure new content is fully visible and interactive
        if (data.current && data.current.container) {
            gsap.set(data.current.container, {
                opacity: 1,
                visibility: 'visible',
                zIndex: 'auto',
                position: 'static',
                pointerEvents: 'auto',
                clearProps: 'all'
            });
        }
        
        // Reinitialize page-specific functionality
        this.reinitializePageScripts();
        this.updatePageTitle(data);
        this.trackPageView(data);
        
        // Clean up transition classes
        setTimeout(() => {
            document.body.classList.remove('transition-complete');
        }, 100);
    }

    reinitializeThreeJS(namespace, timeline) {
        if (!this.threeJSManager) return;

        // Smoothly transition Three.js scenes based on page type
        timeline.call(() => {
            this.threeJSManager.switchScene(namespace);
        }, null, this.transitionDuration * 0.5);

        timeline.to(this.threeJSManager.renderer.domElement, {
            opacity: 1,
            scale: 1,
            duration: this.transitionDuration * 0.5,
            ease: "power2.out"
        }, this.transitionDuration * 0.5);
    }

    initializePortfolioEffects(timeline) {
        if (!this.threeJSManager) return;

        timeline.call(() => {
            // Initialize portfolio-specific Three.js effects
            this.threeJSManager.initializePortfolioScene();
            
            if (this.shaderManager) {
                // Add energy field effects to portfolio items
                const portfolioItems = document.querySelectorAll('.portfolio-item');
                portfolioItems.forEach((item, index) => {
                    const projectType = item.dataset.projectType || 'default';
                    const geometry = new THREE.PlaneGeometry(1, 1);
                    const mesh = this.shaderManager.createPortfolioItemEffect(geometry, projectType);
                    
                    // Position and add to scene
                    mesh.position.set(index * 2 - portfolioItems.length, 0, 0);
                    this.threeJSManager.scene.add(mesh);
                });
            }
        }, null, 0.2);
    }

    updateBodyClasses(data) {
        // Efficiently update body classes
        const newDoc = new DOMParser().parseFromString(data.next.html, 'text/html');
        const newBodyClasses = Array.from(newDoc.body.classList);
        
        // Clear old page-specific classes
        document.body.className = document.body.className
            .split(' ')
            .filter(cls => !cls.startsWith('page-') && !cls.startsWith('postid-'))
            .join(' ');
        
        // Add new classes
        newBodyClasses.forEach(cls => {
            if (cls.startsWith('page-') || cls.startsWith('postid-')) {
                document.body.classList.add(cls);
            }
        });
    }

    updateMetaTags(data) {
        // Update meta tags for SEO and social sharing
        const newDoc = new DOMParser().parseFromString(data.next.html, 'text/html');
        const metaSelectors = [
            'meta[name="description"]',
            'meta[property^="og:"]',
            'meta[name^="twitter:"]',
            'link[rel="canonical"]'
        ];

        metaSelectors.forEach(selector => {
            const newMeta = newDoc.querySelector(selector);
            const currentMeta = document.querySelector(selector);
            
            if (newMeta && currentMeta) {
                currentMeta.setAttribute('content', newMeta.getAttribute('content'));
            } else if (newMeta && !currentMeta) {
                document.head.appendChild(newMeta.cloneNode(true));
            }
        });
    }

    preloadAssets(url) {
        // Intelligent asset preloading
        if (this.preloadedPages.has(url)) return;

        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
        
        this.preloadedPages.set(url, Date.now());
    }

    cleanupPreloadedPages() {
        // Remove old preloaded pages to manage memory
        const now = Date.now();
        const maxAge = 5 * 60 * 1000; // 5 minutes
        
        for (const [url, timestamp] of this.preloadedPages.entries()) {
            if (now - timestamp > maxAge || this.preloadedPages.size > this.maxPreloadedPages) {
                this.preloadedPages.delete(url);
                
                // Remove prefetch link
                const prefetchLink = document.querySelector(`link[rel="prefetch"][href="${url}"]`);
                if (prefetchLink) {
                    prefetchLink.remove();
                }
            }
        }
    }

    optimizeScrollBehavior() {
        // Disable automatic scroll restoration for better control
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
    }

    disableInteractions() {
        // Prevent user interactions during transitions
        document.body.style.pointerEvents = 'none';
    }

    enableInteractions() {
        // Re-enable interactions after transition
        document.body.style.pointerEvents = 'auto';
    }

    reinitializeComponents(data) {
        // Reinitialize page-specific components
        if (typeof window.initializePageComponents === 'function') {
            window.initializePageComponents(data.next.namespace);
        }
    }

    cleanupCurrentPage() {
        // Clean up current page resources
        if (this.threeJSManager) {
            this.threeJSManager.cleanup();
        }
        
        if (this.shaderManager) {
            // Dispose old shader materials to prevent memory leaks
            this.shaderManager.materials.forEach(material => {
                if (material.uniforms) {
                    Object.values(material.uniforms).forEach(uniform => {
                        if (uniform.value && uniform.value.dispose) {
                            uniform.value.dispose();
                        }
                    });
                }
            });
        }
    }

    reinitializePageScripts() {
        // Reinitialize page-specific scripts
        if (typeof window.pageScripts === 'function') {
            window.pageScripts();
        }
    }

    updatePageTitle(data) {
        // Update page title
        const newDoc = new DOMParser().parseFromString(data.next.html, 'text/html');
        const newTitle = newDoc.querySelector('title');
        if (newTitle) {
            document.title = newTitle.textContent;
        }
    }

    trackPageView(data) {
        // Track page views for analytics
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_TRACKING_ID', {
                page_title: document.title,
                page_location: data.next.url
            });
        }
    }

    updateAnalytics(data) {
        // Update analytics tracking
        if (typeof window.dataLayer !== 'undefined') {
            window.dataLayer.push({
                event: 'page_view',
                page_title: document.title,
                page_location: data.next.url,
                page_namespace: data.next.namespace
            });
        }
    }

    optimizePerformance() {
        // Performance optimizations after page load
        requestIdleCallback(() => {
            // Cleanup unused resources
            if (window.gc && typeof window.gc === 'function') {
                window.gc();
            }
        });
    }

    // Public methods for external integration
    setThreeJSManager(manager) {
        this.threeJSManager = manager;
    }

    setShaderManager(manager) {
        this.shaderManager = manager;
    }

    destroy() {
        if (barba) {
            barba.destroy();
        }
        this.isInitialized = false;
        this.preloadedPages.clear();
    }
}

// Export for use in other modules
export default PageTransitionManager;
