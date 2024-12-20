import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className="h-full bg-blue-500"
      />
    </div>
  );
}