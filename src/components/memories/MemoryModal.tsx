import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MemoryForm from './MemoryForm';
import type { Memory } from '../../types';

interface MemoryModalProps {
  memory?: Memory;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function MemoryModal({ memory, isOpen, onClose, onSuccess }: MemoryModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <MemoryForm
          memory={memory}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      )}
    </AnimatePresence>
  );
}