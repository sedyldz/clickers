import { createButton } from './Button';

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
    'fixed inset-0 hidden items-center justify-center bg-black/80 z-50 modal-overlay';

  // Modal container
  const modal = document.createElement('section');

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  modal.className = `${sizeClasses[size]} w-full mx-4 bg-gray-1000/60 ring ring-gray-900/40 backdrop-blur-md rounded-lg flex flex-col max-h-[90vh]`;
  modal.role = 'dialog';
  modal.setAttribute('aria-modal', 'true');

  // Header
  const header = document.createElement('header');
  header.className = 'flex items-center justify-between h-11 px-5 shadow-[0_1px_hsl(0_0%_100%_/_0.1)]';

  const titleEl = document.createElement('h2');
  titleEl.className = 'text-lg font-medium';
  titleEl.textContent = title;
  header.appendChild(titleEl);

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className =
    'rounded-full flex p-2 items-center justify-center hover:bg-gray-900 transition-colors text-gray-400';
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
  body.className = 'flex-1 overflow-y-auto p-6';

  // Footer
  const footer = document.createElement('footer');
  footer.className = 'flex items-center justify-between gap-3 p-4 shadow-[0_-1px_hsl(0_0%_100%_/_0.1)]';

  // Create buttons using Button component
  const { button: cancelBtn } = createButton(secondaryLabel, {
    variant: 'secondary',
    onClick: () => {
      close();
    }
  });

  const { button: submitBtn } = createButton(primaryLabel, {
    variant: 'primary',
    onClick: () => {
      if (onSubmit) onSubmit();
    }
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
