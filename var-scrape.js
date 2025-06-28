#!/usr/bin/env node
/**
 * variables-scrape.js
 *
 * This script scans all .css files and all .php files (searching for inline <style> tags)
 * to extract CSS variable declarations (any declaration with a property starting with "--").
 * All found variables are merged (if a variable is defined more than once, the last encountered value is used)
 * and output into a file named "variables-scraped.css" inside a :root selector.
 *
 * Usage: node variables-scrape.js
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const glob = require('glob');
import postcss from 'postcss';

// Object to hold the variables. Keys are variable names and values are their definitions.
const variableMap = {};

// Array to hold CSS sources; each source is an object { file, content }.
const cssSources = [];

// ---------------------------------------------------------------------------
// 1. Gather all CSS files.
const cssFiles = glob.sync("**/*.css", {
  ignore: ["node_modules/**", "vendor/**", "public/vendor/**"]
});
cssFiles.forEach(file => {
  try {
    const cssContent = fs.readFileSync(file, 'utf8');
    cssSources.push({ file, content: cssContent });
  } catch (error) {
    console.error(`Error reading CSS file ${file}:`, error);
  }
});

// ---------------------------------------------------------------------------
// 2. Gather inline CSS from PHP files (e.g., Blade templates).
const phpFiles = glob.sync("**/*.php", {
  ignore: ["node_modules/**", "vendor/**", "public/vendor/**"]
});
const styleTagRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
phpFiles.forEach(file => {
  try {
    const phpContent = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = styleTagRegex.exec(phpContent)) !== null) {
      // match[1] contains the CSS inside the <style> tag.
      const inlineCSS = match[1].trim();
      if (inlineCSS) {
        cssSources.push({ file: `${file} [inline style]`, content: inlineCSS });
      }
    }
  } catch (error) {
    console.error(`Error reading PHP file ${file}:`, error);
  }
});

// ---------------------------------------------------------------------------
// 3. Process each CSS source to extract CSS variables.
cssSources.forEach(source => {
  try {
    const root = postcss.parse(source.content, { from: source.file });
    // Walk through all declarations in the AST.
    root.walkDecls(decl => {
      // Check if the property starts with '--' (CSS variable)
      if (decl.prop && decl.prop.startsWith('--')) {
        // Record or override the variable's value.
        variableMap[decl.prop] = decl.value.trim();
      }
    });
  } catch (error) {
    console.error(`Error processing CSS from ${source.file}:`, error);
  }
});

// ---------------------------------------------------------------------------
// 4. Build the output string with all scraped variables grouped under :root.
let outputCSS = "/* Variables scraped from CSS and PHP files */\n";
outputCSS += ":root {\n";
for (const variable in variableMap) {
  outputCSS += `    ${variable}: ${variableMap[variable]};\n`;
}
outputCSS += "}\n";

// ---------------------------------------------------------------------------
// 5. Write the output to variables-scraped.css in the project root.
const outputPath = path.join(process.cwd(), 'variables-scraped.css');
fs.writeFileSync(outputPath, outputCSS, 'utf8');

console.log(`Scraped ${Object.keys(variableMap).length} CSS variable(s).`);
console.log(`Output written to: ${outputPath}`);