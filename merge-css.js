#!/usr/bin/env node
/**
 * merge-css.js
 *
 * This script scans all CSS files in the Laravel project directory (excluding node_modules, vendor, etc.)
 * and also scans all .php files (including Blade templates) for any <style> tags, extracts the CSS,
 * and merges class definitions into one merged.css file while detecting conflicts.
 *
 * It takes into account context such as @media queries or parent at‑rules so that nested rules are wrapped accordingly.
 *
 * If a class (or any selector that includes a class) has conflicting definitions (different style rules) within the same context,
 * the script will output the winning (last defined) rule into merged.css (simulating the browser cascade)
 * and all conflicting definitions (with source file and order details) into conflicting.css.
 *
 * Usage: node merge-css.js
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const glob = require('glob');
import postcss from 'postcss';

// Global order counter to simulate cascade (later rules override earlier ones)
let orderCounter = 0;

// The classMap stores entries keyed by a composite of selector and its context.
// Key format: "<selector>|<context1>||<context2>||..."
// Each entry holds: { selector, context: Array, definitions: Map(normalizedDeclaration => Array of { file, declarations, order }) }
const classMap = {};

/**
 * Recursively processes nodes. If a node is a rule whose selector contains at least one class,
 * it records its normalized declarations along with its context (i.e., any wrapping at‑rules).
 *
 * @param {Array} nodes - PostCSS nodes to process.
 * @param {Array} context - An array of strings representing wrapping at‑rules (e.g. ["@media (max-width: 600px)"]).
 * @param {string} file - The source file for these nodes.
 */
function processNodes(nodes, context, file) {
  for (const node of nodes) {
    if (node.type === 'rule') {
      // Process each selector (handles comma-separated selectors)
      const selectors = node.selector.split(',').map(s => s.trim());
      for (const selector of selectors) {
        // Process any selector that contains at least one class.
        if (selector.match(/\.[A-Za-z0-9_-]+/)) {
          orderCounter++;
          const normalized = normalizeDeclarations(node.nodes);
          const ruleKey = `${selector}|${context.join('||')}`; // composite key including context

          // Create new entry if it doesn't exist.
          if (!classMap[ruleKey]) {
            classMap[ruleKey] = { selector, context: [...context], definitions: new Map() };
          }
          // Store definitions keyed by normalized declarations.
          if (!classMap[ruleKey].definitions.has(normalized)) {
            classMap[ruleKey].definitions.set(normalized, []);
          }
          classMap[ruleKey].definitions.get(normalized).push({
            file,
            declarations: getDeclarations(node.nodes),
            order: orderCounter,
          });
        }
      }
    } else if (node.type === 'atrule' && node.nodes) {
      // For at‑rules (like @media), add the at‑rule text to the context and process child nodes.
      const atRuleString = `@${node.name} ${node.params}`.trim();
      processNodes(node.nodes, [...context, atRuleString], file);
    }
    // Other node types (e.g., comments) are ignored.
  }
}

/**
 * Normalize declarations: filter decl nodes, trim and sort them,
 * then output as a JSON string so that order/spacing differences are normalized.
 *
 * @param {Array} nodes - PostCSS nodes.
 * @returns {string} A JSON string representing the normalized declarations.
 */
function normalizeDeclarations(nodes) {
  const decls = nodes
    .filter(node => node.type === 'decl')
    .map(decl => ({
      prop: decl.prop.trim(),
      value: decl.value.trim()
    }));
  decls.sort((a, b) => a.prop.localeCompare(b.prop));
  return JSON.stringify(decls);
}

/**
 * Extracts declarations (array of objects with prop and value) from nodes.
 *
 * @param {Array} nodes - PostCSS nodes.
 * @returns {Array} Sorted array of declarations.
 */
function getDeclarations(nodes) {
  const decls = nodes
    .filter(node => node.type === 'decl')
    .map(decl => ({ prop: decl.prop.trim(), value: decl.value.trim() }));
  decls.sort((a, b) => a.prop.localeCompare(b.prop));
  return decls;
}

/**
 * Generates a CSS rule string from a selector and its declarations.
 *
 * @param {string} selector - The CSS selector.
 * @param {Array} declarations - Array of declaration objects.
 * @returns {string} A string containing the CSS rule.
 */
function generateRule(selector, declarations) {
  let ruleStr = `${selector} {\n`;
  declarations.forEach(decl => {
    ruleStr += `    ${decl.prop}: ${decl.value};\n`;
  });
  ruleStr += `}\n`;
  return ruleStr;
}

