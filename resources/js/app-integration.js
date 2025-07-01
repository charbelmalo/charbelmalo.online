/**
 * Main Application Integration
 * Coordinates Three.js, Shader Effects, and Page Transitions
 */
import PageTransitionManager from './page-transition-manager.js';
import BarbaPerformanceMonitor from './barba-performance-monitor.js';
import BarbaDebugHelper from './barba-debug-helper.js';

class ApplicationManager {
    constructor() {
        this.pageTransitionManager = null;
        this.threeJSManager = null;
        this.shaderManager = null;
        this.performanceMonitor = null;
        this.debugHelper = null;
        this.isInitialized = false;
        
        this.init();
    }

    async init() {
        if (this.isInitialized) return;

        try {
            // Initialize page transitions FIRST to prevent flash
            await this.initializePageTransitionManager();
            
            // Wait for DOM to be ready for other managers
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // Initialize other managers in optimal order
            await this.initializeShaderManager();
            await this.initializeThreeJSManager();
            await this.initializePerformanceMonitor();
            await this.initializeDebugHelper();
            
            // Connect managers for seamless integration
            this.connectManagers();
            
            // Setup performance monitoring
            this.setupPerformanceMonitoring();
            
            this.isInitialized = true;
            console.log('Application initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize application:', error);
        }
    }

    async initializeShaderManager() {
        if (typeof window.ShaderEffectsManager !== 'undefined') {
            this.shaderManager = new window.ShaderEffectsManager();
            console.log('Shader Effects Manager initialized');
        }
    }

    async initializeThreeJSManager() {
        if (typeof window.ThreeJSPortfolioManager !== 'undefined') {
            this.threeJSManager = new window.ThreeJSPortfolioManager();
            console.log('Three.js Portfolio Manager initialized');
        }
    }

    async initializePageTransitionManager() {
        // Initialize immediately to prevent FOUC, even if DOM isn't ready
        this.pageTransitionManager = new PageTransitionManager();
        console.log('Page Transition Manager initialized early');
        
        // Additional failsafe for content visibility
        this.ensureContentVisibility();
    }

    ensureContentVisibility() {
        // Ultra-safe content reveal mechanism
        const checkAndReveal = () => {
            const containers = document.querySelectorAll('[data-barba="container"]');
            let hiddenContainers = 0;
            
            containers.forEach(container => {
                const computedStyle = getComputedStyle(container);
                if (computedStyle.opacity === '0' || container.style.opacity === '0') {
                    hiddenContainers++;
                }
            });
            
            if (hiddenContainers > 0) {
                console.log(`🔍 Found ${hiddenContainers} hidden containers, revealing...`);
                containers.forEach(container => {
                    container.style.opacity = '1';
                    container.style.transition = 'opacity 0.3s ease-in-out';
                });
                document.documentElement.classList.add('barba-ready', 'barba-initialized');
            }
        };
        
        // Check immediately
        setTimeout(checkAndReveal, 100);
        
        // Check again after 1 second as backup
        setTimeout(checkAndReveal, 1000);
        
        // Final check after 3 seconds
        setTimeout(checkAndReveal, 3000);
    }

    async initializePerformanceMonitor() {
        if (process.env.NODE_ENV === 'development') {
            this.performanceMonitor = new BarbaPerformanceMonitor();
            console.log('Performance Monitor initialized');
        }
    }

    async initializeDebugHelper() {
        if (process.env.NODE_ENV === 'development') {
            this.debugHelper = new BarbaDebugHelper();
            console.log('Debug Helper initialized');
        }
    }

    connectManagers() {
        if (!this.pageTransitionManager) return;

        // Connect Three.js manager
        if (this.threeJSManager) {
            this.pageTransitionManager.setThreeJSManager(this.threeJSManager);
        }

        // Connect Shader manager
        if (this.shaderManager) {
            this.pageTransitionManager.setShaderManager(this.shaderManager);
        }

        // Setup animation loop coordination
        this.setupAnimationLoop();
    }

    setupAnimationLoop() {
        let lastTime = 0;
        
        const animate = (currentTime) => {
            const deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;

            // Update shader uniforms
            if (this.shaderManager) {
                this.shaderManager.updateUniforms(deltaTime);
            }

            // Update Three.js animations
            if (this.threeJSManager && this.threeJSManager.update) {
                this.threeJSManager.update(deltaTime);
            }

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }

    setupPerformanceMonitoring() {
        // Monitor performance and optimize as needed
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'navigation') {
                        console.log(`Page load time: ${entry.loadEventEnd - entry.loadEventStart}ms`);
                    }
                }
            });

            observer.observe({ entryTypes: ['navigation', 'resource'] });
        }

        // Setup memory monitoring
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
                const totalMB = Math.round(memory.totalJSHeapSize / 1048576);
                
                if (usedMB > 100) { // Alert if using more than 100MB
                    console.warn(`High memory usage: ${usedMB}MB / ${totalMB}MB`);
                    this.optimizeMemory();
                }
            }, 30000); // Check every 30 seconds
        }
    }

    optimizeMemory() {
        // Cleanup unused resources
        if (this.shaderManager) {
            // Dispose unused materials
            this.shaderManager.materials.forEach((material, key) => {
                const lastUsed = material.userData?.lastUsed || 0;
                const now = Date.now();
                
                if (now - lastUsed > 300000) { // 5 minutes
                    material.dispose();
                    this.shaderManager.materials.delete(key);
                }
            });
        }

        // Force garbage collection if available
        if (window.gc && typeof window.gc === 'function') {
            window.gc();
        }
    }

    // Public API methods
    getPageTransitionManager() {
        return this.pageTransitionManager;
    }

    getThreeJSManager() {
        return this.threeJSManager;
    }

    getShaderManager() {
        return this.shaderManager;
    }

    // Cleanup method
    destroy() {
        if (this.pageTransitionManager) {
            this.pageTransitionManager.destroy();
        }
        
        if (this.threeJSManager && this.threeJSManager.destroy) {
            this.threeJSManager.destroy();
        }
        
        if (this.shaderManager && this.shaderManager.dispose) {
            this.shaderManager.dispose();
        }
        
        if (this.performanceMonitor) {
            this.performanceMonitor = null;
        }
        
        this.isInitialized = false;
    }
}

// Initialize the application
const app = new ApplicationManager();

// Make managers available globally for debugging
window.app = app;

// Expose for external scripts
window.ApplicationManager = ApplicationManager;

export default ApplicationManager;
