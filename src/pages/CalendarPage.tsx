import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import CalendarView from '../components/visualizations/CalendarView/CalendarView';
import TimelineView from '../components/visualizations/TimelineView/TimelineView';
import MemoryDetailModal from '../components/modals/MemoryDetailModal';
import { useMemories } from '../hooks/useMemories';
import type { Memory } from '../types';

export default function CalendarPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [viewType, setViewType] = useState<'calendar' | 'timeline'>('calendar');
  
  const { memories } = useMemories();

  const handleMemoryClick = (memory: Memory) => {
    setSelectedMemory(memory);
  };

  return (
    <div className="flex h-screen flex-col bg-black">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-hidden bg-gradient-to-b from-[#121212] to-black p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Calendar</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewType('calendar')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  viewType === 'calendar'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Calendar View
              </button>
              <button
                onClick={() => setViewType('timeline')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  viewType === 'timeline'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Timeline View
              </button>
            </div>
          </div>

          <motion.div
            key={viewType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-[calc(100%-4rem)]"
          >
            {viewType === 'calendar' ? (
              <CalendarView
                memories={memories}
                onEventClick={handleMemoryClick}
              />
            ) : (
              <TimelineView
                memories={memories}
                onEventClick={handleMemoryClick}
              />
            )}
          </motion.div>
        </main>
      </div>

      {selectedMemory && (
        <MemoryDetailModal
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
        />
      )}
    </div>
  );
}