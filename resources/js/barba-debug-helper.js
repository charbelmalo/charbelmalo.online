/**
 * Barba.js Transition Debug Helper
 * Use this in development to identify transition issues
 */
class BarbaDebugHelper {
    constructor() {
        this.isDebugMode = process.env.NODE_ENV === 'development';
        this.transitionLog = [];
        
        if (this.isDebugMode) {
            this.init();
        }
    }

    init() {
        console.log('🔧 Barba.js Debug Helper initialized');
        this.addDebugStyles();
        this.setupDebugHooks();
        this.addDebugControls();
    }

    addDebugStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .barba-debug-info {
                position: fixed;
                top: 10px;
                right: 10px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 10px;
                font-family: monospace;
                font-size: 12px;
                z-index: 10000;
                border-radius: 4px;
                max-width: 300px;
                opacity: 0;
                transition: opacity 0.3s;
            }

            .barba-debug-info.visible {
                opacity: 1;
            }

            .barba-debug-toggle {
                position: fixed;
                bottom: 10px;
                right: 10px;
                background: #00ffff;
                color: black;
                border: none;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 11px;
                z-index: 10001;
                cursor: pointer;
            }

            .is-transitioning [data-barba="container"] {
                outline: 2px solid red !important;
                outline-offset: -2px;
            }

            .barba-leave {
                outline: 2px solid orange !important;
            }

