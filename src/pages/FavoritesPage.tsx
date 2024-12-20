import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import MemoryGrid from '../components/MemoryGrid';
import MemoryDetailModal from '../components/modals/MemoryDetailModal';
import { useMemories } from '../hooks/useMemories';
import type { Memory } from '../types';

export default function FavoritesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const { memories } = useMemories();

  // Filter favorite memories (you can implement your own favorite logic)
  const favoriteMemories = memories.filter(memory => 
    memory.tags.includes('favorite')
  );

  return (
    <div className="flex h-screen flex-col bg-black">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#121212] to-black p-6">
          <h1 className="mb-6 text-2xl font-bold text-white">Favorite Memories</h1>
          
          <MemoryGrid
            memories={favoriteMemories}
            onMemoryClick={setSelectedMemory}
          />
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