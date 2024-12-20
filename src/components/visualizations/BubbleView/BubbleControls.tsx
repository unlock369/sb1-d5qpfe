import React from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface BubbleControlsProps {
  scale: number;
  onScaleChange: (scale: number) => void;
}

export default function BubbleControls({ scale, onScaleChange }: BubbleControlsProps) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-black/50 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onScaleChange(Math.max(0.5, scale - 0.1))}
          className="rounded-lg bg-white/5 p-2 text-white transition-colors hover:bg-white/10"
        >
          <ZoomOut className="h-5 w-5" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onScaleChange(Math.min(2, scale + 0.1))}
          className="rounded-lg bg-white/5 p-2 text-white transition-colors hover:bg-white/10"
        >
          <ZoomIn className="h-5 w-5" />
        </motion.button>
      </div>
    </div>
  );
}