import React from 'react';
import { Trophy, Star, Sparkles, GraduationCap, Baby, Cake } from 'lucide-react';
import { motion } from 'framer-motion';

export type MilestoneIconType = 'achievement' | 'star' | 'custom' | 'education' | 'first' | 'birthday';

interface MilestoneIconProps {
  type: MilestoneIconType;
  size?: number;
  className?: string;
}

const iconMap: Record<MilestoneIconType, React.ElementType> = {
  achievement: Trophy,
  star: Star,
  custom: Sparkles,
  education: GraduationCap,
  first: Baby,
  birthday: Cake,
};

export default function MilestoneIcon({ type, size = 24, className = '' }: MilestoneIconProps) {
  const Icon = iconMap[type];

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-2 ${className}`}
    >
      <Icon size={size} className="text-blue-400" />
    </motion.div>
  );
}