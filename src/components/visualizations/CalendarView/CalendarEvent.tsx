import React from 'react';
import { motion } from 'framer-motion';
import type { Memory } from '../../../types';

interface CalendarEventProps {
  memory: Memory;
  onClick: () => void;
}

export default function CalendarEvent({ memory, onClick }: CalendarEventProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded bg-blue-500/20 px-2 py-1 text-left text-sm text-blue-300 transition-colors hover:bg-blue-500/30"
    >
      <div className="h-2 w-2 rounded-full bg-blue-400" />
      <span className="truncate">{memory.title}</span>
    </motion.button>
  );
}