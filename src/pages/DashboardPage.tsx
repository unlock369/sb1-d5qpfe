import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import CategoryGrid from '../components/content/CategoryGrid';
import MemoryGrid from '../components/content/MemoryGrid';
import BubbleView from '../components/visualizations/BubbleView/BubbleView';
import MemoryDetailModal from '../components/modals/MemoryDetailModal';
import { useMemoryFilter } from '../hooks/useMemoryFilter';
import { featuredMemories } from '../data/memories';
import type { Memory } from '../types';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [viewType, setViewType] = useState<'grid' | 'bubble'>('grid');
  
  const {
    filteredMemories,
    selectedCategory,
    setSelectedCategory,
    searchQuery: filterQuery,
    setSearchQuery: setFilterQuery
  } = useMemoryFilter(featuredMemories);

  const handleMemoryClick = (memory: Memory) => {
    setSelectedMemory(memory);
  };

  return (
    <div className="flex h-screen flex-col bg-black">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        <main className="relative flex-1 overflow-y-auto bg-gradient-to-b from-[#121212] to-black p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Your Memories</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewType('grid')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  viewType === 'grid'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewType('bubble')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  viewType === 'bubble'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Bubble View
              </button>
            </div>
          </div>

          <CategoryGrid />

          <motion.div
            key={viewType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-[calc(100%-16rem)]"
          >
            {viewType === 'grid' ? (
              <MemoryGrid
                memories={filteredMemories}
                onMemoryClick={handleMemoryClick}
              />
            ) : (
              <BubbleView
                memories={filteredMemories}
                onMemoryClick={handleMemoryClick}
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