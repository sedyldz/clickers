import { createChip, type ChipData } from './Chip';
import { iconMap } from './categoryIcons';

export interface CategoryCardData {
  categoryName: string;
  categorySlug: string;
  viewerCount: string;
  viewerCountFull: string;
  iconName: string;
  backgroundColor: string;
  chips: ChipData[];
}

export function createCardCategory(data: CategoryCardData): HTMLElement {
  const { categoryName, viewerCount, iconName, backgroundColor, chips } = data;

  // Main card container
  const card = document.createElement('div');
  card.className = 'flex flex-col';

  // Image container (colored background with icon)
  const imageContainer = document.createElement('div');
  imageContainer.className = `aspect-[9/16] rounded-md overflow-hidden ${backgroundColor} flex items-center justify-center`;

  // Icon
  const iconContainer = document.createElement('div');
  iconContainer.className = '';

  // Get icon from icon map
  const iconCreator = iconMap[iconName];
  if (iconCreator) {
    const icon = iconCreator();
    iconContainer.appendChild(icon);
  }

  imageContainer.appendChild(iconContainer);

  // Content section (below the image)
  const contentSection = document.createElement('div');
  contentSection.className = 'mt-2 flex flex-col gap-1';

  // Category name
  const nameEl = document.createElement('div');
  nameEl.className = 'text-white font-bold text-sm md:text-base truncate';
  nameEl.textContent = categoryName;

  // Viewer count
  const viewerEl = document.createElement('div');
  viewerEl.className = 'text-white/70 text-xs';
  viewerEl.textContent = `${viewerCount} watching`;

  // Chips container
  const chipsContainer = document.createElement('div');
  chipsContainer.className = 'flex flex-wrap gap-1 mt-1';

  // Create chip elements
  chips.forEach((chipData) => {
    const chipEl = createChip(chipData);
    chipsContainer.appendChild(chipEl);
  });

  // Assemble content section
  contentSection.appendChild(nameEl);
  contentSection.appendChild(viewerEl);
  contentSection.appendChild(chipsContainer);

  // Assemble card
  card.appendChild(imageContainer);
  card.appendChild(contentSection);

  return card;
}

// Sample data for 8 categories
export const sampleCategoryData: CategoryCardData[] = [
  {
    categoryName: 'Fraud detection',
    categorySlug: 'fraud-detection',
    viewerCount: '173.1k',
    viewerCountFull: '173,142',
    iconName: 'shield',
    backgroundColor: 'bg-red-900',
    chips: [
      { label: 'Payment fraud', variant: 'red' },
      { label: 'Account sharing', variant: 'orange' },
    ],
  },
  {
    categoryName: 'Bot detection',
    categorySlug: 'bot-detection',
    viewerCount: '142.8k',
    viewerCountFull: '142,837',
    iconName: 'bot',
    backgroundColor: 'bg-orange-900',
    chips: [
      { label: 'Web scraping', variant: 'orange' },
      { label: 'Automated attacks', variant: 'red' },
    ],
  },
  {
    categoryName: 'Account security',
    categorySlug: 'account-security',
    viewerCount: '128.5k',
    viewerCountFull: '128,492',
    iconName: 'lock',
    backgroundColor: 'bg-blue-900',
    chips: [
      { label: 'Credential stuffing', variant: 'blue' },
      { label: 'Session hijacking', variant: 'purple' },
    ],
  },
  {
    categoryName: 'Payment protection',
    categorySlug: 'payment-protection',
    viewerCount: '96.3k',
    viewerCountFull: '96,284',
    iconName: 'creditCard',
    backgroundColor: 'bg-green-900',
    chips: [
      { label: 'Chargeback fraud', variant: 'green' },
      { label: 'Card testing', variant: 'red' },
    ],
  },
  {
    categoryName: 'Identity verification',
    categorySlug: 'identity-verification',
    viewerCount: '84.7k',
    viewerCountFull: '84,691',
    iconName: 'userCheck',
    backgroundColor: 'bg-purple-900',
    chips: [
      { label: 'KYC compliance', variant: 'purple' },
      { label: 'Age verification', variant: 'blue' },
    ],
  },
  {
    categoryName: 'Account takeover',
    categorySlug: 'account-takeover',
    viewerCount: '71.2k',
    viewerCountFull: '71,234',
    iconName: 'userX',
    backgroundColor: 'bg-red-800',
    chips: [
      { label: 'Reset abuse', variant: 'red' },
      { label: 'Social engineering', variant: 'orange' },
      { label: 'Phishing', variant: 'yellow' },
    ],
  },
  {
    categoryName: 'Login security',
    categorySlug: 'login-security',
    viewerCount: '58.9k',
    viewerCountFull: '58,921',
    iconName: 'key',
    backgroundColor: 'bg-teal-900',
    chips: [
      { label: 'Brute force', variant: 'teal' },
      { label: 'Multi-account abuse', variant: 'blue' },
    ],
  },
  {
    categoryName: 'User analytics',
    categorySlug: 'user-analytics',
    viewerCount: '45.6k',
    viewerCountFull: '45,638',
    iconName: 'analytics',
    backgroundColor: 'bg-pink-900',
    chips: [
      { label: 'Behavioral insights', variant: 'pink' },
      { label: 'Risk scoring', variant: 'purple' },
    ],
  },
];
