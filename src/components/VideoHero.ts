export interface VideoHeroOptions {
  videoId: string;
  author?: string;
  title?: string;
  description?: string;
}

export function createVideoHero(options: VideoHeroOptions) {
  const { videoId, author = 'Fingerprint', title = 'Identification based on mouse movements', description = 'A Fingerprint stream' } = options;

  // Main container - simple flex row
  const root = document.createElement('div');
  root.className = 'flex w-full';

  // Left side - content
  const contentColumn = document.createElement('div');
  contentColumn.className = 'flex flex-col gap-3 flex-1 p-8';
  // Author row with avatar
  const authorRow = document.createElement('div');
  authorRow.className = 'flex items-center gap-3';
  authorRow.innerHTML = `
    <div class="size-11 rounded-full bg-black flex items-center justify-center p-2 shrink-0">
      <svg class="w-7 h-7 text-orange-700" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.74999 17.6842C5.59176 16.0313 4.9104 14.0203 4.9104 11.8489C4.9104 9.03693 7.18867 6.75781 9.99896 6.75781C12.8093 6.75781 15.0875 9.03693 15.0875 11.8489" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11.0578 18.3333C8.89581 16.985 7.45588 14.5854 7.45588 11.8489C7.45588 10.4429 8.59544 9.30339 10.0006 9.30339C11.4057 9.30339 12.5453 10.4429 12.5453 11.8489C12.5453 13.2549 13.6848 14.3945 15.09 14.3945C16.4951 14.3945 17.6347 13.2549 17.6347 11.8489C17.6347 7.63096 14.2169 4.21228 10.0014 4.21228C5.786 4.21228 2.36816 7.63096 2.36816 11.8489C2.36816 12.7891 2.47338 13.7047 2.66684 14.5871" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M17.1048 4.8859C15.3696 2.9148 12.8325 1.66663 10.0001 1.66663C7.1678 1.66663 4.63073 2.9148 2.89551 4.8859" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="flex items-center gap-2">
      <span class="font-semibold text-lg font-medium">${escapeHtml(author)}</span>
      <span class="text-gray-100/20 text-sm">•</span>
      <span class="text-sm">152 watching</span>
    </div>
  `;

  // Title
  const titleEl = document.createElement('div');
  titleEl.className = 'text-sm';
  titleEl.textContent = title;

  contentColumn.appendChild(authorRow);
  contentColumn.appendChild(titleEl);

  // Right side - video (simple, clean)
  const videoContainer = document.createElement('div');
  videoContainer.className = 'flex-1 aspect-video overflow-hidden relative';

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&playsinline=1`;
  iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
  iframe.setAttribute('allowfullscreen', '');
  iframe.className = 'w-full h-full';

  // Overlay to prevent interaction with YouTube controls
  const overlay = document.createElement('div');
  overlay.className = 'absolute inset-0 z-10 pointer-events-auto';

  videoContainer.appendChild(iframe);
  videoContainer.appendChild(overlay);

  // Assemble
  root.appendChild(contentColumn);
  root.appendChild(videoContainer);

  return {
    root,
    setTitle: (t: string) => { titleEl.textContent = t; },
    setAuthor: (a: string) => {
      const el = authorRow.querySelector('.font-semibold');
      if (el) el.textContent = a;
    },
    setDescription: (d: string) => { titleEl.textContent = d; },
  };
}

function escapeHtml(input: string) {
  return input.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' } as any)[c]);
}
