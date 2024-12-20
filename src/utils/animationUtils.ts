interface BubbleStyles {
  size: number;
  x: number;
  y: number;
  opacity: number;
  blur: number;
  color: string;
  duration: number;
  delay: number;
}

export function generateBubbleStyles(): BubbleStyles {
  return {
    size: Math.random() * (100 - 20) + 20,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    opacity: 0.1 + Math.random() * 0.1,
    blur: 2 + Math.random() * 3,
    color: `hsla(${Math.random() * 360}, 70%, 70%, 0.1)`,
    duration: 15 + Math.random() * 15,
    delay: Math.random() * 5
  };
}

export function createBackgroundBubble(): HTMLDivElement {
  const bubble = document.createElement('div');
  const styles = generateBubbleStyles();
  
  bubble.className = 'background-bubble';
  bubble.style.cssText = `
    width: ${styles.size}px;
    height: ${styles.size}px;
    left: ${styles.x}px;
    top: ${styles.y}px;
    background: ${styles.color};
    opacity: ${styles.opacity};
    --blur: ${styles.blur}px;
    --duration: ${styles.duration}s;
    --delay: ${styles.delay}s;
  `;

  return bubble;
}

export function limitBubbles(container: HTMLElement, maxBubbles: number): void {
  const bubbles = container.getElementsByClassName('background-bubble');
  while (bubbles.length > maxBubbles) {
    bubbles[0].remove();
  }
}