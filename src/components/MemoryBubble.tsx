import React from 'react';
import type { Memory } from '../types';
import { formatDate } from '../utils/dateUtils';

interface MemoryBubbleProps {
  memory: Memory;
  onClick: (memory: Memory) => void;
}

export default function MemoryBubble({ memory, onClick }: MemoryBubbleProps) {
  return (
    <div 
      onClick={() => onClick(memory)}
      className={`group relative aspect-square cursor-pointer rounded-full overflow-hidden border-4 ${
        memory.category === 'milestone' ? 'border-green-500' : 
        memory.category === 'event' ? 'border-blue-500' : 'border-gray-700'
      } transition-all duration-300 ease-out hover:scale-150 hover:z-50`}
      style={{ width: '120px', height: '120px' }}
    >
      <img
        src={memory.imageUrl}
        alt={memory.title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 text-center opacity-0 transition-all duration-300 group-hover:opacity-100">
        <p className="text-xs font-medium text-white truncate">{memory.title}</p>
        <p className="text-[10px] text-gray-300">{formatDate(memory.date)}</p>
      </div>
    </div>
  );
}