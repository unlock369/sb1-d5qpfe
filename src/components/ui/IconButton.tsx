import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconButtonProps {
  Icon: LucideIcon;
  label: string;
  count?: number;
  onClick: () => void;
  active?: boolean;
  badge?: boolean;
}

export default function IconButton({ Icon, label, count, onClick, active, badge }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative flex w-full items-center justify-between rounded-lg px-3 py-2 transition-colors ${
        active ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800/50'
      }`}
    >
      <div className="flex items-center space-x-3">
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </div>
      {count !== undefined && <span className="text-sm text-gray-500">{count}</span>}
      {badge && (
        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-blue-500" />
      )}
    </button>
  );
}