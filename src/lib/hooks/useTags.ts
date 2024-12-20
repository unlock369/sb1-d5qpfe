import { useState } from 'react';
import { where } from 'firebase/firestore';
import { useFirestore } from './useFirestore';
import { useAuthContext } from '../context/AuthContext';
import type { Tag } from '../../types';

export function useTags() {
  const { user } = useAuthContext();
  const constraints = user ? [where('userId', '==', user.uid)] : [];
  const { data: tags, loading, error } = useFirestore<Tag>('tags', constraints);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const addTag = async (tag: Omit<Tag, 'id'>) => {
    // Implementation will be added when we create the Firebase service
    console.log('Adding tag:', tag);
  };

  const updateTag = async (tag: Tag) => {
    // Implementation will be added when we create the Firebase service
    console.log('Updating tag:', tag);
  };

  const deleteTag = async (id: string) => {
    // Implementation will be added when we create the Firebase service
    console.log('Deleting tag:', id);
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  return {
    tags,
    selectedTags,
    loading,
    error,
    addTag,
    updateTag,
    deleteTag,
    toggleTag,
    setSelectedTags
  };
}