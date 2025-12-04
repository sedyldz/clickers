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
  card.className = 'relative aspect-[9/16] rounded-md overflow-hidden';

  // Colored background
  const bgLayer = document.createElement('div');
  bgLayer.className = `absolute inset-0 ${backgroundColor} flex items-center justify-center`;

  // Icon
  const iconContainer = document.createElement('div');
  iconContainer.className = 'w-8 h-8 text-white opacity-80';

  // Get icon from icon map
  const iconCreator = iconMap[iconName];
  if (iconCreator) {
    const icon = iconCreator();
    iconContainer.appendChild(icon);
  }

  bgLayer.appendChild(iconContainer);

  // Bottom overlay with gradient
  const overlay = document.createElement('div');
  overlay.className = `
    absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3
  `.trim().replace(/\s+/g, ' ');

  // Category name
  const nameEl = document.createElement('div');
  nameEl.className = 'text-white font-bold text-sm md:text-base mb-1 truncate';
  nameEl.textContent = categoryName;

  // Viewer count
  const viewerEl = document.createElement('div');
  viewerEl.className = 'text-white/70 text-xs mb-2';
  viewerEl.textContent = `${viewerCount} watching`;

  // Chips container
  const chipsContainer = document.createElement('div');
  chipsContainer.className = 'flex flex-wrap gap-1';

  // Create chip elements
  chips.forEach((chipData) => {
    const chipEl = createChip(chipData);
    chipsContainer.appendChild(chipEl);
  });

  // Assemble overlay
  overlay.appendChild(nameEl);
  overlay.appendChild(viewerEl);
  overlay.appendChild(chipsContainer);

  // Assemble card
  card.appendChild(bgLayer);
  card.appendChild(overlay);

  return card;
}

// Sample data for 8 categories
export const sampleCategoryData: CategoryCardData[] = [
  {
    categoryName: 'Fraud Detection',
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
    categoryName: 'Bot Detection',
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
    categoryName: 'Account Security',
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
    categoryName: 'Payment Protection',
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
    categoryName: 'Identity Verification',
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
    categoryName: 'Account Takeover',
    categorySlug: 'account-takeover',
    viewerCount: '71.2k',
    viewerCountFull: '71,234',
    iconName: 'userX',
    backgroundColor: 'bg-red-800',
    chips: [
      { label: 'Password reset abuse', variant: 'red' },
      { label: 'Social engineering', variant: 'orange' },
      { label: 'Phishing', variant: 'yellow' },
    ],
  },
  {
    categoryName: 'Login Security',
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
    categoryName: 'User Analytics',
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
