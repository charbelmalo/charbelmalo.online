/**
 * Browser Console Commands for Content Debugging
 * Copy and paste these commands into the browser console for debugging
 */

// === QUICK DEBUG COMMANDS ===

// 1. Check content visibility status
console.log('=== CONTENT VISIBILITY CHECK ===');
const checkContent = () => {
    const containers = document.querySelectorAll('[data-barba="container"]');
    console.log(`Found ${containers.length} Barba containers`);
    
    containers.forEach((c, i) => {
        const opacity = getComputedStyle(c).opacity;
        const visible = opacity > 0;
        console.log(`Container ${i}: ${visible ? '✅ VISIBLE' : '❌ HIDDEN'} (opacity: ${opacity})`);
    });
    
    return containers.length;
};

// 2. Force content to be visible
const forceVisible = () => {
    console.log('🚨 FORCING CONTENT VISIBLE...');
    
    const selectors = [
        '[data-barba="container"]',
        '.site-main', 
        'main', 
        '#primary',
        '.content-wrapper'
    ];
    
    let count = 0;
    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.setProperty('opacity', '1', 'important');
            el.style.setProperty('visibility', 'visible', 'important');
            el.style.setProperty('transform', 'none', 'important');
            count++;
        });
    });
    
    console.log(`✅ Made ${count} elements visible`);
    return count;
};

// 3. Check for script conflicts
const checkConflicts = () => {
    console.log('=== SCRIPT CONFLICT CHECK ===');
    
    const conflicts = [];
    if (window.elementorFrontend) conflicts.push('Elementor');
    if (window.jQuery?.fn?.barba) conflicts.push('jQuery Barba');
    if (typeof gsap !== 'undefined') conflicts.push('GSAP Global');
    if (typeof barba !== 'undefined') conflicts.push('Barba Global');
    
    console.log('Conflicts:', conflicts.length ? conflicts : 'None');
    return conflicts;
};

// 4. Complete debug report
const debugReport = () => {
    console.clear();
    console.log('🔍 === COMPLETE DEBUG REPORT ===');
    
    // Basic checks
    console.log('Barba loaded:', typeof window.barba !== 'undefined');
    console.log('Emergency script:', document.getElementById('ultra-emergency-css') ? 'Present' : 'Missing');
    
    // Content check
    const containerCount = checkContent();
    
    // Conflict check
    const conflicts = checkConflicts();
    
    // CSS check
    console.log('=== CSS STATUS ===');
    const body = getComputedStyle(document.body);
    console.log('Body opacity:', body.opacity);
    console.log('Body visibility:', body.visibility);
    
    // Summary
    console.log('=== SUMMARY ===');
    if (containerCount === 0) {
        console.log('❌ CRITICAL: No Barba containers found');
    } else {
        console.log('✅ Barba containers found');
    }
    
    if (conflicts.length > 0) {
        console.log('⚠️ WARNING: Script conflicts detected');
    } else {
        console.log('✅ No major conflicts');
    }
    
    console.log('=== AVAILABLE COMMANDS ===');
    console.log('checkContent() - Check container visibility');
    console.log('forceVisible() - Force content visible');
    console.log('checkConflicts() - Check for script conflicts');
    console.log('debugReport() - Run this complete report');
};

// Make functions available globally
window.checkContent = checkContent;
window.forceVisible = forceVisible;
window.checkConflicts = checkConflicts;
window.debugReport = debugReport;

// Auto-run basic check
console.log('🛠️ Debug tools loaded! Type debugReport() for full analysis');
console.log('Quick commands: checkContent(), forceVisible(), checkConflicts()');

// Initial quick check
checkContent();
