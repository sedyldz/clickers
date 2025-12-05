import { createCardCategory, sampleCategoryData, type CategoryCardData } from './CardCategory';

export interface CategorySectionOptions {
  categories?: CategoryCardData[];
}

export function createCategorySection(options: CategorySectionOptions = {}) {
  const { categories = sampleCategoryData } = options;

  // Section wrapper
  const root = document.createElement('section');
  root.className = 'w-full px-4 md:px-6 py-6 md:py-8';

  // Section title
  const title = document.createElement('h2');
  title.className = 'text-base font-medium text-white mb-4 md:mb-6';
  title.textContent = 'Top live categories';

  // Grid container
  const grid = document.createElement('div');
  grid.className = `
    grid grid-cols-8 gap-3 md:gap-4
  `.trim().replace(/\s+/g, ' ');

  // Create category cards
  categories.forEach((categoryData) => {
    const card = createCardCategory(categoryData);
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
