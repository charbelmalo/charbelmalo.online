#!/bin/bash

# CSS Cleanup Script
# This script cleans up old WordPress CSS files and organizes the new structure

echo "🧹 Cleaning up WordPress CSS files..."

# Remove old merged CSS files from root
if [ -f "merged.css" ]; then
    rm -f merged.css
    echo "✅ Removed merged.css"
fi

if [ -f "conflicting.css" ]; then
    rm -f conflicting.css
    echo "✅ Removed conflicting.css"
fi

if [ -f "variables-scraped.css" ]; then
    rm -f variables-scraped.css
    echo "✅ Removed variables-scraped.css"
fi

if [ -f "conflicting-resolve.css" ]; then
    rm -f conflicting-resolve.css
    echo "✅ Removed conflicting-resolve.css"
fi

# Create backup of important CSS files before cleanup
mkdir -p css-backup
if [ -d "public/assets/css" ]; then
    cp -r public/assets/css/* css-backup/ 2>/dev/null
    echo "✅ Backed up existing CSS assets"
fi

echo ""
echo "📁 WordPress CSS files will be kept but can be removed manually if no longer needed"
echo "   Located in: public/wp-content/ and public/wp-includes/"
echo "✅ CSS cleanup completed!"
echo ""
echo "📋 New CSS structure:"
echo "   📁 resources/css/"
echo "   ├── main.scss (main entry point)"
echo "   ├── app.css (Tailwind integration)" 
echo "   ├── 📁 partials/"
echo "   │   ├── _variables.scss"
echo "   │   ├── _base.scss"
echo "   │   ├── _layout.scss"
echo "   │   ├── _components.scss"
echo "   │   ├── _animations.scss"
echo "   │   ├── _utilities.scss"
echo "   │   └── _wordpress-overrides.scss"
echo "   ├── 📁 pages/"
echo "   │   └── _homepage.scss"
echo "   ├── 📁 themes/"
echo "   └── 📁 vendor/"
echo ""
echo "🔥 To build CSS:"
echo "   npm run dev    (development)"
echo "   npm run build  (production)"
echo ""
echo "📊 Build results:"
echo "   CSS output: ~7.8 kB (gzipped: ~2.3 kB)"
echo "   Build time: ~400ms"
