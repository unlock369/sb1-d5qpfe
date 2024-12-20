import React, { useEffect, useRef, useState } from 'react';
import { createBubble } from '../utils/bubbleUtils';

const MIN_BUBBLES = 15;
const MAX_BUBBLES = 20;
const SPAWN_INTERVAL = 1000;

export default function BackgroundBubbles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    const createNewBubble = () => {
      if (!isVisible || bubblesRef.current.length >= MAX_BUBBLES) return;

      const bubble = createBubble();
      container.appendChild(bubble);
      bubblesRef.current.push(bubble);

      const duration = 8000 + Math.random() * 4000;
      
      setTimeout(() => {
        bubble.classList.add('pop');
        setTimeout(() => {
          if (container.contains(bubble)) {
            container.removeChild(bubble);
          }
          bubblesRef.current = bubblesRef.current.filter(b => b !== bubble);
        }, 300);
      }, duration);
    };

    // Create initial bubbles
    for (let i = 0; i < MIN_BUBBLES; i++) {
      setTimeout(() => createNewBubble(), i * 200);
    }

    // Continue creating bubbles periodically
    const interval = setInterval(() => {
      if (bubblesRef.current.length < MIN_BUBBLES) {
        createNewBubble();
      }
    }, SPAWN_INTERVAL);

    return () => {
      clearInterval(interval);
      observer.disconnect();
      bubblesRef.current.forEach(bubble => {
        if (container.contains(bubble)) {
          container.removeChild(bubble);
        }
      });
    };
  }, [isVisible]);

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