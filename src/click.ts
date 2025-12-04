import './tailwind.css';
import { createHeader } from './components/Header';
import { createGenericModal } from './components/Modal';
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
mainPage.className = 'flex flex-col min-h-screen bg-color-white';

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

// Create a content section
const content = document.createElement('section');
content.className = 'flex-1 flex items-center justify-center px-6 py-20';

const contentInner = document.createElement('div');
contentInner.className = 'text-center max-w-2xl';

const contentTitle = document.createElement('h2');
contentTitle.className = 'text-3xl font-bold text-color-gray-1000 mb-4';
contentTitle.textContent = 'Welcome to Click';

const contentDesc = document.createElement('p');
contentDesc.className = 'text-lg text-color-gray-700 mb-8';
contentDesc.textContent = 'A simple demo of header, buttons, and modal components built with Tailwind and TypeScript.';

contentInner.appendChild(contentTitle);
contentInner.appendChild(contentDesc);
content.appendChild(contentInner);

mainPage.appendChild(content);

// Append modal to page
// Append modal to BODY (not mainPage) so it appears above all content
document.body.appendChild(signupModal.root);

app.appendChild(mainPage);
