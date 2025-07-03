/**
 * Animation Fixes - Adds defensive checks to prevent errors in animation classes
 */

// Immediate patching for classes that might already be loaded
(function() {
  function patchAnimationClasses() {
    if (window.peTextAnimation && !window.peTextAnimation._patched) {
      const OriginalPeTextAnimation = window.peTextAnimation;
      
      window.peTextAnimation = class extends OriginalPeTextAnimation {
        constructor(DOM_el, ...args) {
          try {
            // Make sure DOM_el exists and has a dataset
            if (!DOM_el || !DOM_el.dataset || !DOM_el.dataset.settings) {
              console.warn('Missing required dataset.settings on element for peTextAnimation');
              // Add an empty settings object to prevent errors
              if (DOM_el && DOM_el.dataset) {
                DOM_el.dataset.settings = '{stagger=0.05;duration=1;delay=0;scrub=false;pin=false;out=false;target=chars;markers=false;start=0;startpov=top bottom;end=0;endpov=bottom center}';
              } else {
                // Create a minimal element if completely missing
                DOM_el = document.createElement('div');
                DOM_el.dataset = {};
                DOM_el.dataset.settings = '{stagger=0.05;duration=1;delay=0;scrub=false;pin=false;out=false;target=chars;markers=false;start=0;startpov=top bottom;end=0;endpov=bottom center}';
                DOM_el.dataset.animation = 'charsFadeOn';
              }
            }
            
            super(DOM_el, ...args);
          } catch (error) {
            console.warn('Error in peTextAnimation constructor:', error);
            // Initialize with minimal properties to prevent further errors
            this.DOM = { el: DOM_el };
            this.render = function() {};
            this.tl = { eventCallback: function() {} };
          }
        }
      };
      window.peTextAnimation._patched = true;
    }

    if (window.peImageAnimation && !window.peImageAnimation._patched) {
      const OriginalPeImageAnimation = window.peImageAnimation;
      
      window.peImageAnimation = class extends OriginalPeImageAnimation {
        constructor(DOM_el, ...args) {
          try {
            // Make sure DOM_el exists and has a dataset
            if (!DOM_el || !DOM_el.dataset || !DOM_el.dataset.settings) {
              console.warn('Missing required dataset.settings on element for peImageAnimation');
              // Add an empty settings object to prevent errors
              if (DOM_el && DOM_el.dataset) {
                DOM_el.dataset.settings = '{stagger=0;duration=0.75;delay=0;scrub=false;pin=false;out=false;start_scale=1;end_scale=1;inner_scale=false;block_direction=left;item_ref_start=top;window_ref_start=bottom;item_ref_end=bottom;window_ref_end=center}';
              } else {
                // Create a minimal element if completely missing
                DOM_el = document.createElement('div');
                DOM_el.dataset = {};
                DOM_el.dataset.settings = '{stagger=0;duration=0.75;delay=0;scrub=false;pin=false;out=false;start_scale=1;end_scale=1;inner_scale=false;block_direction=left;item_ref_start=top;window_ref_start=bottom;item_ref_end=bottom;window_ref_end=center}';
                DOM_el.dataset.animation = 'scale';
              }
            }
            
            super(DOM_el, ...args);
          } catch (error) {
            console.warn('Error in peImageAnimation constructor:', error);
            // Initialize with minimal properties to prevent further errors
            this.DOM = { el: DOM_el };
            this.render = function() {};
            this.tl = { eventCallback: function() {} };
          }
        }
      };
      window.peImageAnimation._patched = true;
    }
  }

  // Try to patch immediately
  patchAnimationClasses();
  
  // Also try after a short delay in case classes load asynchronously
  setTimeout(patchAnimationClasses, 100);
  
  // And try when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patchAnimationClasses);
  } else {
    patchAnimationClasses();
  }
})();

// Wait for DOM and classes to be loaded
document.addEventListener('DOMContentLoaded', function() {
  // Fix for text animations and image animations
  if (window.peTextAnimation) {
    const OriginalPeTextAnimation = window.peTextAnimation;
    
    window.peTextAnimation = class extends OriginalPeTextAnimation {
      constructor(DOM_el, ...args) {
        try {
          // Make sure DOM_el exists and has a dataset
          if (!DOM_el || !DOM_el.dataset || !DOM_el.dataset.settings) {
            console.warn('Missing required dataset.settings on element for peTextAnimation');
            // Add an empty settings object to prevent errors
            if (DOM_el && DOM_el.dataset) {
              DOM_el.dataset.settings = '{stagger=0.05;duration=1;delay=0;scrub=false;pin=false;out=false;target=chars;markers=false;start=0;startpov=top bottom;end=0;endpov=bottom center}';
            } else {
              // Create a minimal element if completely missing
              DOM_el = document.createElement('div');
              DOM_el.dataset = {};
              DOM_el.dataset.settings = '{stagger=0.05;duration=1;delay=0;scrub=false;pin=false;out=false;target=chars;markers=false;start=0;startpov=top bottom;end=0;endpov=bottom center}';
              DOM_el.dataset.animation = 'charsFadeOn';
            }
          }
          
          super(DOM_el, ...args);
        } catch (error) {
          console.warn('Error in peTextAnimation constructor:', error);
          // Initialize with minimal properties to prevent further errors
          this.DOM = { el: DOM_el };
          this.render = function() {};
          this.tl = { eventCallback: function() {} };
        }
      }
    };
  }

  if (window.peImageAnimation) {
    const OriginalPeImageAnimation = window.peImageAnimation;
    
    window.peImageAnimation = class extends OriginalPeImageAnimation {
      constructor(DOM_el, ...args) {
        try {
          // Make sure DOM_el exists and has a dataset
          if (!DOM_el || !DOM_el.dataset || !DOM_el.dataset.settings) {
            console.warn('Missing required dataset.settings on element for peImageAnimation');
            // Add an empty settings object to prevent errors
            if (DOM_el && DOM_el.dataset) {
              DOM_el.dataset.settings = '{stagger=0;duration=0.75;delay=0;scrub=false;pin=false;out=false;start_scale=1;end_scale=1;inner_scale=false;block_direction=left;item_ref_start=top;window_ref_start=bottom;item_ref_end=bottom;window_ref_end=center}';
            } else {
              // Create a minimal element if completely missing
              DOM_el = document.createElement('div');
              DOM_el.dataset = {};
              DOM_el.dataset.settings = '{stagger=0;duration=0.75;delay=0;scrub=false;pin=false;out=false;start_scale=1;end_scale=1;inner_scale=false;block_direction=left;item_ref_start=top;window_ref_start=bottom;item_ref_end=bottom;window_ref_end=center}';
              DOM_el.dataset.animation = 'scale';
            }
          }
          
          super(DOM_el, ...args);
        } catch (error) {
          console.warn('Error in peImageAnimation constructor:', error);
          // Initialize with minimal properties to prevent further errors
          this.DOM = { el: DOM_el };
          this.render = function() {};
          this.tl = { eventCallback: function() {} };
        }
      }
    };
  }
});

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
