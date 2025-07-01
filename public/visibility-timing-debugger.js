/**
 * Content Visibility Timing Debugger
 * Paste this into browser console to monitor when content becomes visible
 */

console.log('🕒 Starting content visibility timing monitor...');

// Track when elements become visible
const monitorVisibility = () => {
    const selectors = [
        '[data-barba="container"]',
        '.hero-section',
        '.hero-image', 
        '.portfolio-hero',
        '.project-hero',
        '.hero-section img',
        '.hero-image img'
    ];
    
    const visibilityLog = [];
    
    const checkVisibility = () => {
        const timestamp = Date.now();
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                const computedStyle = getComputedStyle(element);
                const isVisible = computedStyle.opacity > 0 && computedStyle.visibility !== 'hidden';
                
                // Log when element becomes visible
                const elementId = `${selector}[${index}]`;
                const lastState = visibilityLog.find(log => log.elementId === elementId);
                
                if (!lastState) {
                    visibilityLog.push({
                        elementId,
                        visible: isVisible,
                        timestamp,
                        opacity: computedStyle.opacity,
                        visibility: computedStyle.visibility
                    });
                    
                    if (isVisible) {
                        console.log(`👁️ VISIBLE: ${elementId} at ${timestamp}ms - opacity: ${computedStyle.opacity}`);
                    }
                } else if (lastState.visible !== isVisible) {
                    visibilityLog.push({
                        elementId,
                        visible: isVisible,
                        timestamp,
                        opacity: computedStyle.opacity,
                        visibility: computedStyle.visibility
                    });
                    
                    console.log(`${isVisible ? '👁️ VISIBLE' : '🙈 HIDDEN'}: ${elementId} at ${timestamp}ms - opacity: ${computedStyle.opacity}`);
                }
            });
        });
    };
    
    // Check immediately
    checkVisibility();
    
    // Monitor every 50ms for 10 seconds
    const monitor = setInterval(checkVisibility, 50);
    
    setTimeout(() => {
        clearInterval(monitor);
        console.log('🏁 Visibility monitoring complete');
        console.log('📊 Full visibility log:', visibilityLog);
    }, 10000);
};

// Monitor navigation events
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function(...args) {
    console.log('🧭 Navigation detected - restarting visibility monitor');
    setTimeout(monitorVisibility, 100);
    return originalPushState.apply(this, args);
};

history.replaceState = function(...args) {
    console.log('🧭 Navigation detected - restarting visibility monitor');
    setTimeout(monitorVisibility, 100);
    return originalReplaceState.apply(this, args);
};

// Listen for Barba.js events if available
if (window.barba) {
    window.barba.hooks.beforeLeave(() => {
        console.log('🎬 Barba beforeLeave - starting visibility monitor');
        monitorVisibility();
    });
    
    window.barba.hooks.afterEnter(() => {
        console.log('🎬 Barba afterEnter - content should now be visible');
    });
}

// Start monitoring immediately
monitorVisibility();

console.log('✅ Visibility monitor active - navigate between pages to see timing');
console.log('📋 Available commands:');
console.log('  - monitorVisibility() - restart monitoring');
console.log('  - checkVisibility() - single visibility check');
