import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export default function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2 rounded-full bg-blue-500 px-6 py-4 text-white shadow-lg transition-colors hover:bg-blue-600"
    >
      <Plus className="h-5 w-5" />
      <span className="font-medium">Add Memory</span>
    </motion.button>
  );
}