            .barba-enter {
                outline: 2px solid green !important;
            }
        `;
        document.head.appendChild(style);
    }

    setupDebugHooks() {
        if (typeof barba === 'undefined') {
            setTimeout(() => this.setupDebugHooks(), 100);
            return;
        }

        const startTime = performance.now();

        barba.hooks.before((data) => {
            console.log('🔄 Barba transition starting', data);
            this.logTransition('before', data);
            this.updateDebugInfo('Transition starting...');
        });

        barba.hooks.beforeLeave((data) => {
            console.log('👋 Before leave', data);
            this.logTransition('beforeLeave', data);
            this.updateDebugInfo('Leaving current page...');
        });

        barba.hooks.leave((data) => {
            console.log('🚪 Leave animation', data);
            this.logTransition('leave', data);
            this.updateDebugInfo('Leave animation running...');
        });

        barba.hooks.afterLeave((data) => {
            console.log('✅ After leave', data);
            this.logTransition('afterLeave', data);
            this.updateDebugInfo('Leave animation complete');
        });

        barba.hooks.beforeEnter((data) => {
            console.log('🚪 Before enter', data);
            this.logTransition('beforeEnter', data);
            this.updateDebugInfo('Preparing new page...');
        });

        barba.hooks.enter((data) => {
            console.log('👋 Enter animation', data);
            this.logTransition('enter', data);
            this.updateDebugInfo('Enter animation running...');
        });

        barba.hooks.afterEnter((data) => {
            console.log('✅ After enter', data);
            this.logTransition('afterEnter', data);
            this.updateDebugInfo('Enter animation complete');
        });

        barba.hooks.after((data) => {
            const endTime = performance.now();
            const duration = endTime - startTime;
            console.log(`🏁 Transition complete in ${duration.toFixed(2)}ms`, data);
            this.logTransition('after', data, duration);
            this.updateDebugInfo(`Transition complete (${duration.toFixed(2)}ms)`);
            
            setTimeout(() => {
                this.hideDebugInfo();
            }, 2000);
        });
    }

    addDebugControls() {
        // Add debug info panel
        const debugInfo = document.createElement('div');
        debugInfo.className = 'barba-debug-info';
        debugInfo.innerHTML = 'Barba.js Debug Ready';
        document.body.appendChild(debugInfo);

        // Add toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'barba-debug-toggle';
        toggleButton.textContent = 'Debug';
        toggleButton.addEventListener('click', () => {
            this.toggleDebugInfo();
        });
        document.body.appendChild(toggleButton);

        // Add keyboard shortcut
        document.addEventListener('keydown', (e) => {
            if (e.key === 'b' && e.ctrlKey) {
                e.preventDefault();
                this.toggleDebugInfo();
            }
        });
    }

    logTransition(hook, data, duration) {
        this.transitionLog.push({
            timestamp: Date.now(),
            hook,
            from: data.current?.namespace || 'unknown',
            to: data.next?.namespace || 'unknown',
            url: data.next?.url || 'unknown',
            duration: duration || null
        });

        // Keep only last 20 transitions
        if (this.transitionLog.length > 20) {
            this.transitionLog.shift();
        }
    }

    updateDebugInfo(message) {
        const debugInfo = document.querySelector('.barba-debug-info');
        if (debugInfo) {
            const now = new Date().toLocaleTimeString();
            debugInfo.innerHTML = `
                <strong>Barba.js Debug</strong><br>
                ${now}: ${message}<br>
                <small>Press Ctrl+B to toggle</small>
            `;
            debugInfo.classList.add('visible');
        }
    }

    hideDebugInfo() {
        const debugInfo = document.querySelector('.barba-debug-info');
        if (debugInfo) {
            debugInfo.classList.remove('visible');
        }
    }

    toggleDebugInfo() {
        const debugInfo = document.querySelector('.barba-debug-info');
        if (debugInfo) {
            if (debugInfo.classList.contains('visible')) {
                this.hideDebugInfo();
            } else {
                this.showTransitionLog();
            }
        }
    }

    showTransitionLog() {
        const debugInfo = document.querySelector('.barba-debug-info');
        if (debugInfo) {
            const recentTransitions = this.transitionLog.slice(-5);
            let logHtml = '<strong>Recent Transitions:</strong><br>';
            
            recentTransitions.forEach(log => {
                const time = new Date(log.timestamp).toLocaleTimeString();
                logHtml += `${time}: ${log.hook} (${log.from} → ${log.to})`;
                if (log.duration) {
                    logHtml += ` ${log.duration.toFixed(2)}ms`;
                }
                logHtml += '<br>';
            });
            
            logHtml += '<small>Press Ctrl+B to hide</small>';
            debugInfo.innerHTML = logHtml;
            debugInfo.classList.add('visible');
        }
    }

    // Public API for manual debugging
    getTransitionLog() {
        return this.transitionLog;
    }

    checkForIssues() {
        const issues = [];
        
        // Check for missing containers
        const containers = document.querySelectorAll('[data-barba="container"]');
        if (containers.length === 0) {
            issues.push('No Barba containers found');
        }

        // Check for multiple containers
        if (containers.length > 1) {
            issues.push(`Multiple Barba containers found: ${containers.length}`);
        }

        // Check for missing wrapper
        const wrapper = document.querySelector('[data-barba="wrapper"]');
        if (!wrapper) {
            issues.push('No Barba wrapper found');
        }

        // Check for transition duration issues
        const recentTransitions = this.transitionLog.slice(-3);
        const slowTransitions = recentTransitions.filter(t => t.duration && t.duration > 1000);
        if (slowTransitions.length > 0) {
            issues.push(`Slow transitions detected: ${slowTransitions.length}`);
        }

        return issues;
    }
}

// Initialize debug helper in development
if (process.env.NODE_ENV === 'development') {
    window.barbaDebugHelper = new BarbaDebugHelper();
    
    // Add global debug functions
    window.checkBarbaIssues = () => {
        const issues = window.barbaDebugHelper.checkForIssues();
        if (issues.length === 0) {
            console.log('✅ No Barba.js issues detected');
        } else {
            console.warn('⚠️ Barba.js issues detected:', issues);
        }
        return issues;
    };
    
    window.getBarbaLog = () => {
        return window.barbaDebugHelper.getTransitionLog();
    };
}

export default BarbaDebugHelper;
