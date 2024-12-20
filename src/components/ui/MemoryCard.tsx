import React from 'react';
import { Lock, Share2, Star } from 'lucide-react';
import type { Memory } from '../../types';

interface MemoryCardProps {
  memory: Memory;
  onClick: (memory: Memory) => void;
}

export default function MemoryCard({ memory, onClick }: MemoryCardProps) {
  return (
    <div
      onClick={() => onClick(memory)}
      className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-900"
    >
      <img
        src={memory.imageUrl}
        alt={memory.title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute bottom-0 w-full p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">{memory.title}</h3>
            <div className="flex space-x-2">
              {memory.privacy === 'private' && (
                <Lock className="h-5 w-5 text-white" />
              )}
              {memory.privacy === 'shared' && (
                <Share2 className="h-5 w-5 text-white" />
              )}
              {memory.category === 'milestone' && (
                <Star className="h-5 w-5 text-yellow-400" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}