import { useState } from 'react';
import type { ViewMode } from '../types';

export function useCalendarNavigation(initialDate = new Date()) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [viewMode, setViewMode] = useState<ViewMode>('month');

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(current => {
      const newDate = new Date(current);
      newDate.setMonth(current.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const navigateToDate = (date: Date) => {
    setCurrentDate(date);
  };

  return {
    currentDate,
    viewMode,
    navigateMonth,
    navigateToDate,
    setViewMode,
  };
}