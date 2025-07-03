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

// Minimal jQuery protection - only for value access
(function() {
  if (window.jQuery) {
    const $ = window.jQuery;
    
    // Only protect the val() method as it's most likely to cause widget-scripts errors
    const originalVal = $.fn.val;
    $.fn.val = function() {
      try {
        if (this.length === 0 || !this[0]) {
          return '';
        }
        return originalVal.apply(this, arguments);
      } catch (error) {
        console.warn('jQuery val() error:', error);
        return '';
      }
    };
  }
})();

// Minimal protection for Elementor widgets initialization - only if needed
(function() {
  if (window.elementorFrontend && window.elementorFrontend.elementsHandler) {
    const originalAddHandler = window.elementorFrontend.elementsHandler.addHandler;
    
    if (originalAddHandler) {
      window.elementorFrontend.elementsHandler.addHandler = function(elementName, handler) {
        const wrappedHandler = function(element) {
          try {
            // Only check for basic element validity
            if (!element || !element.length) {
              return;
            }
            return handler.call(this, element);
          } catch (error) {
            console.warn('Error in element handler for:', elementName, error);
          }
        };
        
        return originalAddHandler.call(this, elementName, wrappedHandler);
      };
    }
  }
})();

// Add protection for widget script errors
window.addEventListener('error', function(event) {
  if (event.filename && event.filename.includes('widget-scripts')) {
    console.warn('Widget script error caught:', event.error);
    event.preventDefault(); // Prevent the error from propagating
    return true;
  }
});

// Add protection for unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
  if (event.reason && event.reason.message && 
      (event.reason.message.includes('Cannot read properties of null') ||
       event.reason.message.includes('Cannot read properties of undefined'))) {
    console.warn('Unhandled promise rejection caught:', event.reason);
    event.preventDefault(); // Prevent the error from propagating
    return true;
  }
});

