import React, { useEffect, useRef } from 'react';
import { createBackgroundBubble, limitBubbles } from '../../utils/animationUtils';

interface BackgroundBubblesProps {
  maxBubbles?: number;
  interval?: number;
}

export default function BackgroundBubbles({
  maxBubbles = 15,
  interval = 3000
}: BackgroundBubblesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createBubble = () => {
      if (container.children.length >= maxBubbles) return;
      
      const bubble = createBackgroundBubble();
      container.appendChild(bubble);

      bubble.addEventListener('animationend', () => {
        if (container.contains(bubble)) {
          container.removeChild(bubble);
        }
      });
    };

    // Create initial bubbles
    for (let i = 0; i < maxBubbles / 2; i++) {
      setTimeout(() => createBubble(), i * 200);
    }

    // Create new bubbles periodically
    const intervalId = setInterval(() => {
      limitBubbles(container, maxBubbles);
      createBubble();
    }, interval);

    return () => {
      clearInterval(intervalId);
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [maxBubbles, interval]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ 
        zIndex: 0,
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    />
  );
}