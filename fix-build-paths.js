import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';

// Read the built HTML
let html = readFileSync('dist/visualization.html', 'utf-8');

// Check if paths need fixing (still have /src/ paths)
if (html.includes('/src/visualization.css') || html.includes('/src/visualization.ts')) {
  // Find the built CSS and JS files
  const cssFiles = globSync('dist/assets/visualization-*.css');
  const jsFiles = globSync('dist/assets/visualization-*.js');

  if (cssFiles.length === 0 || jsFiles.length === 0) {
    console.error('Could not find built assets');
    process.exit(1);
  }

  const cssFile = cssFiles[0].replace('dist/', '');
  const jsFile = jsFiles[0].replace('dist/', '');

  // Replace the paths
  html = html.replace(
    /href="\/src\/visualization\.css"/g,
    `href="./${cssFile}"`
  );
  html = html.replace(
    /src="\/src\/visualization\.ts"/g,
    `src="./${jsFile}"`
  );

  // Write back
  writeFileSync('dist/visualization.html', html);
  console.log('Fixed paths in visualization.html');
} else {
  console.log('Paths in visualization.html are already correct');
}

