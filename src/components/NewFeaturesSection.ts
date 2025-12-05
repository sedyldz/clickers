import { createCardGeneric, type GenericCardData } from './CardGeneric';

export interface NewFeaturesSectionOptions {
  features?: GenericCardData[];
}

// Sample feature data highlighting mouse movement analysis
export const sampleFeatureData: GenericCardData[] = [
  {
    title: 'Jitter detection',
    description: 'Smoothness and deviation tracking',
    iconName: 'mouse',
    backgroundColor: 'bg-orange-700',
  },
  {
    title: 'Speed analysis',
    description: 'Velocity and acceleration patterns',
    iconName: 'mouse',
    backgroundColor: 'bg-yellow-600',
  },
  {
    title: 'Curvature metrics',
    description: 'Path and overshooting analysis',
    iconName: 'mouse',
    backgroundColor: 'bg-orange-600',
  },
  {
    title: 'Scroll tracking',
    description: 'Depth and velocity measurement',
    iconName: 'mouse',
    backgroundColor: 'bg-yellow-700',
  },
  {
    title: 'Interaction timing',
    description: 'Event and delay analysis',
    iconName: 'timer',
    backgroundColor: 'bg-orange-800',
  },
  {
    title: 'Event inspection',
    description: 'Missing events detection',
    iconName: 'eye',
    backgroundColor: 'bg-yellow-800',
  },
  {
    title: 'Screen properties',
    description: 'Viewport and device information',
    iconName: 'eye',
    backgroundColor: 'bg-yellow-600',
  },
];

export function createNewFeaturesSection(options: NewFeaturesSectionOptions = {}) {
  const { features = sampleFeatureData } = options;

  // Section wrapper
  const root = document.createElement('section');
  root.className = 'w-full px-4 md:px-6 py-6 md:py-8';

  // Section title
  const title = document.createElement('h2');
  title.className = 'text-base font-medium text-white mb-4 md:mb-6';
  title.textContent = 'New features';

  // Grid container (7 columns)
  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-7 gap-3 md:gap-4';

  // Create feature cards
  features.forEach((featureData) => {
    const card = createCardGeneric(featureData);
    grid.appendChild(card);
  });

  // Assemble section
  root.appendChild(title);
  root.appendChild(grid);

  return {
    root,
    grid,
    title,
  };
}
