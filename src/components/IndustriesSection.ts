import { createCardGeneric, type GenericCardData } from './CardGeneric';

export interface IndustriesSectionOptions {
  industries?: GenericCardData[];
}

// Sample industry data
export const sampleIndustryData: GenericCardData[] = [
  {
    title: 'Fintech',
    description: 'Secure financial transactions',
    iconName: 'building',
    backgroundColor: 'bg-blue-900',
  },
  {
    title: 'E-commerce',
    description: 'Protect online retail',
    iconName: 'shoppingCart',
    backgroundColor: 'bg-purple-900',
  },
  {
    title: 'Buy now pay later (BNPL)',
    description: 'Prevent payment fraud',
    iconName: 'clock',
    backgroundColor: 'bg-green-900',
  },
  {
    title: 'Online gaming & gambling',
    description: 'Fair play enforcement',
    iconName: 'gamepad',
    backgroundColor: 'bg-teal-900',
  },
  {
    title: 'Cryptocurrency',
    description: 'Secure digital assets',
    iconName: 'coins',
    backgroundColor: 'bg-orange-900',
  },
];

export function createIndustriesSection(options: IndustriesSectionOptions = {}) {
  const { industries = sampleIndustryData } = options;

  // Section wrapper
  const root = document.createElement('section');
  root.className = 'w-full px-4 md:px-6 py-6 md:py-8';

  // Section title
  const title = document.createElement('h2');
  title.className = 'text-base font-medium text-white mb-4 md:mb-6';
  title.textContent = 'Industries';

  // Grid container (5 columns, perfect fit for 5 cards)
  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-5 gap-3 md:gap-4';

  // Create industry cards
  industries.forEach((industryData) => {
    const card = createCardGeneric(industryData);
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
