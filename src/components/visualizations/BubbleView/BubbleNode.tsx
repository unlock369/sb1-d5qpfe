import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BubbleNode as BubbleNodeType } from '../../../hooks/useBubbleLayout';

interface BubbleNodeProps {
  node: BubbleNodeType;
  scale: number;
  onClick: () => void;
}

export default function BubbleNode({ node, scale, onClick }: BubbleNodeProps) {
  const [isPopping, setIsPopping] = useState(false);
  const size = node.r * 2 * scale;

  const handleClick = () => {
    setIsPopping(true);
    setTimeout(() => {
      setIsPopping(false);
      onClick();
    }, 500);
  };

  return (
    <AnimatePresence>
      {!isPopping ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: node.x - node.r * scale,
            y: node.y - node.r * scale,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="bubble-float absolute cursor-pointer overflow-hidden rounded-full"
          style={{ 
            width: size,
            height: size,
            '--duration': `${15 + Math.random() * 10}s`,
            '--delay': `${Math.random() * 5}s`
          } as React.CSSProperties}
          onClick={handleClick}
        >
          <div className="group relative h-full w-full">
            <img
              src={node.memory.imageUrl}
              alt={node.memory.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute bottom-0 w-full p-4">
                <h3 className="text-sm font-medium text-white">{node.memory.title}</h3>
              </div>
            </div>
            <div className="absolute inset-0 rounded-full transition-opacity duration-300 group-hover:bubble-ripple" />
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 1.5 }}
          exit={{ opacity: 0, scale: 0 }}
          className="bubble-burst absolute overflow-hidden rounded-full"
          style={{ 
            width: size,
            height: size,
            left: node.x - node.r * scale,
            top: node.y - node.r * scale,
          }}
        >
          <div className="relative h-full w-full">
            <img
              src={node.memory.imageUrl}
              alt={node.memory.title}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}