/**
 * Advanced Page Transition Manager with Barba.js
 * Optimized for performance and smooth integration with Three.js and shaders
 */
import barba from '@barba/core';
import { gsap } from 'gsap';

class PageTransitionManager {
    constructor() {
        this.init();
    }

    init() {
        const overlay = document.createElement('div');
        overlay.className = 'transition-overlay';
        document.body.appendChild(overlay);

        barba.hooks.once((data) => {
            gsap.to(data.next.container, { 
                opacity: 1,
                duration: 0.5
            });
        });

        barba.init({
            sync: true,
            transitions: [{
                name: 'default-transition',
                leave: (data) => {
                    document.body.classList.add('is-transitioning');
                    return gsap.to(overlay, {
                        duration: 0.8,
                        y: '0%',
                        ease: 'power2.inOut'
                    });
                },
                enter: (data) => {
                    gsap.to(data.next.container, { 
                        opacity: 1,
                        duration: 0.5,
                        delay: 0.3
                    });
                    return gsap.to(overlay, {
                        duration: 0.8,
                        y: '-100%',
                        ease: 'power2.inOut',
                        delay: 0.2
                    });
                },
                after: (data) => {
                    // Reset overlay position and remove class
                    gsap.set(overlay, { y: '100%' });
                    document.body.classList.remove('is-transitioning');
                }
            }]
        });
    }
}

export default PageTransitionManager;
