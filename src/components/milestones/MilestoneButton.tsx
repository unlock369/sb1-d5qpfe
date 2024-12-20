import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import MilestoneIcon, { MilestoneIconType } from './MilestoneIcon';

interface MilestoneButtonProps {
  onClick: () => void;
  type: MilestoneIconType;
  label: string;
  isCustom?: boolean;
}

export default function MilestoneButton({ onClick, type, label, isCustom }: MilestoneButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex w-full items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-colors hover:bg-white/10"
    >
      <MilestoneIcon type={type} />
      <div>
        <h3 className="font-medium text-white">{label}</h3>
        {isCustom && (
          <p className="text-sm text-gray-400">Create a custom milestone</p>
        )}
      </div>
      <Plus className="ml-auto h-5 w-5 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.button>
  );
}