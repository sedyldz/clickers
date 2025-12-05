import './tailwind.css';
import { createHeader } from './components/Header';
import { createGenericModal } from './components/Modal';
import { createSidebar } from './components/Sidebar';
import { createTextField } from './components/TextField';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Missing #app root element');
}

// Create the header
const { header } = createHeader({
  onLoginClick: () => {
    console.log('Login button clicked');
  },
  onSignUpClick: () => {
    signupModal.open();
  },
});

// Create the main page structure
const mainPage = document.createElement('div');
mainPage.className = 'flex flex-col min-h-screen';

// Create signup modal
const signupModal = createGenericModal({
  title: 'Create your account',
  size: 'md',
  primaryLabel: 'Sign Up',
  secondaryLabel: 'Cancel',
  onSubmit: () => {
    // Validate all fields
    const allValid =
      nameField.validate() &&
      emailField.validate() &&
      usernameField.validate() &&
      dobField.validate() &&
      passwordField.validate();

    if (allValid) {
      const formData = {
        name: nameField.getValue(),
        email: emailField.getValue(),
        username: usernameField.getValue(),
        dob: dobField.getValue(),
        password: passwordField.getValue(),
      };
      console.log('Form submitted:', formData);
      alert('Sign up successful! (Demo)');
      signupModal.close();
      resetForm();
    }
  },
  onClose: () => {
    resetForm();
  },
});

// Create sidebar (will be appended to aside element in grid layout)
const sidebar = createSidebar();

// Create form fields
const nameField = createTextField({
  label: 'Name',
  type: 'text',
  placeholder: 'John Doe',
  required: true,
});

const emailField = createTextField({
  label: 'Email',
  type: 'email',
  placeholder: 'you@example.com',
  required: true,
});

const usernameField = createTextField({
  label: 'Username',
  type: 'text',
  placeholder: 'johndoe123',
  required: true,
});

const dobField = createTextField({
  label: 'Date of birth',
  type: 'date',
  required: true,
  validate: (value: string) => {
    if (!value) return null;

    const date = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
      return 'You must be at least 18 years old';
    }

    return null;
  },
});

const passwordField = createTextField({
  label: 'Password',
  type: 'password',
  placeholder: 'Create a strong password',
  required: true,
  validate: (value: string) => {
    if (value.length < 8) {
      return 'Password must be at least 8 characters';
    }
    return null;
  },
});

// Add fields to modal body
signupModal.body.appendChild(nameField.container);
signupModal.body.appendChild(emailField.container);
signupModal.body.appendChild(usernameField.container);
signupModal.body.appendChild(dobField.container);
signupModal.body.appendChild(passwordField.container);

// Reset form helper
const resetForm = () => {
  nameField.clear();
  emailField.clear();
  usernameField.clear();
  dobField.clear();
  passwordField.clear();
};

// Append header to page
mainPage.appendChild(header);

// Create a 12-column grid layout: sidebar (4 cols) + content (8 cols)
const grid = document.createElement('div');
grid.className = 'grid grid-cols-12 flex-1';

// Static sidebar column for md+ screens
const sidebarColumn = document.createElement('aside');
sidebarColumn.className = 'col-span-2 hidden md:block overflow-y-auto';
// Append the sidebar component to the aside element
sidebarColumn.appendChild(sidebar.aside);

// Main content column (takes remaining 8 cols)
const contentColumn = document.createElement('main');
contentColumn.className = 'col-span-12 md:col-span-10 flex flex-col max-h-[calc(100vh_-_69px)] overflow-y-auto';

import('./components/VideoHero').then(({ createVideoHero }) => {
  const hero = createVideoHero({
    videoId: 'UEYBysyPTBs',
    author: 'Fingerprint',
    title: 'Identification based on mouse movements',
    description: 'A Fingerprint stream',
  });
  contentColumn.appendChild(hero.root);
}).catch((err) => {
  // Fallback: simple text if the component fails to load
  const fallback = document.createElement('div');
  fallback.className = 'text-center p-6';
  fallback.textContent = 'Video failed to load.';
  contentColumn.appendChild(fallback);
});

// New Features Section (lazy-loaded)
import('./components/NewFeaturesSection').then(({ createNewFeaturesSection }) => {
  const section = createNewFeaturesSection();
  contentColumn.appendChild(section.root);
}).catch((err) => {
  console.error('Failed to load new features section:', err);
});

// Use Cases Section (lazy-loaded)
import('./components/UseCasesSection').then(({ createUseCasesSection }) => {
  const section = createUseCasesSection();
  contentColumn.appendChild(section.root);
}).catch((err) => {
  console.error('Failed to load use cases section:', err);
});

// Industries Section (lazy-loaded)
import('./components/IndustriesSection').then(({ createIndustriesSection }) => {
  const section = createIndustriesSection();
  contentColumn.appendChild(section.root);
}).catch((err) => {
  console.error('Failed to load industries section:', err);
});

// Category Section (lazy-loaded)
import('./components/CategorySection').then(({ createCategorySection }) => {
  const categorySection = createCategorySection();
  contentColumn.appendChild(categorySection.root);
}).catch((err) => {
  console.error('Failed to load category section:', err);
});

grid.appendChild(sidebarColumn);
grid.appendChild(contentColumn);

mainPage.appendChild(grid);

// Append modal to page
// Append modal to BODY (not mainPage) so it appears above all content
document.body.appendChild(signupModal.root);

app.appendChild(mainPage);
