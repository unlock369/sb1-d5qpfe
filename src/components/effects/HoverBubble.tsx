import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface HoverBubbleProps {
  children: ReactNode;
  className?: string;
}

export default function HoverBubble({ children, className = '' }: HoverBubbleProps) {
  return (
    <motion.div
      className={`hover-bubble ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}