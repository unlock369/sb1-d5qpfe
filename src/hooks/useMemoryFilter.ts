import { useState, useMemo } from 'react';
import type { Memory } from '../types';

export function useMemoryFilter(memories: Memory[]) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMemories = useMemo(() => {
    return memories.filter(memory => {
      // Filter by category
      if (selectedCategory && selectedCategory !== 'All Memories') {
        if (selectedCategory === 'Private' && memory.privacy !== 'private') return false;
        if (selectedCategory === 'Milestones' && memory.category !== 'milestone') return false;
        if (selectedCategory === 'Events' && memory.category !== 'event') return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          memory.title.toLowerCase().includes(query) ||
          memory.description.toLowerCase().includes(query) ||
          memory.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      return true;
    });
  }, [memories, selectedCategory, searchQuery]);

  return {
    filteredMemories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  };
}