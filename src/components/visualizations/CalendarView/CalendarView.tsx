import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import CalendarEvent from './CalendarEvent';
import { useCalendarNavigation } from '../../../hooks/useCalendarNavigation';
import { getCalendarDays } from '../../../utils/calendarUtils';
import type { Memory } from '../../../types';

interface CalendarViewProps {
  memories: Memory[];
  onEventClick: (memory: Memory) => void;
}

export default function CalendarView({ memories, onEventClick }: CalendarViewProps) {
  const { 
    currentDate,
    viewMode,
    navigateMonth,
    setViewMode,
  } = useCalendarNavigation();

  const days = getCalendarDays(currentDate);

  return (
    <div className="flex h-full flex-col rounded-lg bg-black/20 backdrop-blur-sm">
      <CalendarHeader
        date={currentDate}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onNavigate={navigateMonth}
      />
      
      <div className="grid grid-cols-7 gap-px border-b border-white/10 bg-white/5 px-2 py-3">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-400">
            {day}
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <CalendarGrid
          days={days}
          memories={memories}
          currentDate={currentDate}
          onEventClick={onEventClick}
        />
      </div>
    </div>
  );
}