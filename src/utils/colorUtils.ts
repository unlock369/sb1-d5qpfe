const memoryColors = [
  'rgba(59, 130, 246, 0.15)', // blue
  'rgba(16, 185, 129, 0.15)', // green
  'rgba(236, 72, 153, 0.15)', // pink
  'rgba(245, 158, 11, 0.15)', // amber
  'rgba(139, 92, 246, 0.15)'  // purple
];

export function generateRandomColor(): string {
  return memoryColors[Math.floor(Math.random() * memoryColors.length)];
}