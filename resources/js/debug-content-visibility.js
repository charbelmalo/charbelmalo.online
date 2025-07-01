/**
 * Debug Content Visibility Script
 * Run this in the browser console to debug content visibility issues
 */

console.log('🔍 CONTENT VISIBILITY DEBUGGER - Starting analysis...');

// 1. Check Barba.js Status
console.group('📊 Barba.js Status');
console.log('Barba loaded:', typeof window.barba !== 'undefined');
console.log('Barba version:', window.barba?.version || 'Not available');
console.log('Barba initialized:', window.barba?.initialized || false);
console.groupEnd();

// 2. Check Content Containers
console.group('📦 Content Containers');
const containers = document.querySelectorAll('[data-barba="container"]');
console.log(`Found ${containers.length} Barba containers:`);

containers.forEach((container, i) => {
    const styles = getComputedStyle(container);
    const rect = container.getBoundingClientRect();
    
    console.log(`Container ${i}:`, {
        element: container,
        opacity: styles.opacity,
        visibility: styles.visibility,
        display: styles.display,
        transform: styles.transform,
        position: rect,
        namespace: container.getAttribute('data-barba-namespace'),
        classes: Array.from(container.classList),
        hasContent: container.innerHTML.trim().length > 0
    });
});
console.groupEnd();

// 3. Check for Conflicting Scripts
console.group('⚠️ Script Conflicts');
const conflicts = [];

if (window.elementorFrontend) conflicts.push('Elementor Frontend');
if (window.jQuery && window.jQuery.fn.barba) conflicts.push('jQuery Barba Plugin');
if (document.querySelector('script[src*="barba"]')) conflicts.push('Legacy Barba Script');
if (document.querySelector('script[src*="gsap"]')) conflicts.push('Legacy GSAP Script');

console.log('Potential conflicts:', conflicts.length ? conflicts : 'None detected');
console.groupEnd();

// 4. Check CSS Issues
console.group('🎨 CSS Analysis');
const bodyStyles = getComputedStyle(document.body);
const htmlStyles = getComputedStyle(document.documentElement);

console.log('Body styles:', {
    opacity: bodyStyles.opacity,
    visibility: bodyStyles.visibility,
    overflow: bodyStyles.overflow
});

console.log('HTML styles:', {
    opacity: htmlStyles.opacity,
    visibility: htmlStyles.visibility
});

// Check for hiding classes
const hidingClasses = ['content-hidden', 'barba-loading', 'page-loading', 'fouc-hidden'];
const foundHidingClasses = hidingClasses.filter(cls => 
    document.body.classList.contains(cls) || document.documentElement.classList.contains(cls)
);

console.log('Hiding classes found:', foundHidingClasses.length ? foundHidingClasses : 'None');
console.groupEnd();

// 5. Network and Loading Issues
console.group('🌐 Network & Loading');
const scripts = Array.from(document.querySelectorAll('script[src]'));
const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));

console.log(`Scripts loaded: ${scripts.length}`);
console.log(`Stylesheets loaded: ${stylesheets.length}`);

// Check for failed resources
const failedResources = performance.getEntriesByType('navigation').concat(
    performance.getEntriesByType('resource')
).filter(entry => entry.transferSize === 0 && entry.decodedBodySize === 0);

console.log('Failed resources:', failedResources.length);
if (failedResources.length > 0) {
    console.log('Failed:', failedResources.map(r => r.name));
}
console.groupEnd();

// 6. Quick Fixes
console.group('🛠️ Quick Fixes');
console.log('Available emergency functions:');
console.log('- window.forceRevealContent() - Force content visibility');
console.log('- window.checkContentVisibility() - Check container status');

// Add emergency fix button
if (!window.emergencyFixApplied) {
    console.log('🚨 Running emergency fix...');
    
    // Force all content visible
    document.querySelectorAll('[data-barba="container"], .site-main, main, #primary').forEach(el => {
        el.style.setProperty('opacity', '1', 'important');
        el.style.setProperty('visibility', 'visible', 'important');
        el.style.setProperty('transform', 'none', 'important');
    });
    
    // Remove hiding classes
    document.body.classList.remove('content-hidden', 'barba-loading', 'page-loading', 'fouc-hidden');
    document.documentElement.classList.add('emergency-fixed');
    
    window.emergencyFixApplied = true;
    console.log('✅ Emergency fix applied!');
}
console.groupEnd();

// 7. Summary
console.group('📋 Summary');
const summary = {
    barbaLoaded: typeof window.barba !== 'undefined',
    containersFound: containers.length,
    visibleContainers: containers.filter(c => getComputedStyle(c).opacity > 0).length,
    conflicts: conflicts.length,
    emergencyScriptPresent: document.getElementById('ultra-emergency-css') !== null
};

console.log('Status Summary:', summary);

if (summary.containersFound === 0) {
    console.log('❌ ISSUE: No Barba containers found! Check HTML structure.');
} else if (summary.visibleContainers === 0) {
    console.log('❌ ISSUE: All containers are hidden! Check CSS and scripts.');
} else if (summary.visibleContainers < summary.containersFound) {
    console.log('⚠️ WARNING: Some containers are hidden.');
} else {
    console.log('✅ All containers appear to be visible.');
}

console.groupEnd();

console.log('🔍 Content visibility analysis complete!');

// Return summary for programmatic use
window.contentDebugSummary = summary;
