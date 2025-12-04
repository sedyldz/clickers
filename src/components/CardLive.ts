import { createAvatar, getTeamMemberColor } from './Avatar';

export interface CardLiveData {
  channelName: string;
  channelSlug: string;
  avatarUrl?: string;
  gameName: string;
  viewersShort: string;
  viewersLabel: string;
  isLive: boolean;
  liveLabel?: string;
  tooltipText?: string;
  isCoStream?: boolean;
  title?: string;
}

export function createCardLive(data: CardLiveData): HTMLElement {
  // Button wrapper (for Kick's structure)
  const button = document.createElement('button');
  button.className = `
    group inline-flex gap-1.5 items-center rounded font-semibold box-border relative
    transition-all select-none whitespace-nowrap outline-transparent outline-2
    outline-offset-2 focus-visible:outline-focusLight bg-transparent
    text-base justify-start p-0 text-left w-full hover:bg-white/10
  `.trim().replace(/\s+/g, ' ');
  button.setAttribute('dir', 'ltr');

  // Inner link
  const link = document.createElement('a');
  link.className = 'flex h-11 w-full flex-row items-center gap-2 rounded px-1.5';
  link.href = `/${data.channelSlug}`;
  link.setAttribute('data-state', 'false');

  // Avatar - use Avatar component with initials
  const avatar = createAvatar({
    name: data.channelName,
    backgroundColor: getTeamMemberColor(data.channelName)
  });

  // Content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'flex w-full gap-1 overflow-hidden';

  // Text content
  const textContent = document.createElement('div');
  textContent.className = 'flex min-w-0 max-w-full shrink grow flex-col gap-0.5';

  const channelName = document.createElement('span');
  channelName.className = 'shrink truncate text-sm font-bold leading-[1.2]';
  channelName.textContent = data.channelName;

  const gameName = document.createElement('span');
  gameName.className = 'text-subtle truncate text-xs font-bold leading-normal opacity-60';
  gameName.textContent = data.gameName;

  textContent.appendChild(channelName);
  textContent.appendChild(gameName);

  // Live status + viewer count
  const statusWrapper = document.createElement('div');
  statusWrapper.className = 'flex w-fit shrink-0 flex-nowrap items-center gap-x-1 self-start text-white';

  const liveDot = document.createElement('div');
  liveDot.className = 'h-2 w-2 rounded-full bg-green-500';

  const viewerCount = document.createElement('span');
  viewerCount.className = 'text-sm leading-[1.2]';

  const viewerSpan = document.createElement('span');
  viewerSpan.title = data.viewersLabel;
  viewerSpan.textContent = data.viewersShort;

  viewerCount.appendChild(viewerSpan);

  statusWrapper.appendChild(liveDot);
  statusWrapper.appendChild(viewerCount);

  // Assemble
  contentWrapper.appendChild(textContent);
  contentWrapper.appendChild(statusWrapper);

  link.appendChild(avatar);
  link.appendChild(contentWrapper);

  button.appendChild(link);

  return button;
}

// Sample data with team members
export const sampleCardLiveData: CardLiveData[] = [
  {
    channelName: 'Seda',
    channelSlug: 'seda',
    gameName: 'Just Chatting',
    viewersShort: '903',
    viewersLabel: '903',
    isLive: true
  },
  {
    channelName: 'Nemanja',
    channelSlug: 'nemanja',
    gameName: 'Just Chatting',
    viewersShort: '7.6K',
    viewersLabel: '7559',
    isLive: true
  },
  {
    channelName: 'Steve',
    channelSlug: 'steve',
    gameName: 'Counter-Strike 2',
    viewersShort: '3.5K',
    viewersLabel: '3490',
    isLive: true
  },
  {
    channelName: 'Dan',
    channelSlug: 'dan',
    gameName: 'Slots & Casino',
    viewersShort: '12.7K',
    viewersLabel: '12715',
    isLive: true
  },
  {
    channelName: 'Valentin',
    channelSlug: 'valentin',
    gameName: 'Just Chatting',
    viewersShort: '130',
    viewersLabel: '130',
    isLive: true
  },
  {
    channelName: 'Catherine',
    channelSlug: 'catherine',
    gameName: 'Fortnite',
    viewersShort: '66',
    viewersLabel: '66',
    isLive: true
  },
  {
    channelName: 'Ekan',
    channelSlug: 'ekan',
    gameName: 'Slots & Casino',
    viewersShort: '2.6K',
    viewersLabel: '2647',
    isLive: true
  },
  {
    channelName: 'Gabe',
    channelSlug: 'gabe',
    gameName: 'Darts',
    viewersShort: '59',
    viewersLabel: '59',
    isLive: true
  },
  {
    channelName: 'Dusan',
    channelSlug: 'dusan',
    gameName: 'Counter-Strike 2',
    viewersShort: '3.9K',
    viewersLabel: '3921',
    isLive: true
  },
  {
    channelName: 'Alvin',
    channelSlug: 'alvin',
    gameName: 'IRL',
    viewersShort: '796',
    viewersLabel: '796',
    isLive: true
  },
  {
    channelName: 'Melissa',
    channelSlug: 'melissa',
    gameName: 'Fortnite',
    viewersShort: '850',
    viewersLabel: '850',
    isLive: true
  }
];
