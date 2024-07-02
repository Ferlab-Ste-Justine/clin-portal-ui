const fs = require('fs');
const path = require('path');

// eslint-disable-next-line no-undef
const STYLE_PATH = path.join(__dirname, '../src/style/themes/clin');
const LESS_INPUT_FILE = path.join(STYLE_PATH, 'colors.less');
const CSS_OUTPUT_FILE = path.join(STYLE_PATH, 'dist', 'colors.css');

// Get less file
const less = fs.readFileSync(LESS_INPUT_FILE);

// Replace var declaration (@something to --something)
let css = less.toString().replace(/@([^:\s]+):/g, '\t--$1:');

// Replace var assignation (@something to --something)
css = css.replace(/:\s*@(.*);/g, ': var(--$1);');

// Replace comments (// to /* ... */)
css = css.replace(/\/\/(.+)/g, '\t/*$1: */');

// Add :root
css = ':root{\n' + css + '\n}';

// Write css file
fs.writeFileSync(CSS_OUTPUT_FILE, css);
