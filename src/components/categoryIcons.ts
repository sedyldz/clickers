// SVG icon library for category cards
// All icons use currentColor for easy theming

export function createShieldIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z');

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'm9 12 2 2 4-4');

  svg.appendChild(path1);
  svg.appendChild(path2);

  return svg;
}

export function createBotIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', '3');
  rect.setAttribute('y', '11');
  rect.setAttribute('width', '18');
  rect.setAttribute('height', '10');
  rect.setAttribute('rx', '2');

  const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle1.setAttribute('cx', '12');
  circle1.setAttribute('cy', '5');
  circle1.setAttribute('r', '2');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M12 7v4');

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M8 16h0');

  const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path3.setAttribute('d', 'M16 16h0');

  svg.appendChild(rect);
  svg.appendChild(circle1);
  svg.appendChild(path1);
  svg.appendChild(path2);
  svg.appendChild(path3);

  return svg;
}

export function createLockIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', '5');
  rect.setAttribute('y', '11');
  rect.setAttribute('width', '14');
  rect.setAttribute('height', '11');
  rect.setAttribute('rx', '2');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M7 11V7a5 5 0 0 1 10 0v4');

  svg.appendChild(rect);
  svg.appendChild(path);

  return svg;
}

export function createCreditCardIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', '2');
  rect.setAttribute('y', '5');
  rect.setAttribute('width', '20');
  rect.setAttribute('height', '14');
  rect.setAttribute('rx', '2');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M2 10h20');

  svg.appendChild(rect);
  svg.appendChild(path);

  return svg;
}

export function createUserCheckIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2');

  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '9');
  circle.setAttribute('cy', '7');
  circle.setAttribute('r', '4');

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'm16 11 2 2 4-4');

  svg.appendChild(path1);
  svg.appendChild(circle);
  svg.appendChild(path2);

  return svg;
}

export function createUserXIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2');

  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '9');
  circle.setAttribute('cy', '7');
  circle.setAttribute('r', '4');

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'm17 11 5 5');

  const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path3.setAttribute('d', 'm22 11-5 5');

  svg.appendChild(path1);
  svg.appendChild(circle);
  svg.appendChild(path2);
  svg.appendChild(path3);

  return svg;
}

export function createKeyIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '7.5');
  circle.setAttribute('cy', '15.5');
  circle.setAttribute('r', '5.5');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'm21 2-9.6 9.6');

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'm15.5 7.5 3 3L22 7l-3-3');

  svg.appendChild(circle);
  svg.appendChild(path);
  svg.appendChild(path2);

  return svg;
}

export function createAnalyticsIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M3 3v18h18');

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'm19 9-5 5-4-4-3 3');

  svg.appendChild(path1);
  svg.appendChild(path2);

  return svg;
}

export function createPhoneIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', '5');
  rect.setAttribute('y', '2');
  rect.setAttribute('width', '14');
  rect.setAttribute('height', '20');
  rect.setAttribute('rx', '2');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M12 18h.01');

  svg.appendChild(rect);
  svg.appendChild(path);

  return svg;
}

export function createUserPlusIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2');

  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '9');
  circle.setAttribute('cy', '7');
  circle.setAttribute('r', '4');

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M19 8v6m3-3h-6');

  svg.appendChild(path1);
  svg.appendChild(circle);
  svg.appendChild(path2);

  return svg;
}

export function createSparklesIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'm12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z');

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M5 3v4');

  const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path3.setAttribute('d', 'M19 17v4');

  const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path4.setAttribute('d', 'M3 5h4');

  const path5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path5.setAttribute('d', 'M17 19h4');

  svg.appendChild(path1);
  svg.appendChild(path2);
  svg.appendChild(path3);
  svg.appendChild(path4);
  svg.appendChild(path5);

  return svg;
}

export function createUsersIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2');

  const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle1.setAttribute('cx', '9');
  circle1.setAttribute('cy', '7');
  circle1.setAttribute('r', '4');

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M22 21v-2a4 4 0 0 0-3-3.87');

  const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path3.setAttribute('d', 'M16 3.13a4 4 0 0 1 0 7.75');

  svg.appendChild(path1);
  svg.appendChild(circle1);
  svg.appendChild(path2);
  svg.appendChild(path3);

  return svg;
}

export function createBanIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '12');
  circle.setAttribute('cy', '12');
  circle.setAttribute('r', '10');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M4.93 4.93l14.14 14.14');

  svg.appendChild(circle);
  svg.appendChild(path);

  return svg;
}

