import React, { useEffect, useRef } from 'react';
import MemoryBubble from './MemoryBubble';
import type { Memory } from '../types';
import '../styles/animations.css';

interface MemoryGridProps {
  memories: Memory[];
  onMemoryClick: (memory: Memory) => void;
}

export default function MemoryGrid({ memories, onMemoryClick }: MemoryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const bubbles = container.getElementsByClassName('memory-bubble');
    Array.from(bubbles).forEach((bubble, index) => {
      const element = bubble as HTMLElement;
      const delay = index * 0.1;
      const duration = 20 + Math.random() * 10;
      
      element.style.animation = `float ${duration}s ease-in-out infinite`;
      element.style.animationDelay = `${delay}s`;
    });
  }, [memories]);

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-wrap gap-8 p-8 min-h-[600px]"
    >
      {memories.map((memory) => (
        <div 
          key={memory.id}
          className="memory-bubble transition-all duration-500"
          style={{
            position: 'relative',
            zIndex: 1
          }}
        >
          <MemoryBubble
            memory={memory}
            onClick={onMemoryClick}
          />
        </div>
      ))}
    </div>
  );
}