export interface NavItem {
  label: string;
  href: string;
  iconSvg: string;
  testId: string;
  isActive?: boolean;
}

export function createSidebarNav(items: NavItem[]): HTMLElement {
  const nav = document.createElement('ul');
  nav.className = 'flex w-full flex-col p-3';

  items.forEach(item => {
    const li = document.createElement('li');

    const link = document.createElement('a');
    link.className = `
      group inline-flex gap-1.5 items-center rounded font-semibold box-border relative
      transition-all select-none whitespace-nowrap outline-transparent outline-2
      outline-offset-2 focus-visible:outline-focusLight bg-transparent text-white
      py-2 text-base justify-start gap-x-4 px-2 w-full hover:bg-white/10
      ${item.isActive ? 'bg-white/10' : ''}
    `.trim().replace(/\s+/g, ' ');

    link.href = item.href;
    link.setAttribute('data-state', item.isActive ? 'active' : 'inactive');
    link.setAttribute('data-testid', item.testId);

    // Create icon container
    const iconContainer = document.createElement('span');
    iconContainer.className = 'w-8 h-8 flex items-center justify-center';
    iconContainer.innerHTML = item.iconSvg;

    // Create label
    const label = document.createElement('span');
    label.textContent = item.label;

    link.appendChild(iconContainer);
    link.appendChild(label);
    li.appendChild(link);
    nav.appendChild(li);
  });

  return nav;
}

export const defaultNavItems: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>`,
    testId: 'sidebar-home',
    isActive: true
  },
  {
    label: 'Browse',
    href: '/browse',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>`,
    testId: 'sidebar-browse'
  },
  {
    label: 'Following',
    href: '/following',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>`,
    testId: 'sidebar-following'
  }
];
