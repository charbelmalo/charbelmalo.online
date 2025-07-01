/**
 * Main Application Integration
 * Initializes the Page Transition Manager
 */
import PageTransitionManager from './page-transition-manager.js';

class ApplicationManager {
    constructor() {
        this.pageTransitionManager = null;
        this.init();
    }

    init() {
        // The PageTransitionManager now handles its own initialization.
        this.pageTransitionManager = new PageTransitionManager();
        console.log('Application initialized with PageTransitionManager.');
    }
}

// Initialize the application
new ApplicationManager();
