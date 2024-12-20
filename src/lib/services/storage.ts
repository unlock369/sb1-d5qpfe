import { supabase } from '../supabase';

export const uploadFile = async (file: File, path: string) => {
  try {
    const { error, data } = await supabase.storage
      .from('memories')
      .upload(path, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('memories')
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const deleteFile = async (path: string) => {
  try {
    const { error } = await supabase.storage
      .from('memories')
      .remove([path]);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

export const getFileUrl = async (path: string) => {
  try {
    const { data: { publicUrl } } = supabase.storage
      .from('memories')
      .getPublicUrl(path);

    return publicUrl;
  } catch (error) {
    console.error('Error getting file URL:', error);
    throw error;
  }
};