export function createBuildingIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', '4');
  rect.setAttribute('y', '2');
  rect.setAttribute('width', '16');
  rect.setAttribute('height', '20');
  rect.setAttribute('rx', '2');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M9 22v-4h6v4');

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M8 6h.01');

  const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path3.setAttribute('d', 'M16 6h.01');

  const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path4.setAttribute('d', 'M12 6h.01');

  const path5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path5.setAttribute('d', 'M12 10h.01');

  const path6 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path6.setAttribute('d', 'M12 14h.01');

  const path7 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path7.setAttribute('d', 'M16 10h.01');

  const path8 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path8.setAttribute('d', 'M16 14h.01');

  const path9 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path9.setAttribute('d', 'M8 10h.01');

  const path10 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path10.setAttribute('d', 'M8 14h.01');

  svg.appendChild(rect);
  svg.appendChild(path1);
  svg.appendChild(path2);
  svg.appendChild(path3);
  svg.appendChild(path4);
  svg.appendChild(path5);
  svg.appendChild(path6);
  svg.appendChild(path7);
  svg.appendChild(path8);
  svg.appendChild(path9);
  svg.appendChild(path10);

  return svg;
}

export function createShoppingCartIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle1.setAttribute('cx', '8');
  circle1.setAttribute('cy', '21');
  circle1.setAttribute('r', '1');

  const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle2.setAttribute('cx', '19');
  circle2.setAttribute('cy', '21');
  circle2.setAttribute('r', '1');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12');

  svg.appendChild(circle1);
  svg.appendChild(circle2);
  svg.appendChild(path);

  return svg;
}

export function createClockIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '12');
  circle.setAttribute('cy', '12');
  circle.setAttribute('r', '10');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M12 6v6l4 2');

  svg.appendChild(circle);
  svg.appendChild(path1);

  return svg;
}

export function createGamepadIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M6 12h4');

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M8 10v4');

  const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path3.setAttribute('d', 'M15 13h.01');

  const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path4.setAttribute('d', 'M18 11h.01');

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', '2');
  rect.setAttribute('y', '6');
  rect.setAttribute('width', '20');
  rect.setAttribute('height', '12');
  rect.setAttribute('rx', '6');

  svg.appendChild(path1);
  svg.appendChild(path2);
  svg.appendChild(path3);
  svg.appendChild(path4);
  svg.appendChild(rect);

  return svg;
}

export function createCoinsIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle1.setAttribute('cx', '8');
  circle1.setAttribute('cy', '8');
  circle1.setAttribute('r', '6');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M18.09 10.37A6 6 0 1 1 10.34 18');

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M7 6h1v4');

  const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path3.setAttribute('d', 'm16.71 13.88.7.71-2.82 2.82');

  svg.appendChild(circle1);
  svg.appendChild(path1);
  svg.appendChild(path2);
  svg.appendChild(path3);

  return svg;
}

export function createMouseIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', '6');
  rect.setAttribute('y', '3');
  rect.setAttribute('width', '12');
  rect.setAttribute('height', '18');
  rect.setAttribute('rx', '6');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M12 7v4');

  svg.appendChild(rect);
  svg.appendChild(path);

  return svg;
}

export function createTimerIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M10 2h4');

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M12 14v-4');

  const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path3.setAttribute('d', 'M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6');

  const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path4.setAttribute('d', 'M9 17H4v5');

  svg.appendChild(path1);
  svg.appendChild(path2);
  svg.appendChild(path3);
  svg.appendChild(path4);

  return svg;
}

export function createEyeIcon(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z');

  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '12');
  circle.setAttribute('cy', '12');
  circle.setAttribute('r', '3');

  svg.appendChild(path1);
  svg.appendChild(circle);

  return svg;
}

// Icon map for easy lookup
export const iconMap: Record<string, () => SVGElement> = {
  shield: createShieldIcon,
  bot: createBotIcon,
  lock: createLockIcon,
  creditCard: createCreditCardIcon,
  userCheck: createUserCheckIcon,
  userX: createUserXIcon,
  key: createKeyIcon,
  analytics: createAnalyticsIcon,
  phone: createPhoneIcon,
  userPlus: createUserPlusIcon,
  sparkles: createSparklesIcon,
  users: createUsersIcon,
  ban: createBanIcon,
  building: createBuildingIcon,
  shoppingCart: createShoppingCartIcon,
  clock: createClockIcon,
  gamepad: createGamepadIcon,
  coins: createCoinsIcon,
  mouse: createMouseIcon,
  timer: createTimerIcon,
  eye: createEyeIcon,
};
