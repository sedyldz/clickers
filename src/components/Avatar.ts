export interface AvatarProps {
  name: string;
}

// Color mapping for team members using Tailwind color families
// Background uses 900 variant, text uses 300 variant, ring uses 800 variant
const TEAM_COLOR_CLASSES: Record<string, { bg: string; text: string; ring: string }> = {
  'Seda': { bg: 'bg-red-900', text: 'text-red-300', ring: 'ring-white/12' },
  'Nemanja': { bg: 'bg-teal-900', text: 'text-teal-300', ring: 'ring-white/12' },
  'Steve': { bg: 'bg-green-900', text: 'text-green-300', ring: 'ring-white/12' },
  'Dan': { bg: 'bg-yellow-900', text: 'text-yellow-300', ring: 'ring-white/12' },
  'Valentin': { bg: 'bg-purple-900', text: 'text-purple-300', ring: 'ring-white/12' },
  'Catherine': { bg: 'bg-pink-900', text: 'text-pink-300', ring: 'ring-white/12' },
  'Ekan': { bg: 'bg-blue-900', text: 'text-blue-300', ring: 'ring-white/12' },
  'Gabe': { bg: 'bg-purple-900', text: 'text-purple-300', ring: 'ring-white/12' },
  'Dusan': { bg: 'bg-red-900', text: 'text-red-300', ring: 'ring-white/12' },
  'Alvin': { bg: 'bg-teal-900', text: 'text-teal-300', ring: 'ring-white/12' },
  'Melissa': { bg: 'bg-orange-900', text: 'text-orange-300', ring: 'ring-white/12' }
};

export function getTeamMemberColorClasses(name: string): { bg: string; text: string; ring: string } {
  return TEAM_COLOR_CLASSES[name] || { bg: 'bg-gray-800', text: 'text-gray-300', ring: 'ring-gray-800' };
}

export function createAvatar(props: AvatarProps): HTMLElement {
  const { name } = props;

  // Extract first letter and uppercase it
  const initial = name.charAt(0).toUpperCase();

  // Get color classes for this team member
  const colors = getTeamMemberColorClasses(name);

  // Create avatar container
  const avatar = document.createElement('div');
  avatar.className = `avatar relative size-7 shrink-0 rounded-full flex items-center justify-center ring ring-inset ${colors.bg} ${colors.text} ${colors.ring}`;

  // Create text element for initial
  const initialText = document.createElement('span');
  initialText.className = 'font-medium';
  initialText.textContent = initial;

  avatar.appendChild(initialText);

  return avatar;
}
