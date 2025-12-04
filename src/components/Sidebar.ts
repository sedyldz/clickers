export interface SidebarOptions {
  widthClass?: string; // tailwind width class like 'w-64'
}

export function createSidebar(options: SidebarOptions = {}) {
  const { widthClass = 'w-64' } = options;

  const aside = document.createElement('aside');
  aside.className = `site-sidebar fixed inset-y-0 left-0 ${widthClass} transform -translate-x-full z-40 bg-color-white border-r border-black/10 shadow-lg overflow-auto`;
  aside.setAttribute('aria-hidden', 'true');
  aside.setAttribute('role', 'navigation');

  // Header for sidebar with close button for small screens
  const header = document.createElement('div');
  header.className = 'flex items-center justify-between p-4 border-b border-black/10';
  const title = document.createElement('div');
  title.className = 'font-medium text-color-gray-1000';
  title.textContent = 'Navigation';
  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-color-gray-200';
  closeBtn.textContent = 'Close';
  closeBtn.addEventListener('click', () => {
    close();
  });

  header.appendChild(title);
  header.appendChild(closeBtn);

  const content = document.createElement('div');
  content.className = 'p-4';
  content.innerHTML = `
    <p class="text-sm text-color-gray-700">Sidebar content placeholder.</p>
    <ul class="mt-4 space-y-2">
      <li><a class="block px-2 py-1 rounded hover:bg-color-gray-100 cursor-pointer">Dashboard</a></li>
      <li><a class="block px-2 py-1 rounded hover:bg-color-gray-100 cursor-pointer">Settings</a></li>
      <li><a class="block px-2 py-1 rounded hover:bg-color-gray-100 cursor-pointer">Profile</a></li>
    </ul>
  `;

  aside.appendChild(header);
  aside.appendChild(content);

  const open = () => {
    document.body.classList.add('sidebar-open');
    aside.setAttribute('aria-hidden', 'false');
  };

  const close = () => {
    document.body.classList.remove('sidebar-open');
    aside.setAttribute('aria-hidden', 'true');
  };

  const toggle = () => {
    document.body.classList.toggle('sidebar-open');
    const hidden = document.body.classList.contains('sidebar-open') ? 'false' : 'true';
    aside.setAttribute('aria-hidden', hidden);
  };

  return { aside, open, close, toggle, content };
}
