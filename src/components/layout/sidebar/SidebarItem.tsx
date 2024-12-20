import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  count?: number;
  isActive?: boolean;
  onClick?: () => void;
}

export default function SidebarItem({
  icon: Icon,
  label,
  count,
  isActive,
  onClick
}: SidebarItemProps) {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-md px-4 py-2 text-sm transition-colors ${
        isActive 
          ? 'bg-white/10 text-white' 
          : 'text-gray-400 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      {count !== undefined && (
        <span className="text-xs text-gray-500">{count}</span>
      )}
    </motion.button>
  );
}