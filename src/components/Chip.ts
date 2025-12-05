export interface ChipData {
  label: string;
  variant?: 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'purple' | 'pink' | 'gray';
}

export function createChip(data: ChipData): HTMLElement {
  const { label, variant = 'gray' } = data;

  const chip = document.createElement('span');

  // Variant color mapping with semi-transparent backgrounds and borders
  const variantClasses: Record<string, string> = {
    red: 'bg-red-700/30 text-red-200 border border-red-500/30',
    orange: 'bg-orange-700/30 text-orange-200 border border-orange-500/30',
    yellow: 'bg-yellow-700/30 text-yellow-200 border border-yellow-500/30',
    green: 'bg-green-700/30 text-green-200 border border-green-500/30',
    teal: 'bg-teal-700/30 text-teal-200 border border-teal-500/30',
    blue: 'bg-blue-700/30 text-blue-200 border border-blue-500/30',
    purple: 'bg-purple-700/30 text-purple-200 border border-purple-500/30',
    pink: 'bg-pink-700/30 text-pink-200 border border-pink-500/30',
    gray: 'bg-gray-700/30 text-gray-200 border border-gray-500/30',
  };

  chip.className = `
    inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
    ${variantClasses[variant]}
  `.trim().replace(/\s+/g, ' ');

  chip.textContent = label;

  return chip;
}
