/**
 * Ultra Emergency Content Reveal
 * Bulletproof content visibility failsafe
 * Runs independently of all other scripts
 */

console.log('🚨 ULTRA EMERGENCY REVEAL - Starting immediate content visibility...');

// 1. IMMEDIATE CSS INJECTION
const emergencyStyles = document.createElement('style');
emergencyStyles.id = 'ultra-emergency-css';
emergencyStyles.textContent = `
    /* Ultra emergency content reveal - HIDE EVERYTHING FIRST */
    html, body {
        opacity: 0 !important;
        visibility: hidden !important;
    }
    
    /* Only show when emergency script runs */
    html.emergency-revealed, 
    body.emergency-revealed {
        opacity: 1 !important;
        visibility: visible !important;
    }
    
    [data-barba="container"],
    [data-barba="wrapper"],
    .site-main,
    main,
    #primary,
    .content-wrapper,
    .elementor,
    .elementor-section,
    .elementor-column,
    .elementor-widget,
    .hero-section,
    .hero-image,
    .portfolio-hero,
    .project-hero {
        opacity: 0 !important;
        visibility: hidden !important;
        transform: none !important;
        display: block !important;
        min-height: auto !important;
    }
    
    /* Force hide hero images specifically */
    .hero-section img,
    .hero-image img,
    .portfolio-hero img,
    .project-hero img,
    .hero-section picture,
    .hero-image picture,
    .portfolio-hero picture,
    .project-hero picture,
    .hero-section video,
    .hero-image video {
        opacity: 0 !important;
        visibility: hidden !important;
    }
    
    /* Only show when emergency revealed */
    html.emergency-revealed [data-barba="container"],
    html.emergency-revealed [data-barba="wrapper"],
    html.emergency-revealed .site-main,
    html.emergency-revealed main,
    html.emergency-revealed #primary,
    html.emergency-revealed .content-wrapper,
    html.emergency-revealed .elementor,
    html.emergency-revealed .elementor-section,
    html.emergency-revealed .elementor-column,
    html.emergency-revealed .elementor-widget,
    html.emergency-revealed .hero-section,
    html.emergency-revealed .hero-image,
    html.emergency-revealed .portfolio-hero,
    html.emergency-revealed .project-hero,
    html.emergency-revealed .hero-section img,
    html.emergency-revealed .hero-image img,
    html.emergency-revealed .portfolio-hero img,
    html.emergency-revealed .project-hero img,
    html.emergency-revealed .hero-section picture,
    html.emergency-revealed .hero-image picture,
    html.emergency-revealed .portfolio-hero picture,
    html.emergency-revealed .project-hero picture,
    html.emergency-revealed .hero-section video,
    html.emergency-revealed .hero-image video {
        opacity: 1 !important;
        visibility: visible !important;
        transform: none !important;
    }
    
    /* Remove all hiding classes */
    .content-hidden,
    .barba-loading,
    .page-loading,
    .fouc-hidden,
    .barba-leave,
    .barba-enter {
        opacity: 1 !important;
        visibility: visible !important;
        transform: none !important;
    }
    
    /* Hide any loading overlays */
    .loading-overlay,
    .page-loader,
    .barba-loader,
    .preloader {
        display: none !important;
        opacity: 0 !important;
    }
`;

// Inject immediately
(document.head || document.documentElement).appendChild(emergencyStyles);

