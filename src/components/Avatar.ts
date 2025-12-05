export interface AvatarProps {
  name: string;
  backgroundColor?: string;
}

// Color palette for team members
const TEAM_COLORS: Record<string, string> = {
  'Seda': '#FF6B6B',      // Coral Red
  'Nemanja': '#4ECDC4',   // Turquoise
  'Steve': '#95E1D3',     // Mint
  'Dan': '#FFD93D',       // Yellow
  'Valentin': '#6C5CE7',  // Purple
  'Catherine': '#FD79A8', // Pink
  'Ekan': '#74B9FF',      // Light Blue
  'Gabe': '#A29BFE',      // Lavender
  'Dusan': '#FF7675',     // Soft Red
  'Alvin': '#55EFC4',     // Aqua
  'Melissa': '#FDCB6E'    // Orange
};

export function getTeamMemberColor(name: string): string {
  return TEAM_COLORS[name] || '#999999'; // Fallback gray
}

export function createAvatar(props: AvatarProps): HTMLElement {
  const { name, backgroundColor } = props;

  // Extract first letter and uppercase it
  const initial = name.charAt(0).toUpperCase();

  // Create avatar container
  const avatar = document.createElement('div');
  avatar.className = 'avatar relative size-7 shrink-0 rounded-full flex items-center justify-center text-gray-1000';
  avatar.style.backgroundColor = backgroundColor || getTeamMemberColor(name);

  // Create text element for initial
  const initialText = document.createElement('span');
  initialText.textContent = initial;

  avatar.appendChild(initialText);

  return avatar;
}
