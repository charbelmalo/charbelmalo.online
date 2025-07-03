/**
 * Widget Scripts Error Handler
 * Specifically handles Elementor widget-scripts errors during page transitions
 */

(function() {
  'use strict';

  // Only intercept the specific "Cannot read properties of null (reading 'value')" error
  window.addEventListener('error', function(event) {
    const errorMessage = event.message || '';
    const filename = event.filename || '';
    
    // Very specific check for the widget-scripts value error
    if (filename.includes('widget-scripts') && 
        errorMessage.includes("Cannot read properties of null (reading 'value')")) {
      console.warn('Widget script value error intercepted (line:', event.lineno, ')');
      event.preventDefault();
      return true;
    }
  }, true);

  // Listen for our custom reinitialization event to help with widget cleanup
  window.addEventListener('barba-reinitialized', function() {
    console.log('Barba reinitialized - widget error handler standing by');
  });

  console.log('Widget scripts error handler initialized (minimal mode)');
})();
