export interface AvatarProps {
  name: string;
}

// Color mapping for team members using Tailwind color families
// Background uses 800 variant, text uses 200 variant
const TEAM_COLOR_CLASSES: Record<string, { bg: string; text: string }> = {
  'Seda': { bg: 'bg-red-800', text: 'text-red-200' },
  'Nemanja': { bg: 'bg-teal-800', text: 'text-teal-200' },
  'Steve': { bg: 'bg-green-800', text: 'text-green-200' },
  'Dan': { bg: 'bg-yellow-800', text: 'text-yellow-200' },
  'Valentin': { bg: 'bg-purple-800', text: 'text-purple-200' },
  'Catherine': { bg: 'bg-pink-800', text: 'text-pink-200' },
  'Ekan': { bg: 'bg-blue-800', text: 'text-blue-200' },
  'Gabe': { bg: 'bg-purple-800', text: 'text-purple-200' },
  'Dusan': { bg: 'bg-red-800', text: 'text-red-200' },
  'Alvin': { bg: 'bg-teal-800', text: 'text-teal-200' },
  'Melissa': { bg: 'bg-orange-800', text: 'text-orange-200' }
};

export function getTeamMemberColorClasses(name: string): { bg: string; text: string } {
  return TEAM_COLOR_CLASSES[name] || { bg: 'bg-gray-800', text: 'text-gray-200' };
}

export function createAvatar(props: AvatarProps): HTMLElement {
  const { name } = props;

  // Extract first letter and uppercase it
  const initial = name.charAt(0).toUpperCase();

  // Get color classes for this team member
  const colors = getTeamMemberColorClasses(name);

  // Create avatar container
  const avatar = document.createElement('div');
  avatar.className = `avatar relative size-7 shrink-0 rounded-full flex items-center justify-center ${colors.bg} ${colors.text}`;

  // Create text element for initial
  const initialText = document.createElement('span');
  initialText.textContent = initial;

  avatar.appendChild(initialText);

  return avatar;
}
