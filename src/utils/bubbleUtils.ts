import { generateRandomColor } from './colorUtils';

interface BubbleConfig {
  size: number;
  x: number;
  speed: number;
  opacity: number;
  color: string;
  blur: number;
  drift: number;
}

export function generateBubbleConfig(): BubbleConfig {
  return {
    // Doubled the size range (from 13-65 to 26-130)
    size: 26 + Math.random() * 104,
    x: Math.random() * window.innerWidth,
    speed: 2 + Math.random() * 6,
    opacity: 0.1 + Math.random() * 0.2,
    color: generateRandomColor(),
    blur: 2 + Math.random() * 3,
    drift: -20 + Math.random() * 40
  };
}

export function createBubble(): HTMLDivElement {
  const bubble = document.createElement('div');
  const config = generateBubbleConfig();
  
  bubble.className = 'background-bubble';
  bubble.style.cssText = `
    position: absolute;
    width: ${config.size}px;
    height: ${config.size}px;
    bottom: -${config.size}px;
    left: ${config.x}px;
    background: radial-gradient(circle at 30% 30%, ${config.color}, rgba(255, 255, 255, 0.02));
    border-radius: 50%;
    backdrop-filter: blur(${config.blur}px);
    transform: translateY(0) translateX(0);
    opacity: ${config.opacity};
    will-change: transform, opacity;
    transition: transform ${config.speed}s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out;
  `;

  // Animate with horizontal drift
  requestAnimationFrame(() => {
    bubble.style.transform = `
      translateY(-${window.innerHeight + config.size}px)
      translateX(${config.drift}px)
    `;
  });

  return bubble;
}