import React from 'react';
import { ZoomIn, ZoomOut, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineControlsProps {
  date: Date;
  onDateChange: (date: Date) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export default function TimelineControls({
  date,
  onDateChange,
  onZoomIn,
  onZoomOut
}: TimelineControlsProps) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-black/50 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onZoomOut}
          className="rounded-lg bg-white/5 p-2 text-white transition-colors hover:bg-white/10"
        >
          <ZoomOut className="h-5 w-5" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onZoomIn}
          className="rounded-lg bg-white/5 p-2 text-white transition-colors hover:bg-white/10"
        >
          <ZoomIn className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-gray-400" />
        <input
          type="month"
          value={date.toISOString().slice(0, 7)}
          onChange={(e) => onDateChange(new Date(e.target.value))}
          className="rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors hover:bg-white/10"
        />
      </div>
    </div>
  );
}