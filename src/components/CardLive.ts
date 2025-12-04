export interface CardLiveData {
  channelName: string;
  channelSlug: string;
  avatarUrl: string;
  gameName: string;
  viewersShort: string;
  viewersLabel: string;
  isLive: boolean;
  liveLabel: string;
  tooltipText: string;
  isCoStream: boolean;
  title?: string;
}

export function createCardLive(data: CardLiveData): HTMLAnchorElement {
  const card = document.createElement('a');
  card.className = 'card-live';
  card.href = `/${data.channelSlug}`;
  card.setAttribute('aria-haspopup', 'dialog');

  // Avatar container
  const avatarContainer = document.createElement('div');
  avatarContainer.className = 'card-live__avatar';

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'card-live__avatar-image-wrapper';

  const avatarImg = document.createElement('img');
  avatarImg.className = 'card-live__avatar-image';
  avatarImg.src = data.avatarUrl;
  avatarImg.alt = '';

  avatarWrapper.appendChild(avatarImg);
  avatarContainer.appendChild(avatarWrapper);

  // Co-stream icon (if applicable)
  if (data.isCoStream) {
    const coStreamIcon = document.createElement('div');
    coStreamIcon.className = 'card-live__co-stream-icon';
    coStreamIcon.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5 2a2 2 0 00-2 2v8a2 2 0 002 2V4h8a2 2 0 00-2-2H5z"/>
        <path d="M9 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2h-6a2 2 0 01-2-2V6z"/>
      </svg>
    `;
    avatarContainer.appendChild(coStreamIcon);
  }

  // Body/metadata container
  const body = document.createElement('div');
  body.className = 'card-live__body';

  const topRow = document.createElement('div');
  topRow.className = 'card-live__top-row';

  const meta = document.createElement('div');
  meta.className = 'card-live__meta';

  // Channel name
  const titleDiv = document.createElement('div');
  titleDiv.className = 'card-live__title';

  const channelNameP = document.createElement('p');
  channelNameP.className = 'card-live__channel-name';
  channelNameP.setAttribute('data-a-target', 'side-nav-title');
  channelNameP.title = data.channelName;
  channelNameP.textContent = data.channelName;

  titleDiv.appendChild(channelNameP);
  meta.appendChild(titleDiv);

  // Game name
  const gameDiv = document.createElement('div');
  gameDiv.className = 'card-live__game';

  const gameNameP = document.createElement('p');
  gameNameP.className = 'card-live__game-name';
  gameNameP.dir = 'auto';
  gameNameP.title = data.gameName;
  gameNameP.textContent = data.gameName;

  gameDiv.appendChild(gameNameP);
  meta.appendChild(gameDiv);

  // Optional extra title (for co-streams)
  if (data.title) {
    const extraTitleDiv = document.createElement('div');
    extraTitleDiv.className = 'card-live__extra-title';

    const extraTitleP = document.createElement('p');
    extraTitleP.className = 'card-live__extra-title-text';
    extraTitleP.title = data.title;
    extraTitleP.textContent = data.title;

    extraTitleDiv.appendChild(extraTitleP);
    meta.appendChild(extraTitleDiv);
  }

  topRow.appendChild(meta);

  // Live status + viewers
  const liveStatus = document.createElement('div');
  liveStatus.className = 'card-live__live-status';
  liveStatus.setAttribute('data-a-target', 'side-nav-live-status');

  const liveStatusInner = document.createElement('div');
  liveStatusInner.className = 'card-live__live-status-inner';

  const liveDot = document.createElement('div');
  liveDot.className = 'card-live__live-dot';

  const liveLabel = document.createElement('p');
  liveLabel.className = 'card-live__live-label';
  liveLabel.textContent = data.liveLabel;

  const viewers = document.createElement('div');
  viewers.className = 'card-live__viewers';

  const viewersShort = document.createElement('span');
  viewersShort.className = 'card-live__viewers-short';
  viewersShort.setAttribute('aria-hidden', 'true');
  viewersShort.textContent = data.viewersShort;

  const viewersLabel = document.createElement('p');
  viewersLabel.className = 'card-live__viewers-label';
  viewersLabel.textContent = data.viewersLabel;

  viewers.appendChild(viewersShort);
  viewers.appendChild(viewersLabel);

  liveStatusInner.appendChild(liveDot);
  liveStatusInner.appendChild(liveLabel);
  liveStatusInner.appendChild(viewers);

  liveStatus.appendChild(liveStatusInner);
  topRow.appendChild(liveStatus);

  body.appendChild(topRow);

  // Tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'card-live__tooltip';

  const tooltipIcon = document.createElement('div');
  tooltipIcon.className = 'card-live__tooltip-icon';
  tooltipIcon.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
      <path d="M7.5 10l5-5v10l-5-5z"/>
    </svg>
  `;

  const tooltipText = document.createElement('p');
  tooltipText.className = 'card-live__tooltip-text';
  tooltipText.textContent = data.tooltipText;

  tooltip.appendChild(tooltipIcon);
  tooltip.appendChild(tooltipText);

  // Assemble card
  card.appendChild(avatarContainer);
  card.appendChild(body);
  card.appendChild(tooltip);

  return card;
}

// Sample data for testing
export const sampleCardLiveData: CardLiveData[] = [
  {
    channelName: 'ohnePixel',
    channelSlug: 'ohnepixel',
    avatarUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/5742b015-e6ed-4f7c-a1dd-87cd88fe1eb9-profile_image-70x70.png',
    gameName: 'Counter-Strike',
    viewersShort: '51.4K',
    viewersLabel: '51.4K viewers',
    isLive: true,
    liveLabel: 'Live',
    tooltipText: 'Use the Right Arrow Key to show more information.',
    isCoStream: false
  },
  {
    channelName: 'StarLadder_cs_en',
    channelSlug: 'starladder_cs_en',
    avatarUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/b8d29c69-1398-4641-9a62-39c2de7296b5-profile_image-70x70.png',
    gameName: 'Counter-Strike',
    viewersShort: '30.4K',
    viewersLabel: '30.4K viewers',
    isLive: true,
    liveLabel: 'Live',
    tooltipText: 'Use the Right Arrow Key to show more information.',
    isCoStream: true,
    title: '[EN] Stream A | paiN vs G2 (0-0) BO1 | StarLadder Budapest Major 2025 - S3 - D1'
  },
  {
    channelName: 'Clix',
    channelSlug: 'clix',
    avatarUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/4e0378c7-b33e-4f9b-8b92-0393d332b290-profile_image-70x70.png',
    gameName: 'Fortnite',
    viewersShort: '18.2K',
    viewersLabel: '18.2K viewers',
    isLive: true,
    liveLabel: 'Live',
    tooltipText: 'Use the Right Arrow Key to show more information.',
    isCoStream: false
  },
  {
    channelName: 'AussieAntics',
    channelSlug: 'aussieantics',
    avatarUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/8c8f0e44-cf7e-4b4d-9c4f-8e2f8f2f7e7e-profile_image-70x70.png',
    gameName: 'Rust',
    viewersShort: '12.7K',
    viewersLabel: '12.7K viewers',
    isLive: true,
    liveLabel: 'Live',
    tooltipText: 'Use the Right Arrow Key to show more information.',
    isCoStream: false
  },
  {
    channelName: 'B0aty',
    channelSlug: 'b0aty',
    avatarUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/b0aty-profile_image-70x70.png',
    gameName: 'Old School RuneScape',
    viewersShort: '8.9K',
    viewersLabel: '8.9K viewers',
    isLive: true,
    liveLabel: 'Live',
    tooltipText: 'Use the Right Arrow Key to show more information.',
    isCoStream: false
  },
  {
    channelName: 'Yogscast',
    channelSlug: 'yogscast',
    avatarUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/yogscast-profile_image-70x70.png',
    gameName: 'Just Chatting',
    viewersShort: '7.3K',
    viewersLabel: '7.3K viewers',
    isLive: true,
    liveLabel: 'Live',
    tooltipText: 'Use the Right Arrow Key to show more information.',
    isCoStream: false
  },
  {
    channelName: 'forsen',
    channelSlug: 'forsen',
    avatarUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/forsen-profile_image-70x70.png',
    gameName: 'Dota 2',
    viewersShort: '6.8K',
    viewersLabel: '6.8K viewers',
    isLive: true,
    liveLabel: 'Live',
    tooltipText: 'Use the Right Arrow Key to show more information.',
    isCoStream: false
  },
  {
    channelName: 'MrSavage',
    channelSlug: 'mrsavage',
    avatarUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/mrsavage-profile_image-70x70.png',
    gameName: 'Fortnite',
    viewersShort: '5.2K',
    viewersLabel: '5.2K viewers',
    isLive: true,
    liveLabel: 'Live',
    tooltipText: 'Use the Right Arrow Key to show more information.',
    isCoStream: false
  },
  {
    channelName: 'Northernlion',
    channelSlug: 'northernlion',
    avatarUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/northernlion-profile_image-70x70.png',
    gameName: 'The Binding of Isaac',
    viewersShort: '4.1K',
    viewersLabel: '4.1K viewers',
    isLive: true,
    liveLabel: 'Live',
    tooltipText: 'Use the Right Arrow Key to show more information.',
    isCoStream: false
  },
  {
    channelName: 'Tigz',
    channelSlug: 'tigz',
    avatarUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/tigz-profile_image-70x70.png',
    gameName: 'Call of Duty: Warzone',
    viewersShort: '3.5K',
    viewersLabel: '3.5K viewers',
    isLive: true,
    liveLabel: 'Live',
    tooltipText: 'Use the Right Arrow Key to show more information.',
    isCoStream: false
  }
];
