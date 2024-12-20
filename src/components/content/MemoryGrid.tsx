import React from 'react';
import { motion } from 'framer-motion';
import MemoryCard from './MemoryCard';
import type { Memory } from '../../types';

interface MemoryGridProps {
  memories: Memory[];
  onMemoryClick: (memory: Memory) => void;
}

export default function MemoryGrid({ memories, onMemoryClick }: MemoryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-6 p-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {memories.map((memory, index) => (
        <motion.div
          key={memory.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <MemoryCard
            memory={memory}
            onClick={() => onMemoryClick(memory)}
          />
        </motion.div>
      ))}
    </div>
  );
}