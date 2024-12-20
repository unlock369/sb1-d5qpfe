import { useState, useCallback } from 'react';
import { where } from 'firebase/firestore';
import { useFirestore } from './useFirestore';
import { useStorage } from './useStorage';
import { useAuthContext } from '../context/AuthContext';
import { addMemory, updateMemory, deleteMemory } from '../services/memories';
import type { Memory } from '../../types';

export function useMemories() {
  const { user } = useAuthContext();
  const { upload } = useStorage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const constraints = user ? [where('userId', '==', user.uid)] : [];
  const { data: memories, loading, error } = useFirestore<Memory>('memories', constraints);

  const handleAddMemory = useCallback(async (memory: Omit<Memory, 'id'>, imageFile: File) => {
    if (!user) throw new Error('User must be logged in to add memories');

    try {
      const result = await addMemory({
        ...memory,
        userId: user.uid
      }, imageFile);
      
      return result;
    } catch (error) {
      console.error('Error adding memory:', error);
      throw error;
    }
  }, [user]);

  const handleUpdateMemory = useCallback(async (id: string, updates: Partial<Memory>) => {
    try {
      await updateMemory(id, updates);
    } catch (error) {
      console.error('Error updating memory:', error);
      throw error;
    }
  }, []);

  const handleDeleteMemory = useCallback(async (id: string) => {
    try {
      await deleteMemory(id);
    } catch (error) {
      console.error('Error deleting memory:', error);
      throw error;
    }
  }, []);

  const filteredMemories = memories.filter(memory => {
    if (selectedCategory && selectedCategory !== 'All Photos') {
      if (selectedCategory === 'Private' && memory.privacy !== 'private') return false;
      if (selectedCategory === 'Milestones' && memory.category !== 'milestone') return false;
      if (selectedCategory === 'Events' && memory.category !== 'event') return false;
    }
    
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

  return {
    memories: filteredMemories,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    addMemory: handleAddMemory,
    updateMemory: handleUpdateMemory,
    deleteMemory: handleDeleteMemory
  };
}