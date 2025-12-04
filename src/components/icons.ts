export function createMenuIcon(options: { size?: number; className?: string } = {}) {
  const { size = 24, className = '' } = options;
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  if (className) svg.setAttribute('class', className);

  const line1 = document.createElementNS(svgNS, 'line');
  line1.setAttribute('x1', '3');
  line1.setAttribute('y1', '6');
  line1.setAttribute('x2', '21');
  line1.setAttribute('y2', '6');

  const line2 = document.createElementNS(svgNS, 'line');
  line2.setAttribute('x1', '3');
  line2.setAttribute('y1', '12');
  line2.setAttribute('x2', '21');
  line2.setAttribute('y2', '12');

  const line3 = document.createElementNS(svgNS, 'line');
  line3.setAttribute('x1', '3');
  line3.setAttribute('y1', '18');
  line3.setAttribute('x2', '21');
  line3.setAttribute('y2', '18');

  svg.appendChild(line1);
  svg.appendChild(line2);
  svg.appendChild(line3);

  return svg;
}
