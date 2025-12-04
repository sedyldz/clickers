import { createButton } from './Button';

export interface HeaderOptions {
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
}

export function createHeader(options: HeaderOptions = {}) {
  const { onLoginClick, onSignUpClick } = options;

  const header = document.createElement('header');
  header.className = 'flex items-center justify-between px-6 py-4 border-b border-gray-900/10 bg-gray-100/70 bg-blur-md';

  // Logo container
  const logoContainer = document.createElement('div');
  logoContainer.className = 'flex items-center gap-8';

  const logo = document.createElement('h1');
  logo.className = 'text-3xl uppercase font-bold text-color-primary font-pixel text-orange-700';
  logo.textContent = 'click';

  logoContainer.appendChild(logo);

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
  header.appendChild(authButtons);

  return { element: header, header, loginBtn, signupBtn };
}
