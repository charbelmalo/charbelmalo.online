/**
 * Simple Content Reveal Script
 * Standalone script that ensures content visibility without complex module dependencies
 */
(function() {
    'use strict';
    
    console.log('🔧 Simple content reveal initialized');

    // Immediate content reveal for any hidden Barba containers
    function revealContent() {
        const containers = document.querySelectorAll('[data-barba="container"]');
        console.log(`Found ${containers.length} Barba containers`);
        
        containers.forEach((container, index) => {
            const currentOpacity = getComputedStyle(container).opacity;
            console.log(`Container ${index}: current opacity = ${currentOpacity}`);
            
            // Force visibility
            container.style.opacity = '1';
            container.style.visibility = 'visible';
            container.style.display = 'block';
            container.style.transition = 'opacity 0.3s ease-in-out';
            
            console.log(`✅ Container ${index} revealed`);
        });
        
        // Add classes to document
        document.documentElement.classList.add('content-revealed', 'barba-ready');
        document.body.classList.add('content-visible');
        
        console.log('✅ All content revealed');
    }

    // Try multiple times to ensure content is visible
    function ensureVisibility() {
        console.log('🔍 Checking content visibility...');
        
        // Immediate check
        revealContent();
        
        // Additional checks with delays
        setTimeout(revealContent, 100);
        setTimeout(revealContent, 500);
        setTimeout(revealContent, 1000);
        
        // Nuclear option - remove all opacity restrictions
        setTimeout(() => {
            console.log('🚨 Nuclear option - forcing all content visible');
            
            const style = document.createElement('style');
            style.textContent = `
                [data-barba="container"],
                .site-main,
                #primary,
                main,
                .entry-content {
                    opacity: 1 !important;
                    visibility: visible !important;
                    display: block !important;
                }
                
                body, html {
                    opacity: 1 !important;
                    visibility: visible !important;
                }
            `;
            document.head.appendChild(style);
            
            // Also force via JavaScript
            const allContainers = document.querySelectorAll('[data-barba="container"], .site-main, #primary, main, .entry-content');
            allContainers.forEach(el => {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
                el.style.display = 'block';
            });
            
            console.log('🎯 Nuclear content reveal complete');
        }, 2000);
    }

    // Start the process as soon as possible
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureVisibility);
        // But also try immediately in case we're already past loading
        setTimeout(ensureVisibility, 10);
    } else {
        ensureVisibility();
    }
    
    // Additional window load check
    window.addEventListener('load', ensureVisibility);
    
    // Make functions available globally for debugging
    window.forceRevealContent = revealContent;
    window.ensureContentVisibility = ensureVisibility;
    
})();
