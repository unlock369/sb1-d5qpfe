import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import BubbleNode from './BubbleNode';
import BubbleControls from './BubbleControls';
import { useBubbleLayout } from '../../../hooks/useBubbleLayout';
import type { Memory } from '../../../types';

interface BubbleViewProps {
  memories: Memory[];
  onMemoryClick: (memory: Memory) => void;
}

export default function BubbleView({ memories, onMemoryClick }: BubbleViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { nodes, updateLayout, scale, setScale } = useBubbleLayout(memories);

  useEffect(() => {
    if (containerRef.current) {
      updateLayout(containerRef.current.clientWidth, containerRef.current.clientHeight);
    }
  }, [memories, updateLayout]);

  return (
    <div className="flex h-full flex-col">
      <BubbleControls scale={scale} onScaleChange={setScale} />
      
      <div 
        ref={containerRef}
        className="relative flex-1 overflow-hidden bg-gradient-to-b from-black/50 to-transparent"
      >
        {nodes.map((node) => (
          <BubbleNode
            key={node.id}
            node={node}
            scale={scale}
            onClick={() => onMemoryClick(node.memory)}
          />
        ))}
      </div>
    </div>
  );
}