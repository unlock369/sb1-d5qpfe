import { supabase } from '../supabase';
import type { Tag } from '../../types';

export async function getTags() {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('name');

  if (error) throw error;
  return data;
}

export async function createTag(tag: Omit<Tag, 'id'>) {
  const { error, data } = await supabase
    .from('tags')
    .insert(tag)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTag(id: string) {
  const { error } = await supabase
    .from('tags')
    .delete()
    .eq('id', id);

  if (error) throw error;
}