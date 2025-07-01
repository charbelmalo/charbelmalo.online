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
        
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
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
        
        this.isInitialized = true;
        console.log('PageTransitionManager initialized with Barba.js');
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
            
            const tl = gsap.timeline({
                onComplete: () => {
                    this.cleanupCurrentPage();
                    resolve();
                }
            });

            // Fade out current content with optimized timing
            tl.to(data.current.container, {
                opacity: 0,
                y: -50,
                duration: this.transitionDuration * 0.6,
                ease: "power2.inOut"
            });

            // Animate Three.js scenes if present
            if (this.threeJSManager) {
                tl.to(this.threeJSManager.renderer.domElement, {
                    opacity: 0,
                    scale: 0.9,
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
            // Set initial state for new content
            gsap.set(data.next.container, {
                opacity: 0,
                y: 50
            });

            const tl = gsap.timeline({
                onComplete: () => {
                    this.isTransitioning = false;
                    resolve();
                }
            });

            // Animate in new content
            tl.to(data.next.container, {
                opacity: 1,
                y: 0,
                duration: this.transitionDuration * 0.7,
                ease: "power2.out",
                delay: this.transitionDuration * 0.3
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
        // Scroll to top optimized for performance
        if (window.scrollTo) {
            window.scrollTo(0, 0);
        }
        
        // Update current namespace
        this.currentNamespace = data.next.namespace;
    }

    afterEnterHook(data) {
        // Reinitialize page-specific functionality
        this.reinitializePageScripts();
        this.updatePageTitle(data);
        this.trackPageView(data);
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
