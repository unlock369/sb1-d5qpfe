import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import TimelineEvent from './TimelineEvent';
import TimelineControls from './TimelineControls';
import { useTimelineZoom } from '../../../hooks/useTimelineZoom';
import { groupEventsByMonth } from '../../../utils/timelineUtils';
import type { Memory } from '../../../types';

interface TimelineViewProps {
  memories: Memory[];
  onEventClick: (memory: Memory) => void;
}

export default function TimelineView({ memories, onEventClick }: TimelineViewProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { scale, zoomIn, zoomOut } = useTimelineZoom();
  
  const groupedMemories = groupEventsByMonth(memories);
  
  const handleScroll = (direction: 'left' | 'right') => {
    if (!timelineRef.current) return;
    
    const scrollAmount = timelineRef.current.clientWidth * 0.8;
    const newPosition = timelineRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    
    timelineRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex h-full flex-col">
      <TimelineControls
        date={currentDate}
        onDateChange={setCurrentDate}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
      />
      
      <div className="relative flex-1">
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div
          ref={timelineRef}
          className="h-full overflow-x-auto overflow-y-hidden"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div 
            className="relative h-full"
            style={{ 
              width: `${100 * scale}%`,
              minWidth: '100%',
              transition: 'width 0.3s ease-out'
            }}
          >
            {Object.entries(groupedMemories).map(([month, monthMemories]) => (
              <div key={month} className="absolute top-0">
                <div className="sticky left-0 bg-black/50 px-4 py-2 backdrop-blur-sm">
                  <h3 className="text-sm font-medium text-white">{month}</h3>
                </div>
                <div className="flex flex-wrap gap-4 p-4">
                  {monthMemories.map((memory) => (
                    <TimelineEvent
                      key={memory.id}
                      memory={memory}
                      onClick={() => onEventClick(memory)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => handleScroll('right')}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}