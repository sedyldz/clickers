export interface ButtonOptions {
  variant?: 'primary' | 'secondary';
  onClick?: (event: MouseEvent) => void;
  disabled?: boolean;
  className?: string;
}

export function createButton(label: string, options: ButtonOptions = {}) {
  const { variant = 'primary', onClick, disabled = false, className = '' } = options;

  const button = document.createElement('button');
  button.textContent = label;
  button.disabled = disabled;

  // Base styles
  const baseClasses = [
    'px-3 py-2 rounded-sm font-medium text-sm',
    'transition-all duration-100 cursor-pointer',
    'focus:outline-2 focus:outline-offset-2',
  ];

  // Variant-specific styles
  let variantClasses: string[] = [];

  if (variant === 'primary') {
    variantClasses = [
      'appearance-none border-none',
      'bg-primary text-primary-foreground',
      'shadow-[0_0_0_1px_hsl(var(--fpds-color-orange-7)/1),inset_0_1px_rgb(255_255_255/.15),0_1px_2px_rgb(0_0_0/.1)]',
      'hover:shadow-[0_0_0_1px_hsl(var(--fpds-color-orange-8)/1),inset_0_1px_rgb(255_255_255/.15),0_1px_2px_rgb(0_0_0/.1)]',
      'active:shadow-[0_0_0_1px_hsl(var(--fpds-color-orange-10)/1)]',
      'hover:bg-primary-hover',
      'active:bg-primary-active active:border-orange-900',
      'focus:outline-orange-700',
      'disabled:opacity-50 disabled:cursor-not-allowed',
    ];
  } else if (variant === 'secondary') {
    variantClasses = [
      'bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-1000',
      'shadow-[0_0_0_1px_rgb(0_0_0/.12),0_1px_2px_rgb(0_0_0/.1)] active:shadow-[0_0_0_1px_rgb(0_0_0/.12)]',
      'appearance-none',
      'focus:outline-orange-700',
      'disabled:opacity-50 disabled:cursor-not-allowed',
    ];
  }

  const allClasses = [...baseClasses, ...variantClasses];
  if (className) allClasses.push(className);

  button.className = allClasses.join(' ');

  if (onClick) {
    button.addEventListener('click', onClick);
  }

  return { element: button, button };
}
