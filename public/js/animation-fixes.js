/**
 * Animation Fixes - Adds defensive checks to prevent errors in animation classes
 */

// Fix for text animations and image animations
const originalPeTextAnimation = window.peTextAnimation;
const originalPeImageAnimation = window.peImageAnimation;

if (typeof originalPeTextAnimation === 'function') {
  window.peTextAnimation = function(DOM_el, ...args) {
    try {
      // Make sure DOM_el exists and has a dataset
      if (!DOM_el || !DOM_el.dataset || !DOM_el.dataset.settings) {
        console.warn('Missing required dataset.settings on element for peTextAnimation');
        // Add an empty settings object to prevent errors
        if (DOM_el && DOM_el.dataset) {
          DOM_el.dataset.settings = '{}';
        } else {
          // If the element is completely invalid, return without initializing
          return;
        }
      }
      
      return new originalPeTextAnimation(DOM_el, ...args);
    } catch (error) {
      console.warn('Error in peTextAnimation:', error);
      // Return a dummy object to prevent further errors
      return {
        render: function() {},
        tl: { eventCallback: function() {} }
      };
    }
  };
}

if (typeof originalPeImageAnimation === 'function') {
  window.peImageAnimation = function(DOM_el, ...args) {
    try {
      // Make sure DOM_el exists and has a dataset
      if (!DOM_el || !DOM_el.dataset || !DOM_el.dataset.settings) {
        console.warn('Missing required dataset.settings on element for peImageAnimation');
        // Add an empty settings object to prevent errors
        if (DOM_el && DOM_el.dataset) {
          DOM_el.dataset.settings = '{}';
        } else {
          // If the element is completely invalid, return without initializing
          return;
        }
      }
      
      return new originalPeImageAnimation(DOM_el, ...args);
    } catch (error) {
      console.warn('Error in peImageAnimation:', error);
      // Return a dummy object to prevent further errors
      return {
        render: function() {},
        tl: { eventCallback: function() {} }
      };
    }
  };
}

// Add protection to any hook handler in widget-scripts
(function() {
  if (window.elementorFrontend && window.elementorFrontend.hooks) {
    const originalAddAction = window.elementorFrontend.hooks.addAction;
    
    window.elementorFrontend.hooks.addAction = function(hookName, callback, priority, context) {
      // Wrap the callback in a try-catch block
      const wrappedCallback = function(...args) {
        try {
          return callback.apply(this, args);
        } catch (error) {
          console.warn('Error in elementorFrontend hook handler:', error);
          // Don't rethrow, just log
        }
      };
      
      // Call the original addAction with our wrapped callback
      return originalAddAction.call(this, hookName, wrappedCallback, priority, context);
    };
  }
})();
