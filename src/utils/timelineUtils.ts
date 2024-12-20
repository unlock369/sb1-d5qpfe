import type { Memory } from '../types';

export function groupEventsByMonth(memories: Memory[]): Record<string, Memory[]> {
  const grouped: Record<string, Memory[]> = {};
  
  memories.forEach((memory) => {
    const date = new Date(memory.date);
    const monthKey = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }
    
    grouped[monthKey].push(memory);
  });
  
  // Sort months chronologically
  return Object.fromEntries(
    Object.entries(grouped).sort(([a], [b]) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateB.getTime() - dateA.getTime();
    })
  );
}

export function getTimelineRange(memories: Memory[]): { start: Date; end: Date } {
  const dates = memories.map(m => new Date(m.date));
  return {
    start: new Date(Math.min(...dates.map(d => d.getTime()))),
    end: new Date(Math.max(...dates.map(d => d.getTime())))
  };
}