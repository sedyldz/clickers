import { createCardGeneric, type GenericCardData } from './CardGeneric';

export interface UseCasesSectionOptions {
  useCases?: GenericCardData[];
}

// Sample use case data from PROTECT and GROW columns
export const sampleUseCaseData: GenericCardData[] = [
  {
    title: 'Payment fraud',
    description: 'Reduce fraud. Increase real payments.',
    iconName: 'creditCard',
    backgroundColor: 'bg-red-900',
  },
  {
    title: 'Account takeover',
    description: 'Prevent attacks without hindering UX.',
    iconName: 'userX',
    backgroundColor: 'bg-orange-900',
  },
  {
    title: 'SMS fraud',
    description: 'Stop SMS fraud and SMS pumping.',
    iconName: 'phone',
    backgroundColor: 'bg-red-800',
  },
  {
    title: 'New account fraud',
    description: 'Stop repeat signups and trial abuse.',
    iconName: 'userPlus',
    backgroundColor: 'bg-orange-800',
  },
  {
    title: 'Returning user experience',
    description: 'Tailor experiences. Remove friction.',
    iconName: 'sparkles',
    backgroundColor: 'bg-red-900',
  },
  {
    title: 'Account sharing prevention',
    description: 'Convert users into paying customers.',
    iconName: 'users',
    backgroundColor: 'bg-orange-900',
  },
  {
    title: 'Paywall',
    description: 'Eliminate bypass techniques.',
    iconName: 'ban',
    backgroundColor: 'bg-red-800',
  },
];

export function createUseCasesSection(options: UseCasesSectionOptions = {}) {
  const { useCases = sampleUseCaseData } = options;

  // Section wrapper
  const root = document.createElement('section');
  root.className = 'w-full px-4 md:px-6 py-6 md:py-8';

  // Section title
  const title = document.createElement('h2');
  title.className = 'text-base font-medium text-white mb-4 md:mb-6';
  title.textContent = 'Use cases';

  // Grid container (7 columns, all cards in one row)
  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-7 gap-3 md:gap-4';

  // Create use case cards
  useCases.forEach((useCaseData) => {
    const card = createCardGeneric(useCaseData);
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
