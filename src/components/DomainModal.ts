export class DomainModal extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'title', 'primary-label', 'secondary-label'];
  }

  private _root: ShadowRoot;
  private _onClick: (event: Event) => void;

  constructor() {
    super();
    this._root = this.attachShadow({ mode: 'open' });

    this.handleCancel = this.handleCancel.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);

    this._onClick = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (target.matches("[data-role='cancel']")) {
        this.handleCancel();
      }
      if (target.matches("[data-role='close']")) {
        this.handleClose();
      }
    };
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  disconnectedCallback() {
    this.detachEventListeners();
  }

  attributeChangedCallback() {
    this.render();
  }

  get open(): boolean {
    return this.hasAttribute('open');
  }
  set open(value: boolean) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  private attachEventListeners() {
    this._root.addEventListener('click', this._onClick);

    const form = this._root.querySelector<HTMLFormElement>('#add-workspace-domain-form');
    if (form) {
      form.addEventListener('submit', this.handleSubmit);
    }

    this.addEventListener('keydown', this.handleKeydown);
  }

  private detachEventListeners() {
    this._root.removeEventListener('click', this._onClick);

    const form = this._root.querySelector<HTMLFormElement>('#add-workspace-domain-form');
    if (form) {
      form.removeEventListener('submit', this.handleSubmit);
    }

    this.removeEventListener('keydown', this.handleKeydown);
  }

  private handleCancel() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true }));
    this.open = false;
  }

  private handleClose() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true }));
    this.open = false;
  }

  private handleSubmit = (event: Event) => {
    event.preventDefault();
    const input = this._root.querySelector<HTMLInputElement>('#domain-input');
    const value = input?.value ?? '';
    this.dispatchEvent(
      new CustomEvent('submit', {
        bubbles: true,
        detail: { value },
      })
    );
  };

  private handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.handleClose();
    }
  }

  private render() {
    if (!this.open) {
      this._root.innerHTML = '';
      return;
    }

    const title = this.getAttribute('title') ?? 'Add workspace domain';
    const primary = this.getAttribute('primary-label') ?? 'Update domain';
    const secondary = this.getAttribute('secondary-label') ?? 'Cancel';

    this._root.innerHTML = `
      <style>
        :host {
          font-family: var(--font-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
          color: var(--color-gray-1000, hsl(var(--fpds-color-gray-10)));
        }

        .modal-root {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: hsl(var(--fpds-color-black) / 0.3);
          z-index: 1000;
        }

        .modal {
          position: relative;
          display: flex;
          flex-direction: column;
          max-width: 36rem;
          max-height: min(672px, 90vh);
          width: 100%;
          background: var(--color-gray-100, hsl(var(--fpds-color-gray-1)));
          border-radius: 0.75rem;
          border: 1px solid hsl(var(--fpds-color-black) / 0.1);
          box-shadow: var(--shadow-600, 0 24px 48px rgba(15, 23, 42, 0.25));
          overflow: hidden;
          color: var(--color-gray-1000);
        }

        .modal-header {
          display: flex;
          align-items: center;
          height: 2.75rem;
          padding: 0 2.5rem 0 1.25rem;
        }

        .modal-title {
          font-size: var(--text-xl, 1.125rem);
          line-height: var(--leading-xl, 1.75rem);
          font-weight: 500;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--color-gray-1000);
        }

        .modal-body {
          padding: 1.75rem 2rem 0.75rem 2rem;
          overflow-y: auto;
          background: var(--color-white, hsl(var(--fpds-color-white)));
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
          border: 1px solid hsl(var(--fpds-color-black) / 0.1);
          border-bottom: none;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .field-label {
          font-size: var(--text-base, 0.875rem);
          line-height: var(--leading-base, 1.25rem);
          font-weight: 500;
          color: var(--color-gray-1000);
          text-transform: capitalize;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          border-radius: 0.5rem;
          border: 1px solid var(--color-gray-400, hsl(var(--fpds-color-gray-4)));
          background: var(--color-gray-100, hsl(var(--fpds-color-gray-1)));
          height: 2rem;
          box-shadow: var(--shadow-inset-t-black-300, inset 0 1px 0 rgba(0,0,0,0.15));
          transition: border-color 0.1s ease-out, box-shadow 0.1s ease-out;
        }

        .input-wrapper:hover {
          border-color: var(--color-gray-500, hsl(var(--fpds-color-gray-5)));
        }

        .input-wrapper:has(.text-input:focus-visible) {
          border-color: var(--color-orange-700, hsl(var(--fpds-color-orange-7)));
          box-shadow:
            0 0 0 2px var(--color-orange-400, hsl(var(--fpds-color-orange-4))),
            var(--shadow-inset-t-black-300, inset 0 1px 0 rgba(0,0,0,0.15));
        }

        .text-input {
          flex: 1;
          height: 100%;
          border: none;
          outline: none;
          background: transparent;
          padding: 0 0.75rem;
          font-size: var(--text-base, 0.875rem);
          line-height: var(--leading-base, 1.25rem);
          color: var(--color-gray-1000);
          caret-color: var(--color-orange-700, hsl(var(--fpds-color-orange-7)));
        }

        .text-input::placeholder {
          color: var(--color-gray-600, hsl(var(--fpds-color-gray-6)));
        }

        .field-description {
          font-size: var(--text-base, 0.875rem);
          line-height: var(--leading-base, 1.25rem);
          color: var(--color-gray-800, hsl(var(--fpds-color-gray-8)));
        }

        .modal-footer {
          position: sticky;
          bottom: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.75rem;
          background: var(--color-gray-100, hsl(var(--fpds-color-gray-1)));
          border-radius: 0 0 0.75rem 0.75rem;
          border: 1px solid hsl(var(--fpds-color-black) / 0.1);
          border-top: none;
          gap: 0.75rem;
        }

        .btn-secondary,
        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem 0.75rem;
          height: 2rem;
          border-radius: 0.375rem;
          font-size: var(--text-base, 0.875rem);
          line-height: var(--leading-base, 1.25rem);
          font-weight: 500;
          cursor: pointer;
          border-width: 1px;
          border-style: solid;
          white-space: nowrap;
        }

        .btn-secondary {
          background: var(--color-white, hsl(var(--fpds-color-white)));
          color: var(--color-gray-1000);
          border-color: var(--color-gray-400, hsl(var(--fpds-color-gray-4)));
          box-shadow: var(--shadow-button, 0 1px 0 rgba(255,255,255,0.4));
        }

        .btn-secondary:hover {
          background: var(--color-gray-200, hsl(var(--fpds-color-gray-2)));
        }

        .btn-primary {
          background: var(--color-primary, hsl(var(--primary)));
          color: var(--color-primary-foreground, hsl(var(--primary-foreground)));
          border-color: var(--color-orange-800, hsl(var(--fpds-color-orange-8)));
          box-shadow: var(--shadow-button, 0 1px 0 rgba(255,255,255,0.4));
        }

        .btn-primary:hover {
          background: var(--color-primary-hover, hsl(var(--primary-hover)));
        }

        .btn-primary:active {
          background: var(--color-primary-active, hsl(var(--primary-active)));
          border-color: var(--color-orange-900, hsl(var(--fpds-color-orange-9)));
          box-shadow: var(--shadow-inset-t-black-100, inset 0 1px 0 rgba(0,0,0,0.12));
        }

        .modal-close-button {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          width: 2rem;
          height: 2rem;
          border-radius: 999px;
          border: 1px solid transparent;
          background: transparent;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--color-gray-900, hsl(var(--fpds-color-gray-9)));
        }

        .modal-close-button:hover {
          background: var(--color-gray-300, hsl(var(--fpds-color-gray-3)));
        }

        .icon-close {
          width: 1rem;
          height: 1rem;
          stroke: currentColor;
          stroke-width: 2;
          fill: none;
        }
      </style>

      <div class="modal-root">
        <section
          class="modal"
          role="dialog"
          aria-labelledby="add-workspace-domain-title"
          tabindex="-1"
        >
          <header class="modal-header">
            <h2 id="add-workspace-domain-title" class="modal-title">
              ${title}
            </h2>
          </header>

          <div class="modal-body">
            <form id="add-workspace-domain-form" class="modal-form">
              <div class="form-field">
                <label
                  for="domain-input"
                  id="domain-label"
                  class="field-label"
                >
                  domain
                </label>

                <div class="input-wrapper">
                  <input
                    id="domain-input"
                    name="newValue"
                    type="text"
                    placeholder="fingerprint.com"
                    aria-labelledby="domain-label"
                    aria-describedby="domain-description"
                    class="text-input"
                  />
                </div>

                <span
                  id="domain-description"
                  class="field-description"
                >
                  Domain is for reference only and does not affect usage or setup.
                </span>
              </div>
            </form>
          </div>

          <footer class="modal-footer">
            <button
              type="button"
              class="btn-secondary"
              data-role="cancel"
            >
              ${secondary}
            </button>

            <button
              type="submit"
              class="btn-primary"
              form="add-workspace-domain-form"
              data-role="submit"
            >
              ${primary}
            </button>
          </footer>

          <button
            type="button"
            class="modal-close-button"
            aria-label="Close"
            data-role="close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="icon-close"
            >
              <path d="M18 6 6 18"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </button>
        </section>
      </div>
    `;
  }
}

customElements.define('domain-modal', DomainModal);
