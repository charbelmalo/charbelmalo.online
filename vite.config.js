import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            // Change input from app.css to main.scss
            input: ['resources/css/main.scss', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
});
