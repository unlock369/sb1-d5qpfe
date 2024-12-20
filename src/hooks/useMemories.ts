import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '../lib/supabase';
import type { Memory } from '../types';

export function useMemories() {
  const { user } = useAuth();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const loadMemories = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('memories')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;
        setMemories(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading memories');
      } finally {
        setLoading(false);
      }
    };

    loadMemories();
  }, [user]);

  const addMemory = async (memory: Omit<Memory, 'id'>, imageFile: File) => {
    try {
      if (!user) throw new Error('User must be logged in');

      // 1. Upload image
      const fileExt = imageFile.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('memories')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      // 2. Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('memories')
        .getPublicUrl(filePath);

      // 3. Create memory record
      const { data, error: insertError } = await supabase
        .from('memories')
        .insert({
          user_id: user.id,
          title: memory.title,
          description: memory.description,
          image_url: publicUrl,
          date: memory.date,
          privacy: memory.privacy,
          category: memory.category,
          metadata: memory.metadata
        })
        .select()
        .single();

      if (insertError) throw insertError;

      setMemories(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error adding memory:', err);
      throw err;
    }
  };

  const updateMemory = async (id: string, updates: Partial<Memory>) => {
    try {
      const { data, error } = await supabase
        .from('memories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setMemories(prev => prev.map(m => m.id === id ? data : m));
      return data;
    } catch (err) {
      console.error('Error updating memory:', err);
      throw err;
    }
  };

  const deleteMemory = async (id: string) => {
    try {
      // Get memory to get image path
      const memory = memories.find(m => m.id === id);
      if (!memory) throw new Error('Memory not found');

      // Delete from storage if image exists
      if (memory.imageUrl) {
        const imagePath = memory.imageUrl.split('/').pop();
        if (imagePath) {
          await supabase.storage
            .from('memories')
            .remove([imagePath]);
        }
      }

      // Delete memory record
      const { error } = await supabase
        .from('memories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMemories(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error('Error deleting memory:', err);
      throw err;
    }
  };

  return {
    memories,
    loading,
    error,
    addMemory,
    updateMemory,
    deleteMemory
  };
}