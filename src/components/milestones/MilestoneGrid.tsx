import React from 'react';
import { motion } from 'framer-motion';
import MilestoneButton from './MilestoneButton';
import type { MilestoneIconType } from './MilestoneIcon';

interface MilestoneCategory {
  type: MilestoneIconType;
  label: string;
  isCustom?: boolean;
}

const categories: MilestoneCategory[] = [
  { type: 'first', label: 'First Moments' },
  { type: 'education', label: 'Education' },
  { type: 'birthday', label: 'Birthdays' },
  { type: 'achievement', label: 'Achievements' },
  { type: 'star', label: 'Special Events' },
  { type: 'custom', label: 'Custom Milestone', isCustom: true },
];

interface MilestoneGridProps {
  onSelectCategory: (category: MilestoneCategory) => void;
}

export default function MilestoneGrid({ onSelectCategory }: MilestoneGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => (
        <motion.div
          key={category.type}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <MilestoneButton
            type={category.type}
            label={category.label}
            isCustom={category.isCustom}
            onClick={() => onSelectCategory(category)}
          />
        </motion.div>
      ))}
    </div>
  );
}