export interface VideoHeroOptions {
  videoId: string;
  author?: string;
  title?: string;
  description?: string;
}

export function createVideoHero(options: VideoHeroOptions) {
  const { videoId, author = 'Fingerprint', title = 'Identification based on mouse movements', description = 'A Fingerprint stream' } = options;

  const root = document.createElement('div');
  root.className = 'w-full max-h-[50vh]';

  const wrapper = document.createElement('div');
  wrapper.className = 'relative w-full aspect-video max-h-[50vh] overflow-hidden';

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&playsinline=1`;
  iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
  iframe.setAttribute('allowfullscreen', '');
  iframe.className = 'absolute inset-0 w-full h-full mask-[linear-gradient(to_left,rgba(0,0,0,1)_0%,rgba(0,0,0,0.8),rgba(0,0,0,0)_60%)]';

  // Overlay container
  const overlay = document.createElement('div');
  overlay.className = 'absolute inset-0 max-w-[640px] z-10 flex flex-col justify-between p-6 pointer-events-none';

  // Top overlay (author + meta) with inline SVG avatar so it can inherit currentColor
  const topOverlay = document.createElement('div');
  topOverlay.className = 'flex items-start justify-between w-full gap-4 pointer-events-auto';
  topOverlay.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="w-11 h-11 rounded-full bg-black flex items-center justify-center flex-shrink-0 p-2">
        <svg class="w-7 h-7 text-orange-700" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M6.74999 17.6842C5.59176 16.0313 4.9104 14.0203 4.9104 11.8489C4.9104 9.03693 7.18867 6.75781 9.99896 6.75781C12.8093 6.75781 15.0875 9.03693 15.0875 11.8489" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.75005 17.6842C5.59182 16.0313 4.91046 14.0203 4.91046 11.8489C4.91046 9.03693 7.18873 6.75781 9.99902 6.75781C12.8093 6.75781 15.0876 9.03693 15.0876 11.8489" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15.3633 16.9264C15.2717 16.9315 15.1817 16.94 15.0892 16.94C12.2789 16.94 10.0007 14.6609 10.0007 11.8489" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15.3634 16.9265C15.2718 16.9316 15.1818 16.9401 15.0894 16.9401C12.2791 16.9401 10.0008 14.661 10.0008 11.849" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11.0578 18.3333C8.89581 16.985 7.45588 14.5854 7.45588 11.8489C7.45588 10.4429 8.59544 9.30339 10.0006 9.30339C11.4057 9.30339 12.5453 10.4429 12.5453 11.8489C12.5453 13.2549 13.6848 14.3945 15.09 14.3945C16.4951 14.3945 17.6347 13.2549 17.6347 11.8489C17.6347 7.63096 14.2169 4.21228 10.0014 4.21228C5.786 4.21228 2.36816 7.63096 2.36816 11.8489C2.36816 12.7891 2.47338 13.7047 2.66684 14.5871" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11.0578 18.3333C8.89581 16.985 7.45588 14.5854 7.45588 11.8489C7.45588 10.4429 8.59544 9.30339 10.0006 9.30339C11.4057 9.30339 12.5453 10.4429 12.5453 11.8489C12.5453 13.2549 13.6848 14.3945 15.09 14.3945C16.4951 14.3945 17.6347 13.2549 17.6347 11.8489C17.6347 7.63096 14.2169 4.21228 10.0014 4.21228C5.786 4.21228 2.36816 7.63096 2.36816 11.8489C2.36816 12.7891 2.47338 13.7047 2.66684 14.5871" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17.1048 4.8859C15.3696 2.9148 12.8325 1.66663 10.0001 1.66663C7.1678 1.66663 4.63073 2.9148 2.89551 4.8859" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17.1048 4.8859C15.3696 2.9148 12.8325 1.66663 10.0001 1.66663C7.1678 1.66663 4.63073 2.9148 2.89551 4.8859" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="text-left">
        <div class="text-white font-semibold">${escapeHtml(author)}</div>
        <div class="text-sm text-white/80">152 watching • A Fingerprint stream</div>
      </div>
    </div>
    <div class="flex items-center gap-2 pointer-events-auto">
      <button class="px-3 py-2 rounded-md text-sm bg-color-primary text-color-primary-foreground">Follow</button>
    </div>
  `;

  // Center overlay (title/description)
  const centerOverlay = document.createElement('div');
  centerOverlay.className = 'flex-1 flex items-center justify-center pointer-events-none';
  const centerInner = document.createElement('div');
  centerInner.className = 'text-center';
  const titleEl = document.createElement('h2');
  titleEl.className = 'text-3xl font-bold text-white drop-shadow-lg mb-2';
  titleEl.textContent = title;
  const descEl = document.createElement('p');
  descEl.className = 'text-lg text-white/90 drop-shadow-sm';
  descEl.textContent = description;
  centerInner.appendChild(titleEl);
  centerInner.appendChild(descEl);
  centerOverlay.appendChild(centerInner);

  // Footer overlay
  const footerOverlay = document.createElement('div');
  footerOverlay.className = 'flex items-center justify-between w-full pointer-events-auto';
  footerOverlay.innerHTML = `<div class="text-sm text-white/80">Live</div><div class="text-sm text-white/80">💬 24 chat</div>`;

  overlay.appendChild(topOverlay);
  overlay.appendChild(centerOverlay);
  overlay.appendChild(footerOverlay);

  wrapper.appendChild(iframe);
  wrapper.appendChild(overlay);
  root.appendChild(wrapper);

  return {
    root,
    overlay,
    setTitle: (t: string) => { titleEl.textContent = t; },
    setAuthor: (a: string) => { const el = topOverlay.querySelector('.text-white.font-semibold'); if (el) el.textContent = a; },
    setDescription: (d: string) => { descEl.textContent = d; },
  };
}

function escapeHtml(input: string) {
  return input.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' } as any)[c]);
}
