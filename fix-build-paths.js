import { readFileSync, writeFileSync, readdirSync } from 'fs';

// Read the built HTML
let html = readFileSync('dist/visualization.html', 'utf-8');

// Check if paths need fixing (still have /src/ paths)
if (html.includes('/src/visualization.css') || html.includes('/src/visualization.ts')) {
  // Find the built CSS and JS files using built-in fs
  const assetsDir = 'dist/assets';
  const files = readdirSync(assetsDir);
  
  const cssFile = files.find(f => f.startsWith('visualization-') && f.endsWith('.css'));
  const jsFile = files.find(f => f.startsWith('visualization-') && f.endsWith('.js'));

  if (!cssFile || !jsFile) {
    console.error('Could not find built assets');
    process.exit(1);
  }

  // Replace the paths
  html = html.replace(
    /href="\/src\/visualization\.css"/g,
    `href="./assets/${cssFile}"`
  );
  html = html.replace(
    /src="\/src\/visualization\.ts"/g,
    `src="./assets/${jsFile}"`
  );

  // Write back
  writeFileSync('dist/visualization.html', html);
  console.log('Fixed paths in visualization.html');
} else {
  console.log('Paths in visualization.html are already correct');
}

