import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export default function SidebarSection({ 
  title, 
  children, 
  isExpanded = true,
  onToggle 
}: SidebarSectionProps) {
  return (
    <div className="flex flex-col">
      <button
        onClick={onToggle}
        className="flex items-center justify-between px-2 py-3 text-sm font-bold text-gray-400 hover:text-white"
      >
        {title}
        {onToggle && (
          isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )
        )}
      </button>
      {isExpanded && (
        <div className="space-y-1">
          {children}
        </div>
      )}
    </div>
  );
}