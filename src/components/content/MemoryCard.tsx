import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Lock, Share2, Star } from 'lucide-react';
import type { Memory } from '../../types';
import { formatDate } from '../../utils/dateUtils';

interface MemoryCardProps {
  memory: Memory;
  onClick: () => void;
}

export default function MemoryCard({ memory, onClick }: MemoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative flex flex-col rounded-md bg-[#181818] p-4 transition-colors hover:bg-[#282828]"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden rounded-md">
        <img
          src={memory.imageUrl}
          alt={memory.title}
          className="h-full w-full object-cover"
        />
        <button className="absolute bottom-2 right-2 flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-blue-500 text-white opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100 hover:scale-105 hover:bg-blue-400">
          <Eye className="h-6 w-6" />
        </button>
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white line-clamp-1">{memory.title}</h3>
          <div className="flex space-x-2">
            {memory.privacy === 'private' && (
              <Lock className="h-4 w-4 text-gray-400" />
            )}
            {memory.privacy === 'shared' && (
              <Share2 className="h-4 w-4 text-gray-400" />
            )}
            {memory.category === 'milestone' && (
              <Star className="h-4 w-4 text-yellow-400" />
            )}
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-400">{formatDate(memory.date)}</p>
      </div>
    </motion.div>
  );
}