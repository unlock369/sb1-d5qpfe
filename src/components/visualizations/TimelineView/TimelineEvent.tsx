import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../../../utils/dateUtils';
import type { Memory } from '../../../types';

interface TimelineEventProps {
  memory: Memory;
  onClick: () => void;
}

export default function TimelineEvent({ memory, onClick }: TimelineEventProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group relative w-48 cursor-pointer overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={memory.imageUrl}
          alt={memory.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-3">
        <h4 className="font-medium text-white line-clamp-1">{memory.title}</h4>
        <p className="mt-1 text-sm text-gray-400">{formatDate(memory.date)}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}