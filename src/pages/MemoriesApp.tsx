import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MemoryGrid from '../components/MemoryGrid';
import MemoryPopup from '../components/MemoryPopup';
import BackgroundBubbles from '../components/BackgroundBubbles';
import { useMemories } from '../hooks/useMemories';
import type { Memory } from '../types';

export default function MemoriesApp() {
  const { 
    memories, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery 
  } = useMemories();

  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  const handleMemoryClick = (memory: Memory) => {
    setSelectedMemory(memory);
  };

  const handleClosePopup = () => {
    setSelectedMemory(null);
  };

  const handleAddMemory = () => {
    console.log('Add memory clicked');
    // TODO: Implement add memory modal
  };

  const handleNotificationsClick = () => {
    console.log('Notifications clicked');
    // TODO: Implement notifications panel
  };

  return (
    <div className="flex h-screen flex-col bg-black text-white">
      <BackgroundBubbles />
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddMemory={handleAddMemory}
        onNotificationsClick={handleNotificationsClick}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        <main className="flex-1 overflow-y-auto">
          <MemoryGrid
            memories={memories}
            onMemoryClick={handleMemoryClick}
          />
        </main>
      </div>
      
      {selectedMemory && (
        <MemoryPopup
          memory={selectedMemory}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}