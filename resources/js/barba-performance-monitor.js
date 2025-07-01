/**
 * Barba.js Performance Monitor
 * Tracks and optimizes page transition performance
 */
class BarbaPerformanceMonitor {
    constructor() {
        this.metrics = {
            transitionTimes: [],
            memoryUsage: [],
            navigationTiming: [],
            userInteractions: []
        };
        
        this.thresholds = {
            maxTransitionTime: 1000, // 1 second
            maxMemoryUsage: 150, // 150MB
            maxNavigationTime: 3000, // 3 seconds
            targetFPS: 60
        };
        
        this.isMonitoring = false;
        this.startTime = 0;
        
        this.init();
    }

    init() {
        if (process.env.NODE_ENV !== 'development') return;
        
        this.setupPerformanceObserver();
        this.setupMemoryMonitoring();
        this.setupFPSMonitoring();
        this.setupBarbaHooks();
        
        console.log('🚀 Barba.js Performance Monitor initialized');
    }

    setupPerformanceObserver() {
        if (!('PerformanceObserver' in window)) return;

        // Navigation timing observer
        const navObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'navigation') {
                    this.trackNavigationTiming(entry);
                }
            }
        });

        navObserver.observe({ entryTypes: ['navigation'] });

        // Resource timing observer
        const resourceObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'resource') {
                    this.trackResourceTiming(entry);
                }
            }
        });

        resourceObserver.observe({ entryTypes: ['resource'] });

        // Long task observer
        const longTaskObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 50) { // Tasks longer than 50ms
                    console.warn(`🐌 Long task detected: ${entry.duration.toFixed(2)}ms`);
                    this.optimizePerformance();
                }
            }
        });

        try {
            longTaskObserver.observe({ entryTypes: ['longtask'] });
        } catch (e) {
            console.log('Long task observer not supported');
        }
    }

    setupMemoryMonitoring() {
        if (!('memory' in performance)) return;

        setInterval(() => {
            const memory = performance.memory;
            const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
            const totalMB = Math.round(memory.totalJSHeapSize / 1048576);
            const limitMB = Math.round(memory.jsHeapSizeLimit / 1048576);

            this.metrics.memoryUsage.push({
                timestamp: Date.now(),
                used: usedMB,
                total: totalMB,
                limit: limitMB
            });

            // Keep only last 100 measurements
            if (this.metrics.memoryUsage.length > 100) {
                this.metrics.memoryUsage.shift();
            }

            // Alert if memory usage is high
            if (usedMB > this.thresholds.maxMemoryUsage) {
                console.warn(`🧠 High memory usage: ${usedMB}MB / ${limitMB}MB`);
                this.optimizeMemory();
            }

            // Log memory stats every minute in development
            if (this.metrics.memoryUsage.length % 12 === 0) {
                console.log(`📊 Memory: ${usedMB}MB used, ${totalMB}MB total`);
            }
        }, 5000); // Check every 5 seconds
    }

    setupFPSMonitoring() {
        let frameCount = 0;
        let lastTime = performance.now();
        let lastFPS = 60;

        const measureFPS = (currentTime) => {
            frameCount++;
            
            if (currentTime - lastTime >= 1000) { // Every second
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                if (fps < this.thresholds.targetFPS * 0.8) { // Below 80% of target
                    console.warn(`🎯 Low FPS detected: ${fps} fps`);
                    this.optimizeRendering();
                }
                
                lastFPS = fps;
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };

        requestAnimationFrame(measureFPS);
    }

    setupBarbaHooks() {
        if (typeof barba === 'undefined') return;

        // Track transition start
        barba.hooks.before(() => {
            this.startTime = performance.now();
            this.isMonitoring = true;
            
            console.log('🔄 Page transition started');
        });

        // Track transition end
        barba.hooks.after(() => {
            if (this.isMonitoring) {
                const transitionTime = performance.now() - this.startTime;
                this.trackTransitionTime(transitionTime);
                this.isMonitoring = false;
                
                console.log(`✅ Page transition completed in ${transitionTime.toFixed(2)}ms`);
            }
        });

        // Track errors
        barba.hooks.beforeEnter((data) => {
            try {
                this.validatePageStructure(data.next.container);
            } catch (error) {
                console.error('❌ Page structure validation failed:', error);
            }
        });
    }

    trackNavigationTiming(entry) {
        const timing = {
            timestamp: Date.now(),
            loadTime: entry.loadEventEnd - entry.loadEventStart,
            domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
            firstPaint: entry.responseEnd - entry.requestStart,
            totalTime: entry.loadEventEnd - entry.navigationStart
        };

        this.metrics.navigationTiming.push(timing);
        
        console.log(`📈 Navigation timing:`, {
            'Load Time': `${timing.loadTime.toFixed(2)}ms`,
            'DOM Ready': `${timing.domContentLoaded.toFixed(2)}ms`,
            'Total Time': `${timing.totalTime.toFixed(2)}ms`
        });
    }

    trackResourceTiming(entry) {
        // Track only large resources or slow-loading ones
        if (entry.duration > 100 || entry.transferSize > 100000) {
            console.log(`📦 Resource timing: ${entry.name}`, {
                duration: `${entry.duration.toFixed(2)}ms`,
                size: `${(entry.transferSize / 1024).toFixed(2)}KB`
            });
        }
    }

    trackTransitionTime(time) {
        this.metrics.transitionTimes.push({
            timestamp: Date.now(),
            duration: time
        });

        // Keep only last 50 transitions
        if (this.metrics.transitionTimes.length > 50) {
            this.metrics.transitionTimes.shift();
        }

        // Alert if transition is slow
        if (time > this.thresholds.maxTransitionTime) {
            console.warn(`🐌 Slow transition: ${time.toFixed(2)}ms`);
            this.analyzeSlowTransition();
        }
    }

    validatePageStructure(container) {
        const requiredElements = [
            '[data-barba="container"]',
            '[data-barba-namespace]'
        ];

        for (const selector of requiredElements) {
            if (!container.querySelector(selector) && !container.matches(selector)) {
                throw new Error(`Missing required element: ${selector}`);
            }
        }

        // Check for memory-heavy elements
        const images = container.querySelectorAll('img');
        const videos = container.querySelectorAll('video');
        
        if (images.length > 20) {
            console.warn(`📸 High image count: ${images.length} images found`);
        }
        
        if (videos.length > 2) {
            console.warn(`🎥 Multiple videos found: ${videos.length} videos`);
        }
    }

    analyzeSlowTransition() {
        console.group('🔍 Analyzing slow transition');
        
        // Check memory usage
        if ('memory' in performance) {
            const memory = performance.memory;
            const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
            console.log(`Memory usage: ${usedMB}MB`);
        }

        // Check active animations
        const animations = document.getAnimations();
        if (animations.length > 10) {
            console.warn(`Many active animations: ${animations.length}`);
        }

        // Check DOM complexity
        const elements = document.querySelectorAll('*');
        if (elements.length > 5000) {
            console.warn(`Complex DOM: ${elements.length} elements`);
        }

        console.groupEnd();
    }

    optimizePerformance() {
        console.log('🔧 Running performance optimizations...');

        // Reduce animation quality if performance is poor
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
        
        // Disable non-essential animations
        const nonEssentialAnimations = document.querySelectorAll('.non-essential-animation');
        nonEssentialAnimations.forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });

        // Lazy load more aggressively
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }

    optimizeMemory() {
        console.log('🧹 Running memory optimizations...');

        // Trigger cleanup in application managers
        if (window.app) {
            if (window.app.getShaderManager()) {
                window.app.getShaderManager().dispose();
            }
        }

        // Clean up event listeners
        const oldElements = document.querySelectorAll('[data-cleanup="true"]');
        oldElements.forEach(el => el.remove());

        // Force garbage collection if available
        if (window.gc && typeof window.gc === 'function') {
            window.gc();
        }
    }

    optimizeRendering() {
        console.log('🎨 Optimizing rendering performance...');

        // Reduce shader quality
        if (window.app && window.app.getShaderManager()) {
            const shaderManager = window.app.getShaderManager();
            // Reduce shader complexity or disable some effects
            shaderManager.materials.forEach(material => {
                if (material.uniforms.quality) {
                    material.uniforms.quality.value = 0.5;
                }
            });
        }

        // Reduce Three.js rendering quality
        if (window.app && window.app.getThreeJSManager()) {
            const threeManager = window.app.getThreeJSManager();
            if (threeManager.renderer) {
                threeManager.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
            }
        }
    }

    getReport() {
        const report = {
            averageTransitionTime: this.getAverageTransitionTime(),
            memoryTrend: this.getMemoryTrend(),
            performanceScore: this.calculatePerformanceScore(),
            recommendations: this.generateRecommendations()
        };

        console.group('📊 Performance Report');
        console.table(report);
        console.groupEnd();

        return report;
    }

    getAverageTransitionTime() {
        if (this.metrics.transitionTimes.length === 0) return 0;
        
        const total = this.metrics.transitionTimes.reduce((sum, t) => sum + t.duration, 0);
        return Math.round(total / this.metrics.transitionTimes.length);
    }

    getMemoryTrend() {
        if (this.metrics.memoryUsage.length < 2) return 'stable';
        
        const recent = this.metrics.memoryUsage.slice(-10);
        const first = recent[0].used;
        const last = recent[recent.length - 1].used;
        
        if (last > first * 1.2) return 'increasing';
        if (last < first * 0.8) return 'decreasing';
        return 'stable';
    }

    calculatePerformanceScore() {
        let score = 100;
        
        // Deduct for slow transitions
        const avgTransition = this.getAverageTransitionTime();
        if (avgTransition > this.thresholds.maxTransitionTime) {
            score -= 20;
        }
        
        // Deduct for high memory usage
        const memoryTrend = this.getMemoryTrend();
        if (memoryTrend === 'increasing') {
            score -= 15;
        }
        
        // Deduct for navigation issues
        const recentNavigation = this.metrics.navigationTiming.slice(-5);
        const avgLoadTime = recentNavigation.reduce((sum, n) => sum + n.totalTime, 0) / recentNavigation.length;
        if (avgLoadTime > this.thresholds.maxNavigationTime) {
            score -= 25;
        }
        
        return Math.max(0, score);
    }

    generateRecommendations() {
        const recommendations = [];
        
        if (this.getAverageTransitionTime() > this.thresholds.maxTransitionTime) {
            recommendations.push('Consider reducing transition duration or complexity');
        }
        
        if (this.getMemoryTrend() === 'increasing') {
            recommendations.push('Memory usage is increasing - check for memory leaks');
        }
        
        const score = this.calculatePerformanceScore();
        if (score < 70) {
            recommendations.push('Overall performance is below optimal - review implementation');
        }
        
        return recommendations;
    }
}

// Initialize performance monitor in development
if (process.env.NODE_ENV === 'development') {
    window.barbaPerformanceMonitor = new BarbaPerformanceMonitor();
    
    // Add console command for manual reports
    window.getBarbaReport = () => {
        return window.barbaPerformanceMonitor.getReport();
    };
}

export default BarbaPerformanceMonitor;
