# Project Overview

Laravel portfolio website showcasing projects and work.

## Key Components

- Portfolio pages for different projects (e.g. Grower AI)
- Navigation component with mobile responsiveness
- Smooth scroll functionality for desktop
- Custom cursor and animations

## Development Guidelines

- Use Laravel blade templates for views
- Keep JavaScript minimal and focused on animations/interactions
- CSS follows SCSS architecture with partials
- Mobile-first responsive design

## Project Structure

- `/resources/views` - Blade templates and components
- `/public/assets` - Static assets (js, images)
- `/routes` - Web routes
- `/app` - PHP application code

### CSS Architecture

The CSS is organized using SCSS partials in `/resources/css/partials/`:
- `_variables.scss` - Global variables and custom properties
- `_base.scss` - Reset and base element styles
- `_animations.scss` - Keyframes and animation utilities
- `_components.scss` - Reusable UI components

Build process:
1. SCSS files are compiled using Vite
2. Source files in `/resources/css`
3. Output is generated to `/public/build`

## Common Tasks

### Adding a New Portfolio Project

1. Create blade template in `/resources/views/portfolio/`
2. Add route in `routes/web.php`
3. Add navigation link in `resources/views/component/navigation.blade.php`
4. Include relevant assets in `/public/assets`

### Style Guidelines

- Use variables from _variables.scss
- Follow mobile-first approach
- Add new components to appropriate partial files
- Maintain consistent naming conventions
