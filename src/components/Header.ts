import { createButton } from './Button';
import { createMenuIcon } from './icons';

export interface HeaderOptions {
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
}

export function createHeader(options: HeaderOptions = {}) {
  const { onLoginClick, onSignUpClick } = options;

  const header = document.createElement('header');
  header.className = 'flex items-center justify-between px-6 py-4 border-b border-gray-900/20 bg-gray-900/0 bg-blur-md';

  // Logo container
  const logoContainer = document.createElement('div');
  logoContainer.className = 'flex items-center gap-5';

  // Menu (hamburger) icon for sidebar toggle
  const menuIcon = createMenuIcon({ size: 20, className: 'w-6 h-6 cursor-pointer text-color-gray-900' });
  menuIcon.setAttribute('role', 'button');
  menuIcon.setAttribute('aria-label', 'Open sidebar');
  menuIcon.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-open');
  });

  // Insert the menu icon before the logo
  logoContainer.appendChild(menuIcon);

  const logo = document.createElement('h1');
  logo.className = 'text-3xl uppercase font-bold text-color-primary font-pixel text-orange-700';
  logo.textContent = 'click';

  logoContainer.appendChild(logo);

  // Fake search field in the middle
  const searchField = document.createElement('div');
  searchField.className = 'flex-1 max-w-2xl mx-8 h-10 ring ring-gray-400/20 rounded-sm flex items-center gap-2 px-3';

  // Search icon (Lucide Search icon inline SVG)
  const searchIcon = document.createElement('div');
  searchIcon.className = 'w-5 h-5 text-gray-500';
  searchIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </svg>
  `;

  // Placeholder text
  const placeholder = document.createElement('span');
  placeholder.className = 'text-sm text-gray-500';
  placeholder.textContent = 'Search';

  searchField.appendChild(searchIcon);
  searchField.appendChild(placeholder);

  // Auth buttons container
  const authButtons = document.createElement('div');
  authButtons.className = 'flex items-center gap-3';

  // Login button (secondary)
  const { button: loginBtn } = createButton('Log In', {
    variant: 'secondary',
    onClick: onLoginClick,
  });

  // Sign up button (primary)
  const { button: signupBtn } = createButton('Sign Up', {
    variant: 'primary',
    onClick: onSignUpClick,
  });

  authButtons.appendChild(loginBtn);
  authButtons.appendChild(signupBtn);

  header.appendChild(logoContainer);
  header.appendChild(searchField);
  header.appendChild(authButtons);

  return { element: header, header, loginBtn, signupBtn };
}