/**
 * Wraps a CSS rule with the provided context (e.g., at‑rule wrappers).
 *
 * @param {Array} contextArr - Array of context strings (e.g. ["@media (max-width: 600px)"]).
 * @param {string} ruleContent - The inner CSS rule.
 * @returns {string} The rule wrapped in the context blocks.
 */
function wrapWithContext(contextArr, ruleContent) {
  let output = ruleContent;
  for (let i = contextArr.length - 1; i >= 0; i--) {
    output = `${contextArr[i]} {\n${indent(output, 1)}\n}\n`;
  }
  return output;
}

/**
 * Indents each line of text by the given indent level.
 *
 * @param {string} text - Text to indent.
 * @param {number} level - Indentation level.
 * @returns {string} Indented text.
 */
function indent(text, level) {
  const indentStr = '    '.repeat(level);
  return text.split('\n').map(line => (line ? indentStr + line : line)).join('\n');
}

// ---------------------------------------------------------------------------
// Gather CSS from both .css files and inline CSS from .php files.
// ---------------------------------------------------------------------------

// Array to hold CSS sources; each source is an object { file, content }.
const cssSources = [];

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
        // Mark the source as inline CSS from the PHP file.
        cssSources.push({ file: `${file} [inline style]`, content: inlineCSS });
      }
    }
  } catch (error) {
    console.error(`Error reading PHP file ${file}:`, error);
  }
});

// Process each CSS source.
cssSources.forEach(source => {
  try {
    const root = postcss.parse(source.content, { from: source.file });
    processNodes(root.nodes, [], source.file);
  } catch (error) {
    console.error(`Error processing CSS from ${source.file}:`, error);
  }
});

// ---------------------------------------------------------------------------
// Build output CSS strings: merged.css and conflicting.css.
// ---------------------------------------------------------------------------

let mergedCSS = '';
let conflictCSS = '';

// Iterate over each composite rule (selector + context).
for (const ruleKey in classMap) {
  const entry = classMap[ruleKey];
  if (entry.definitions.size === 1) {
    // No conflict: even if defined in multiple sources, definitions are identical.
    const [normalized, defs] = Array.from(entry.definitions.entries())[0];
    // Sort by order and pick the last one (as the browser would).
    defs.sort((a, b) => a.order - b.order);
    const effective = defs[defs.length - 1];
    let ruleContent = generateRule(entry.selector, effective.declarations);
    ruleContent = wrapWithContext(entry.context, ruleContent);
    mergedCSS += ruleContent + "\n";
  } else {
    // Conflict detected: multiple unique definitions for the same selector in the same context.
    let allDefs = [];
    entry.definitions.forEach((defs) => {
      allDefs = allDefs.concat(defs);
    });
    // Sort by order and pick the last one as the effective rule.
    allDefs.sort((a, b) => a.order - b.order);
    const effective = allDefs[allDefs.length - 1];
    let ruleContent = generateRule(entry.selector, effective.declarations);
    ruleContent = wrapWithContext(entry.context, ruleContent);
    mergedCSS += ruleContent + "\n";

    // Record all conflicting definitions.
    conflictCSS += `/* Conflict detected for ${entry.selector} in context ${entry.context.join(' > ') || 'global'} */\n`;
    entry.definitions.forEach((defs, normalized) => {
      defs.sort((a, b) => a.order - b.order);
      const defEffective = defs[defs.length - 1];
      let conflictRule = generateRule(entry.selector, defEffective.declarations);
      conflictRule = wrapWithContext(entry.context, conflictRule);
      conflictCSS += `/* Definition from file: ${defEffective.file}, order: ${defEffective.order} */\n`;
      conflictCSS += conflictRule + "\n";
    });
    conflictCSS += "\n";
  }
}

// Write the output files to the project root.
fs.writeFileSync(path.join(process.cwd(), 'merged.css'), mergedCSS, 'utf8');
fs.writeFileSync(path.join(process.cwd(), 'conflicting.css'), conflictCSS, 'utf8');

console.log(`Processed ${cssSources.length} CSS source(s) from CSS and PHP files.`);
console.log(`Merged CSS output to: ${path.join(process.cwd(), 'merged.css')}`);
console.log(`Conflicting CSS output to: ${path.join(process.cwd(), 'conflicting.css')}`);