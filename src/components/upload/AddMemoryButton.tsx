import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import UploadModal from './UploadModal';

export default function AddMemoryButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
      >
        <Plus className="h-5 w-5" />
        Add Memory
      </motion.button>

      {isModalOpen && (
        <UploadModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}