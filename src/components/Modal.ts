export interface GenericModalOptions {
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  primaryLabel?: string;
  secondaryLabel?: string;
  onSubmit?: () => void;
  onClose?: () => void;
}

export function createGenericModal(options: GenericModalOptions = {}) {
  const {
    title = 'Modal',
    size = 'md',
    primaryLabel = 'Submit',
    secondaryLabel = 'Cancel',
    onSubmit,
    onClose,
  } = options;

  // Root overlay
  const root = document.createElement('div');
  root.className =
    'fixed inset-0 hidden items-center justify-center bg-black/30 z-50 modal-overlay';
  // Ensure the overlay has a fallback background and high z-index in case
  // utility classes or CSS variables are not available yet.
  root.style.backgroundColor = root.style.backgroundColor || 'rgba(0,0,0,0.3)';
  root.style.zIndex = root.style.zIndex || '9999';

  // Modal container
  const modal = document.createElement('section');

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  modal.className = `${sizeClasses[size]} w-full mx-4 bg-color-gray-100 rounded-lg border border-black/10 shadow-lg flex flex-col max-h-[90vh]`;
  // Explicitly set modal background using design system variable as a fallback
  // so the modal isn't transparent if utility classes aren't applied.
  modal.style.backgroundColor = modal.style.backgroundColor || 'var(--color-card, hsl(var(--card)))';
  modal.role = 'dialog';
  modal.setAttribute('aria-modal', 'true');

  // Header
  const header = document.createElement('header');
  header.className = 'flex items-center justify-between h-11 px-5 border-b border-black/10';

  const titleEl = document.createElement('h2');
  titleEl.className = 'text-lg font-medium text-color-gray-1000';
  titleEl.textContent = title;
  header.appendChild(titleEl);

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className =
    'rounded-full w-8 h-8 flex items-center justify-center hover:bg-color-gray-300 transition-colors text-color-gray-900';
  closeBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M18 6 6 18"></path>
      <path d="M6 6l12 12"></path>
    </svg>
  `;
  closeBtn.addEventListener('click', () => {
    close();
  });
  header.appendChild(closeBtn);

  // Body
  const body = document.createElement('div');
  body.className = 'flex-1 overflow-y-auto p-6 bg-color-white border-t border-black/10';

  // Footer
  const footer = document.createElement('footer');
  footer.className = 'flex items-center justify-between gap-3 p-4 bg-color-gray-100 border-t border-black/10';

  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.className =
    'px-3 py-2 rounded-md font-medium text-sm bg-color-white text-color-gray-1000 border border-color-gray-400 hover:bg-color-gray-200 transition-colors';
  cancelBtn.textContent = secondaryLabel;
  cancelBtn.addEventListener('click', () => {
    close();
  });

  const submitBtn = document.createElement('button');
  submitBtn.type = 'button';
  submitBtn.className =
    'px-3 py-2 rounded-md font-medium text-sm bg-color-primary text-color-primary-foreground border border-color-orange-800 hover:bg-color-primary-hover transition-colors';
  submitBtn.textContent = primaryLabel;
  submitBtn.addEventListener('click', () => {
    if (onSubmit) onSubmit();
  });

  footer.appendChild(cancelBtn);
  footer.appendChild(submitBtn);

  // Assemble modal
  modal.appendChild(header);
  modal.appendChild(body);
  modal.appendChild(footer);
  root.appendChild(modal);

  // Close handler
  const close = () => {
    root.classList.add('hidden');
    // Remove inline display so CSS can fully hide the overlay.
    // We set display when opening; if we don't clear it, the overlay
    // may remain visible because inline styles beat stylesheet rules.
    try {
      root.style.display = 'none';
    } catch (err) {
      /* ignore */
    }
    if (onClose) onClose();
  };

  const open = () => {
    root.classList.remove('hidden');
    root.style.display = 'flex';
  };

  // Close on overlay click
  root.addEventListener('click', (e) => {
    if (e.target === root) {
      close();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !root.classList.contains('hidden')) {
      close();
    }
  });

  return {
    root,
    modal,
    header,
    body,
    footer,
    close,
    open,
    setTitle: (t: string) => {
      titleEl.textContent = t;
    },
  };
}
