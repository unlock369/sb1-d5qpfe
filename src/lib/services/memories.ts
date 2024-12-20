import { supabase } from '../supabase';
import type { Memory } from '../../types';

export async function getMemories() {
  const { data, error } = await supabase
    .from('memories')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createMemory(memory: Omit<Memory, 'id'>, imageFile: File) {
  try {
    // 1. Upload image to storage
    const fileExt = imageFile.name.split('.').pop();
    const filePath = `${Date.now()}.${fileExt}`;
    
    const { error: uploadError, data: uploadData } = await supabase.storage
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
        user_id: memory.userId,
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
    return data;

  } catch (error) {
    console.error('Error creating memory:', error);
    throw error;
  }
}

export async function updateMemory(id: string, updates: Partial<Memory>) {
  const { data, error } = await supabase
    .from('memories')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteMemory(id: string) {
  // First get the memory to get the image path
  const { data: memory, error: fetchError } = await supabase
    .from('memories')
    .select('image_url')
    .eq('id', id)
    .single();

  if (fetchError) throw fetchError;

  // Delete the image from storage if it exists
  if (memory?.image_url) {
    const imagePath = memory.image_url.split('/').pop();
    if (imagePath) {
      const { error: storageError } = await supabase.storage
        .from('memories')
        .remove([imagePath]);

      if (storageError) throw storageError;
    }
  }

  // Delete the memory record
  const { error } = await supabase
    .from('memories')
    .delete()
    .eq('id', id);

  if (error) throw error;
}