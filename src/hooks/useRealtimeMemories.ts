import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '../lib/supabase';
import type { Memory } from '../types';
import type { RealtimeChannel } from '@supabase/supabase-js';

export function useRealtimeMemories() {
  const { user } = useAuth();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    let channel: RealtimeChannel;

    const loadMemories = async () => {
      try {
        // Initial load
        const { data, error: loadError } = await supabase
          .from('memories')
          .select(`
            *,
            tags (
              id,
              name
            )
          `)
          .order('created_at', { ascending: false });

        if (loadError) throw loadError;
        setMemories(data || []);

        // Subscribe to changes
        channel = supabase
          .channel('memories_changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'memories',
              filter: `user_id=eq.${user.id}`
            },
            async (payload) => {
              console.log('Change received!', payload);
              
              // Reload memories to get fresh data with relationships
              const { data: freshData, error: reloadError } = await supabase
                .from('memories')
                .select(`
                  *,
                  tags (
                    id,
                    name
                  )
                `)
                .order('created_at', { ascending: false });

              if (reloadError) throw reloadError;
              setMemories(freshData || []);
            }
          )
          .subscribe();

      } catch (err) {
        console.error('Error in useRealtimeMemories:', err);
        setError(err instanceof Error ? err.message : 'Error loading memories');
      } finally {
        setLoading(false);
      }
    };

    loadMemories();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [user]);

  return {
    memories,
    loading,
    error
  };
}