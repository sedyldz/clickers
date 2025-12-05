import { iconMap } from './categoryIcons';

export interface GenericCardData {
  title: string;
  description: string;
  iconName: string;
  backgroundColor: string;
}

export function createCardGeneric(data: GenericCardData): HTMLElement {
  const { title, description, iconName, backgroundColor } = data;

  // Main card container
  const card = document.createElement('div');
  card.className = 'flex flex-col';

  // Icon container (square aspect ratio with colored background)
  const iconContainer = document.createElement('div');
  iconContainer.className = `aspect-square rounded-md overflow-hidden ${backgroundColor} flex items-center justify-center`;

  // Icon
  const iconWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  iconWrapper.setAttribute('class', '');

  // Get icon from icon map
  const iconCreator = iconMap[iconName];
  if (iconCreator) {
    const icon = iconCreator();
    iconContainer.appendChild(icon);
  }

  // Content section (below the icon)
  const contentSection = document.createElement('div');
  contentSection.className = 'mt-2 flex flex-col gap-1';

  // Title
  const titleEl = document.createElement('div');
  titleEl.className = 'text-white font-bold text-sm md:text-base truncate';
  titleEl.textContent = title;

  // Description
  const descriptionEl = document.createElement('div');
  descriptionEl.className = 'text-white/70 text-xs line-clamp-2';
  descriptionEl.textContent = description;

  // Assemble content section
  contentSection.appendChild(titleEl);
  contentSection.appendChild(descriptionEl);

  // Assemble card
  card.appendChild(iconContainer);
  card.appendChild(contentSection);

  return card;
}
