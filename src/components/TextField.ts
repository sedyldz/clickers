export interface TextFieldOptions {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'date' | 'number';
  placeholder?: string;
  required?: boolean;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  validate?: (value: string) => string | null; // Returns error message or null
}

export function createTextField(options: TextFieldOptions = {}) {
  const {
    label,
    type = 'text',
    placeholder = '',
    required = false,
    name = '',
    value = '',
    onChange,
    validate,
  } = options;

  // Container
  const container = document.createElement('div');
  container.className = 'flex flex-col gap-1 mb-4';

  // Label
  if (label) {
    const labelEl = document.createElement('label');
    labelEl.className = 'text-sm font-medium text-color-gray-1000';
    labelEl.textContent = label;
    if (required) {
      const span = document.createElement('span');
      span.className = 'text-red-500';
      span.textContent = ' *';
      labelEl.appendChild(span);
    }
    container.appendChild(labelEl);
  }

  // Input wrapper
  const wrapper = document.createElement('div');
  wrapper.className =
    'relative flex items-center border border-color-gray-400 rounded-md bg-color-gray-100 hover:border-color-gray-500 focus-within:border-color-orange-700 focus-within:ring-2 focus-within:ring-color-orange-400 transition-all';

  // Input
  const input = document.createElement('input');
  input.type = type;
  input.placeholder = placeholder;
  input.required = required;
  input.name = name;
  input.value = value;
  input.className =
    '[appearance:none] flex-1 bg-white px-3 py-2 text-sm text-color-gray-1000 placeholder-color-gray-600 outline-none shadow-[0_0_0_1px_rgb(0_0_0/0.01),_inset_0_1px_2px_rgb(0_0_0/0.05)] rounded-md p-0';

  // Handle date input for locale-aware display
  if (type === 'date') {
    input.className += ' w-full';
  }

  // Error message
  const errorEl = document.createElement('div');
  errorEl.className = 'text-xs text-red-600 mt-1 hidden';

  // Validation handler
  const validateField = () => {
    errorEl.classList.add('hidden');

    if (required && !input.value.trim()) {
      errorEl.textContent = `${label || 'This field'} is required`;
      errorEl.classList.remove('hidden');
      return false;
    }

    if (type === 'email' && input.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        errorEl.textContent = 'Please enter a valid email address';
        errorEl.classList.remove('hidden');
        return false;
      }
    }

    if (type === 'date' && input.value.trim()) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(input.value)) {
        errorEl.textContent = 'Please enter a valid date (YYYY-MM-DD)';
        errorEl.classList.remove('hidden');
        return false;
      }
      // Basic date validation
      const date = new Date(input.value);
      if (isNaN(date.getTime())) {
        errorEl.textContent = 'Please enter a valid date';
        errorEl.classList.remove('hidden');
        return false;
      }
    }

    if (validate) {
      const customError = validate(input.value);
      if (customError) {
        errorEl.textContent = customError;
        errorEl.classList.remove('hidden');
        return false;
      }
    }

    return true;
  };

  input.addEventListener('change', validateField);
  input.addEventListener('input', () => {
    if (onChange) onChange(input.value);
  });

  wrapper.appendChild(input);
  container.appendChild(wrapper);
  container.appendChild(errorEl);

  return {
    container,
    input,
    getValue: () => input.value,
    setValue: (v: string) => {
      input.value = v;
    },
    setError: (error: string | null) => {
      if (error) {
        errorEl.textContent = error;
        errorEl.classList.remove('hidden');
      } else {
        errorEl.classList.add('hidden');
      }
    },
    validate: validateField,
    clear: () => {
      input.value = '';
      errorEl.classList.add('hidden');
    },
  };
}
