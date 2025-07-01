# Content Visibility & Barba.js Debug Guide

## 🚨 Emergency Content Reveal System

This project includes multiple failsafe mechanisms to ensure content is always visible, even when Barba.js or other scripts fail to initialize properly.

### Emergency Scripts Implemented

1. **Ultra Emergency Reveal** (`resources/js/ultra-emergency-reveal.js`)
   - Runs immediately after CSS loads
   - Forces content visibility with multiple strategies
   - Monitors for hidden content continuously
   - Provides global debug functions

2. **Simple Content Reveal** (`resources/js/simple-content-reveal.js`)
   - Lightweight backup system
   - Compatible with legacy WordPress/Elementor scripts

3. **Debug Tools** (`public/debug-console-commands.js`)
   - Browser console debugging commands
   - Quick visibility checks and fixes

## 🔧 Quick Debugging

### Browser Console Commands

Open browser console (F12) and run:

```javascript
// Quick check
checkContent()

// Force content visible
forceVisible()

// Full debug report
debugReport()

// Check for script conflicts
checkConflicts()
```

### Manual Debug Steps

1. **Check if content containers exist:**
   ```javascript
   document.querySelectorAll('[data-barba="container"]').length
   ```

2. **Force visibility manually:**
   ```javascript
   document.querySelectorAll('[data-barba="container"]').forEach(el => {
       el.style.setProperty('opacity', '1', 'important');
       el.style.setProperty('visibility', 'visible', 'important');
   });
   ```

3. **Check CSS conflicts:**
   ```javascript
   getComputedStyle(document.querySelector('[data-barba="container"]')).opacity
   ```

## 🛠️ Troubleshooting

### Content Not Visible

1. **Check console for errors:** Look for script loading failures
2. **Run debug commands:** Use `debugReport()` in console
3. **Check emergency scripts:** Verify ultra emergency CSS is injected
4. **Force reveal:** Run `forceVisible()` command

### Script Conflicts

Common conflicts with legacy WordPress/Elementor scripts:

- **Elementor Frontend:** May interfere with Barba.js initialization
- **Legacy GSAP/Barba:** Old versions conflicting with modern versions
- **Widget Scripts:** Elementor widget scripts causing errors

### Performance Issues

- **Multiple script loading:** Legacy + modern scripts loading simultaneously
- **CSS blocking:** Large CSS files delaying emergency script execution
- **Network timeouts:** Failed resource loading blocking initialization

## 📊 Monitoring

The ultra emergency system includes:

- **Immediate execution:** Runs as soon as CSS loads
- **Progressive fallbacks:** Multiple timeout-based reveals
- **Continuous monitoring:** Watches for hidden content
- **Debug logging:** Console messages for troubleshooting

## 🔄 Barba.js Integration

Current setup includes:

- **Modern ES6 modules:** Clean integration with Vite
- **Page Transition Manager:** Handles complex transitions
- **Shader Effects Manager:** Three.js/shader integration
- **Performance Monitor:** Debug overlays and metrics
- **FOUC Prevention:** Multiple strategies to prevent flash of unstyled content

## 📝 Files Modified

- `resources/views/component/head.blade.php` - Ultra emergency script injection
- `resources/js/ultra-emergency-reveal.js` - Main emergency system
- `resources/js/app-integration.js` - Barba.js integration
- `resources/js/page-transition-manager.js` - Transition handling
- `resources/css/barba-transitions.css` - Transition styles

## 🚀 Deployment Notes

1. **Build process:** Emergency script is inlined for immediate execution
2. **CDN compatibility:** Scripts work with or without CDN
3. **Legacy support:** Compatible with existing WordPress/Elementor setup
4. **Performance:** Minimal impact on page load times

---

## Quick Reference

| Issue | Solution | Command |
|-------|----------|---------|
| Content hidden | Emergency reveal | `forceVisible()` |
| Debug needed | Full report | `debugReport()` |
| Check containers | Count visible | `checkContent()` |
| Script conflicts | Detect issues | `checkConflicts()` |

All emergency systems are designed to work independently of Barba.js and other scripts, ensuring content is always accessible to users.