// 2. IMMEDIATE INLINE STYLE APPLICATION
function ultraReveal() {
    console.log('🔧 Running ultra emergency reveal...');
    
    // Force document visibility with emergency class
    document.documentElement.classList.add('emergency-revealed');
    document.documentElement.style.setProperty('opacity', '1', 'important');
    document.documentElement.style.setProperty('visibility', 'visible', 'important');
    
    if (document.body) {
        document.body.classList.add('emergency-revealed');
        document.body.style.setProperty('opacity', '1', 'important');
        document.body.style.setProperty('visibility', 'visible', 'important');
        
        // Remove hiding classes
        const hidingClasses = ['content-hidden', 'barba-loading', 'page-loading', 'fouc-hidden'];
        hidingClasses.forEach(cls => document.body.classList.remove(cls));
        
        // Add revealing classes
        document.body.classList.add('content-visible', 'emergency-revealed');
    }
    
    // Target all possible content containers including hero elements
    const selectors = [
        '[data-barba="container"]',
        '[data-barba="wrapper"]', 
        '.site-main',
        'main',
        '#primary',
        '.content-wrapper',
        '#content',
        '.main-content',
        '.page-content',
        '.entry-content',
        '.elementor',
        '.elementor-section',
        '.wp-site-blocks',
        '.hero-section',
        '.hero-image',
        '.portfolio-hero',
        '.project-hero',
        '.hero-section img',
        '.hero-image img',
        '.portfolio-hero img',
        '.project-hero img',
        '.hero-section picture',
        '.hero-image picture',
        '.portfolio-hero picture',
        '.project-hero picture',
        '.hero-section video',
        '.hero-image video'
    ];
    
    let revealedCount = 0;
    
    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element) {
                element.style.setProperty('opacity', '1', 'important');
                element.style.setProperty('visibility', 'visible', 'important');
                element.style.setProperty('transform', 'none', 'important');
                element.style.setProperty('display', 'block', 'important');
                element.style.setProperty('min-height', 'auto', 'important');
                
                // Remove hiding classes
                const hidingClasses = ['content-hidden', 'barba-loading', 'page-loading', 'fouc-hidden'];
                hidingClasses.forEach(cls => element.classList.remove(cls));
                
                revealedCount++;
            }
        });
    });
    
    // Hide any loading overlays
    const overlaySelectors = ['.loading-overlay', '.page-loader', '.barba-loader', '.preloader'];
    overlaySelectors.forEach(selector => {
        const overlays = document.querySelectorAll(selector);
        overlays.forEach(overlay => {
            overlay.style.setProperty('display', 'none', 'important');
            overlay.style.setProperty('opacity', '0', 'important');
        });
    });
    
    console.log(`✅ Ultra emergency reveal: Made ${revealedCount} elements visible`);
    
    // Mark as emergency revealed
    document.documentElement.setAttribute('data-emergency-revealed', 'true');
    
    return revealedCount;
}

// 3. IMMEDIATE EXECUTION - Run as soon as this script loads
ultraReveal();

// 4. PROGRESSIVE FALLBACKS - Run multiple times to catch dynamic content
setTimeout(ultraReveal, 1);     // Immediate
setTimeout(ultraReveal, 10);    // Very fast
setTimeout(ultraReveal, 50);    // Fast
setTimeout(ultraReveal, 100);   // Quick
setTimeout(ultraReveal, 250);   // Before most scripts
setTimeout(ultraReveal, 500);   // After basic initialization
setTimeout(ultraReveal, 1000);  // After complex scripts
setTimeout(ultraReveal, 2000);  // Safety net
setTimeout(ultraReveal, 3000);  // Final safety

// 5. CONTINUOUS MONITORING (for dynamic content)
let monitoringCount = 0;
const maxMonitoring = 10;

const monitor = setInterval(() => {
    monitoringCount++;
    
    // Check if content is still hidden
    const hiddenContainers = document.querySelectorAll('[data-barba="container"][style*="opacity: 0"], [data-barba="container"]:not([style])');
    
    if (hiddenContainers.length > 0) {
        console.log(`🔍 Found ${hiddenContainers.length} potentially hidden containers, revealing...`);
        ultraReveal();
    }
    
    // Stop monitoring after reasonable time
    if (monitoringCount >= maxMonitoring) {
        clearInterval(monitor);
        console.log('🏁 Ultra emergency monitoring completed');
    }
}, 200);

// 6. CONSOLE STATUS
console.log('🚨 Ultra Emergency Reveal: ACTIVE - Content should be visible immediately');
console.log('📊 Monitoring for hidden content every 200ms for 2 seconds');

// 7. GLOBAL EMERGENCY FUNCTION (for debugging)
window.forceRevealContent = ultraReveal;
window.checkContentVisibility = function() {
    const containers = document.querySelectorAll('[data-barba="container"]');
    containers.forEach((container, i) => {
        const styles = getComputedStyle(container);
        console.log(`Container ${i}: opacity=${styles.opacity}, visibility=${styles.visibility}, display=${styles.display}`);
    });
};

console.log('🛠️ Emergency functions available: window.forceRevealContent(), window.checkContentVisibility()');
