import { createCardLive, sampleCardLiveData, type CardLiveData } from './CardLive';
import { createSidebarNav, defaultNavItems, type NavItem } from './SidebarNav';

export interface SidebarOptions {
  width?: string;
  liveChannels?: CardLiveData[];
  navItems?: NavItem[];
}

export function createSidebar(options: SidebarOptions = {}) {
  const {
    width = '240px',
    liveChannels = sampleCardLiveData,
    navItems = defaultNavItems
  } = options;

  // Main sidebar wrapper
  const wrapper = document.createElement('div');
  wrapper.id = 'sidebar-wrapper';
  wrapper.className = `
    bg-surface-lowest flex shrink-0 flex-col overflow-hidden
    absolute bottom-0 left-0 top-0 z-[401] h-full
    xl:relative xl:inset-0 xl:max-h-full
  `.trim().replace(/\s+/g, ' ');
  wrapper.style.width = `var(--sidebar-expanded-width, ${width})`;
  wrapper.setAttribute('data-nosnippet', 'true');

  // Navigation section
  const nav = createSidebarNav(navItems);
  wrapper.appendChild(nav);

  // Divider
  const divider1 = document.createElement('div');
  divider1.className = 'w-full px-3';
  const dividerLine1 = document.createElement('div');
  dividerLine1.className = 'bg-outline-decorative h-px w-full';
  divider1.appendChild(dividerLine1);
  wrapper.appendChild(divider1);

  // Scrollable content area
  const scrollArea = document.createElement('div');
  scrollArea.className = 'no-scrollbar flex h-full max-h-full flex-col overflow-y-auto';

  const contentInner = document.createElement('div');
  contentInner.className = 'flex h-fit flex-col pb-3';

  // Recommended section
  const recommendedSection = document.createElement('section');
  recommendedSection.className = 'flex w-full flex-col p-3';

  // Section header
  const sectionHeader = document.createElement('div');
  sectionHeader.className = 'flex h-9 w-full items-center px-1.5 text-sm font-semibold leading-[1.2]';
  sectionHeader.textContent = 'Recommended';
  recommendedSection.appendChild(sectionHeader);

  // Add CardLive components
  liveChannels.forEach((channelData, index) => {
    const card = createCardLive(channelData);
    const firstLink = card.querySelector('a');
    if (firstLink) {
      firstLink.setAttribute('data-testid', `sidebar-recommended-channel-${index + 1}`);
    }
    recommendedSection.appendChild(card);
  });

  contentInner.appendChild(recommendedSection);

  // Show More / Show Less controls
  const controls = document.createElement('div');
  controls.className = 'mx-3 flex items-center justify-between';

  const showMoreLink = document.createElement('a');
  showMoreLink.className = `
    group inline-flex gap-1.5 items-center justify-center rounded font-semibold
    box-border relative transition-all select-none whitespace-nowrap
    outline-transparent outline-2 outline-offset-2 focus-visible:outline-focusLight
    bg-transparent text-surface-onSurfaceSecondary !p-0 focus-visible:underline
    underline-offset-2 px-2 py-1 text-xs hover:text-white
  `.trim().replace(/\s+/g, ' ');
  showMoreLink.href = '/browse';
  showMoreLink.setAttribute('data-state', 'inactive');
  showMoreLink.setAttribute('data-testid', 'sidebar-show-more-recommended-to-browse');

  const showMoreDivider1 = document.createElement('div');
  showMoreDivider1.className = 'bg-outline-decorative h-px w-full';
  const showMoreText = document.createElement('span');
  showMoreText.textContent = 'Show More';
  const showMoreDivider2 = document.createElement('div');
  showMoreDivider2.className = 'bg-outline-decorative h-px w-full';

  showMoreLink.appendChild(showMoreDivider1);
  showMoreLink.appendChild(showMoreText);
  showMoreLink.appendChild(showMoreDivider2);

  const showLessBtn = document.createElement('button');
  showLessBtn.className = `
    group inline-flex gap-1.5 items-center justify-center rounded font-semibold
    box-border relative transition-all select-none whitespace-nowrap
    outline-transparent outline-2 outline-offset-2 focus-visible:outline-focusLight
    bg-transparent text-surface-onSurfaceSecondary !p-0 focus-visible:underline
    underline-offset-2 px-2 py-1 text-xs hover:text-white
  `.trim().replace(/\s+/g, ' ');
  showLessBtn.setAttribute('dir', 'ltr');
  showLessBtn.setAttribute('data-testid', 'sidebar-show-less-recommended');

  const showLessDivider1 = document.createElement('div');
  showLessDivider1.className = 'bg-outline-decorative h-px w-full';
  const showLessText = document.createElement('span');
  showLessText.textContent = 'Show Less';
  const showLessDivider2 = document.createElement('div');
  showLessDivider2.className = 'bg-outline-decorative h-px w-full';

  showLessBtn.appendChild(showLessDivider1);
  showLessBtn.appendChild(showLessText);
  showLessBtn.appendChild(showLessDivider2);

  controls.appendChild(showMoreLink);
  controls.appendChild(showLessBtn);

  contentInner.appendChild(controls);
  scrollArea.appendChild(contentInner);
  wrapper.appendChild(scrollArea);

  const open = () => {
    wrapper.classList.remove('hidden');
  };

  const close = () => {
    wrapper.classList.add('hidden');
  };

  const toggle = () => {
    wrapper.classList.toggle('hidden');
  };

  return {
    aside: wrapper,
    open,
    close,
    toggle,
    content: scrollArea
  };
}
