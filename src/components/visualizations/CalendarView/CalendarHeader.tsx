import React from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ViewMode } from '../../../types';

interface CalendarHeaderProps {
  date: Date;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export default function CalendarHeader({
  date,
  viewMode,
  onViewModeChange,
  onNavigate
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-white">
          {date.toLocaleString('default', { 
            month: 'long',
            year: 'numeric'
          })}
        </h2>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('prev')}
            className="rounded-lg bg-white/5 p-2 text-white transition-colors hover:bg-white/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('next')}
            className="rounded-lg bg-white/5 p-2 text-white transition-colors hover:bg-white/10"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onViewModeChange('month')}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            viewMode === 'month'
              ? 'bg-blue-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <CalendarIcon className="h-4 w-4" />
        </button>
        <button
          onClick={() => onViewModeChange('week')}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            viewMode === 'week'
              ? 'bg-blue-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Calendar className="h-4 w-4" />
        </button>
        <button
          onClick={() => onViewModeChange('day')}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            viewMode === 'day'
              ? 'bg-blue-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Clock className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}