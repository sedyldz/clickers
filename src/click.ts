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

// Create sidebar and append to body so it layers under the modal but above main content
const sidebar = createSidebar();
document.body.appendChild(sidebar.aside);

// Create form fields
const nameField = createTextField({
  label: 'Full Name',
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
  label: 'Date of Birth',
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
sidebarColumn.className = 'col-span-2 hidden md:block';
sidebarColumn.innerHTML = `
  <div class="p-4 bg-color-white border-r border-black/10 rounded-md shadow-sm">
    <div class="font-medium text-color-gray-1000 mb-2">Navigation</div>
    <p class="text-sm text-color-gray-700">Sidebar content placeholder.</p>
    <ul class="mt-4 space-y-2">
      <li><a class="block px-2 py-1 rounded hover:bg-color-gray-100 cursor-pointer">Dashboard</a></li>
      <li><a class="block px-2 py-1 rounded hover:bg-color-gray-100 cursor-pointer">Settings</a></li>
      <li><a class="block px-2 py-1 rounded hover:bg-color-gray-100 cursor-pointer">Profile</a></li>
    </ul>
  </div>
`;

// Main content column (takes remaining 8 cols)
const contentColumn = document.createElement('main');
contentColumn.className = 'col-span-12 md:col-span-10 flex';

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

grid.appendChild(sidebarColumn);
grid.appendChild(contentColumn);

mainPage.appendChild(grid);

// Append modal to page
// Append modal to BODY (not mainPage) so it appears above all content
document.body.appendChild(signupModal.root);

app.appendChild(mainPage);