// Comprehensive Barba.js reinitialization system
if (window.barba) {
  barba.hooks.after(() => {
    console.log('Barba transition complete - reinitializing all systems...');
    
    // Wait for DOM to settle, then reinitialize everything
    setTimeout(() => {
      try {
        // 1. Reinitialize animation classes
        patchAnimationClasses();
        
        // 2. Force reinitialize all text animations
        if (window.peTextAnimation) {
          document.querySelectorAll('[data-animate="true"]').forEach(element => {
            if (element.dataset.animation && element.dataset.settings) {
              try {
                // Remove any existing animation state
                element.classList.remove('animated');
                
                // Create new animation instance
                const animation = new window.peTextAnimation(element);
                
                // Trigger the animation
                if (animation && animation.render) {
                  animation.render();
                }
              } catch (error) {
                console.warn('Error reinitializing text animation:', error);
              }
            }
          });
        }
        
        // 3. Force reinitialize all image animations 
        if (window.peImageAnimation) {
          document.querySelectorAll('[data-anim-image="true"]').forEach(element => {
            if (element.dataset.animation && element.dataset.settings) {
              try {
                // Remove any existing animation state
                element.classList.remove('animated');
                
                // Create new animation instance
                const animation = new window.peImageAnimation(element);
                
                // Trigger the animation if it has a render method
                if (animation && animation.render) {
                  animation.render();
                }
              } catch (error) {
                console.warn('Error reinitializing image animation:', error);
              }
            }
          });
        }
        
        // 4. Reinitialize sparkle animations
        document.querySelectorAll('.sparkle').forEach(element => {
          // Remove the animate class first to reset
          element.classList.remove('animate-sparkle');
          
          // Use a timeout to add it back, triggering the animation
          setTimeout(() => {
            element.classList.add('animate-sparkle');
          }, 100);
        });
        
        // 5. Reinitialize accordions
        document.querySelectorAll('.pe-accordion-item-title').forEach(title => {
          // Remove any existing event listeners by cloning
          const newTitle = title.cloneNode(true);
          title.parentNode.replaceChild(newTitle, title);
          
          // Add fresh event listener
          newTitle.addEventListener('click', function() {
            const item = this.closest('.pe-accordion-item');
            const content = item.querySelector('.pe-accordion-item-content');
            const toggle = this.querySelector('.accordion-toggle');
            
            if (item.classList.contains('active')) {
              item.classList.remove('active');
              content.style.maxHeight = null;
              toggle.classList.remove('toggle--minus');
              toggle.classList.add('toggle--plus');
            } else {
              // Close other accordions
              document.querySelectorAll('.pe-accordion-item.active').forEach(activeItem => {
                activeItem.classList.remove('active');
                activeItem.querySelector('.pe-accordion-item-content').style.maxHeight = null;
                const activeToggle = activeItem.querySelector('.accordion-toggle');
                activeToggle.classList.remove('toggle--minus');
                activeToggle.classList.add('toggle--plus');
              });
              
              item.classList.add('active');
              content.style.maxHeight = content.scrollHeight + 'px';
              toggle.classList.remove('toggle--plus');
              toggle.classList.add('toggle--minus');
            }
          });
        });
        
        // 6. Reinitialize Three.js scene
        const threeContainer = document.getElementById('three-container');
        if (threeContainer && !threeContainer.querySelector('canvas')) {
          console.log('Reinitializing Three.js scene...');
          try {
            // Remove and re-add the three.js script to reinitialize
            const existingScript = document.querySelector('script[src*="three.js"]');
            if (existingScript) {
              const newScript = document.createElement('script');
              newScript.src = existingScript.src;
              newScript.type = 'module';
              existingScript.remove();
              document.head.appendChild(newScript);
            }
          } catch (error) {
            console.warn('Error reinitializing Three.js:', error);
          }
        }
        
        // 7. Reinitialize Elementor widgets and animations
        if (window.elementorFrontend) {
          try {
            // First, reinitialize the frontend
            if (typeof window.elementorFrontend.init === 'function') {
              window.elementorFrontend.init();
            }
            
            // Then trigger specific widget handlers
            document.querySelectorAll('.elementor-element').forEach(element => {
              try {
                const widgetType = element.getAttribute('data-widget_type');
                if (widgetType && window.elementorFrontend.elementsHandler) {
                  // Trigger widget-specific handlers
                  if (window.elementorFrontend.elementsHandler.runReadyTrigger) {
                    window.elementorFrontend.elementsHandler.runReadyTrigger(element);
                  }
                }
              } catch (error) {
                // Silently handle individual element errors
              }
            });
            
            // Force trigger animation initialization
            if (window.elementorFrontend.hooks) {
              try {
                window.elementorFrontend.hooks.doAction('frontend/element_ready/global');
              } catch (error) {
                console.warn('Error triggering Elementor global ready hook:', error);
              }
            }
            
          } catch (error) {
            console.warn('Error reinitializing Elementor:', error);
          }
        }
        
        // 8. Trigger custom events and scroll events for animation libraries
        try {
          // Trigger resize event to recalculate layouts
          window.dispatchEvent(new Event('resize'));
          
          // Trigger scroll event to activate scroll-based animations
          window.dispatchEvent(new Event('scroll'));
          
          // Trigger custom reinitialization event
          window.dispatchEvent(new Event('barba-reinitialized'));
          
          // Force DOM ready event for scripts that might be waiting
          document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));
          
          // Trigger load event for any remaining initializations
          setTimeout(() => {
            window.dispatchEvent(new Event('load'));
          }, 100);
          
        } catch (error) {
          console.warn('Error triggering events:', error);
        }
        
        console.log('All systems reinitialized after Barba transition');
        
      } catch (error) {
        console.error('Error during post-transition reinitialization:', error);
      }
    }, 300);
  });
  
  // Clean up before leaving
  barba.hooks.beforeLeave(() => {
    // Clean up any running animations or timers
    try {
      if (window.gsap) {
        window.gsap.killTweensOf("*");
      }
    } catch (error) {
      console.warn('Error during pre-transition cleanup:', error);
    }
  });
}

// Lightweight protection for common widget-scripts errors
(function() {
  // Only protect document.getElementById with minimal intervention
  const originalGetElementById = document.getElementById;
  document.getElementById = function(id) {
    const element = originalGetElementById.call(this, id);
    if (!element) {
      // Return null instead of dummy element to avoid interfering with normal flow
      return null;
    }
    return element;
  };
})();

// Lightweight protection for form value access
(function() {
  // Add a simple check without overriding core functionality
  if (window.HTMLInputElement) {
    const originalValueDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    if (originalValueDescriptor && originalValueDescriptor.get) {
      const originalGetter = originalValueDescriptor.get;
      Object.defineProperty(HTMLInputElement.prototype, 'value', {
        get: function() {
          try {
            if (!this || this === null || this === undefined) {
              return '';
            }
            return originalGetter.call(this);
          } catch (error) {
            console.warn('Error accessing input value:', error);
            return '';
          }
        },
        set: originalValueDescriptor.set,
        enumerable: true,
        configurable: true
      });
    }
  }
})();
