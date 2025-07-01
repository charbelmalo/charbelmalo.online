/**
 * Emergency Content Reveal Script
 * Add this to the HTML head if content remains hidden
 */

// Immediate content reveal function
(function() {
    'use strict';
    
    console.log('🚨 Emergency content reveal script loaded');
    
    function forceRevealContent() {
        const containers = document.querySelectorAll('[data-barba="container"]');
        console.log(`Found ${containers.length} Barba containers`);
        
        containers.forEach((container, index) => {
            const opacity = getComputedStyle(container).opacity;
            console.log(`Container ${index}: opacity = ${opacity}`);
            
            if (opacity === '0' || container.style.opacity === '0') {
                console.log(`🔧 Revealing container ${index}`);
                container.style.opacity = '1';
                container.style.transition = 'opacity 0.3s ease-in-out';
            }
        });
        
        // Also ensure main content is visible
        const mainContent = document.querySelector('#primary, main, .site-main');
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.visibility = 'visible';
        }
        
        // Add classes to trigger CSS rules
        document.documentElement.classList.add('barba-ready', 'barba-initialized', 'content-revealed');
        document.body.classList.add('content-visible');
    }
    
    // Try to reveal content as soon as possible
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceRevealContent);
    } else {
        forceRevealContent();
    }
    
    // Backup timers
    setTimeout(forceRevealContent, 500);
    setTimeout(forceRevealContent, 1000);
    setTimeout(forceRevealContent, 2000);
    
    // Final fallback
    setTimeout(() => {
        console.log('🚨 Final fallback - removing all opacity restrictions');
        const style = document.createElement('style');
        style.textContent = `
            [data-barba="container"] {
                opacity: 1 !important;
                visibility: visible !important;
            }
            
            .site-main, #primary, main {
                opacity: 1 !important;
                visibility: visible !important;
            }
        `;
        document.head.appendChild(style);
    }, 3000);
    
})();
