import React from 'react';
import { motion } from 'framer-motion';
import CalendarEvent from './CalendarEvent';
import { getMemoriesForDate } from '../../../utils/calendarUtils';
import type { Memory } from '../../../types';

interface CalendarGridProps {
  days: Date[];
  memories: Memory[];
  currentDate: Date;
  onEventClick: (memory: Memory) => void;
}

export default function CalendarGrid({
  days,
  memories,
  currentDate,
  onEventClick
}: CalendarGridProps) {
  return (
    <div className="grid h-full grid-cols-7 gap-px bg-white/5 p-2">
      {days.map((date, index) => {
        const dayMemories = getMemoriesForDate(memories, date);
        const isCurrentMonth = date.getMonth() === currentDate.getMonth();
        const isToday = date.toDateString() === new Date().toDateString();

        return (
          <motion.div
            key={date.toISOString()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            className={`min-h-[120px] overflow-hidden rounded-lg p-2 ${
              isCurrentMonth
                ? 'bg-white/5'
                : 'bg-white/2'
            } ${
              isToday
                ? 'ring-2 ring-blue-500'
                : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${
                isCurrentMonth ? 'text-white' : 'text-gray-500'
              }`}>
                {date.getDate()}
              </span>
              {dayMemories.length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-medium text-white">
                  {dayMemories.length}
                </span>
              )}
            </div>
            <div className="mt-2 space-y-1">
              {dayMemories.map((memory) => (
                <CalendarEvent
                  key={memory.id}
                  memory={memory}
                  onClick={() => onEventClick(memory)}
                />
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}