import type { Memory } from '../types';

export function getCalendarDays(date: Date): Date[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const days: Date[] = [];
  
  // Add days from previous month
  for (let i = firstDay.getDay(); i > 0; i--) {
    days.push(new Date(year, month, -i + 1));
  }
  
  // Add days from current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }
  
  // Add days from next month
  const remainingDays = 42 - days.length; // 6 rows * 7 days
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i));
  }
  
  return days;
}

export function getMemoriesForDate(memories: Memory[], date: Date): Memory[] {
  return memories.filter(memory => {
    const memoryDate = new Date(memory.date);
    return (
      memoryDate.getFullYear() === date.getFullYear() &&
      memoryDate.getMonth() === date.getMonth() &&
      memoryDate.getDate() === date.getDate()
    );
  });
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}