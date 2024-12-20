import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import * as tagService from '../lib/services/tags';
import type { Tag } from '../types';

export function useTags() {
  const { user } = useAuth();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const loadTags = async () => {
      try {
        const data = await tagService.getTags();
        setTags(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading tags');
      } finally {
        setLoading(false);
      }
    };

    loadTags();
  }, [user]);

  const addTag = async (tag: Omit<Tag, 'id'>) => {
    try {
      const newTag = await tagService.createTag(tag);
      setTags(prev => [...prev, newTag]);
      return newTag;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding tag');
      throw err;
    }
  };

  const deleteTag = async (id: string) => {
    try {
      await tagService.deleteTag(id);
      setTags(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting tag');
      throw err;
    }
  };

  return {
    tags,
    loading,
    error,
    addTag,
    deleteTag
  };
}