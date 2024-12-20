import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

export function useStorage() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  const upload = async (file: File, path: string): Promise<string> => {
    try {
      setUploading(true);
      setProgress(0);
      setError(null);
      
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
          },
          (error) => {
            setError(error as Error);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            } catch (error) {
              reject(error);
            }
          }
        );
      });
    } catch (error) {
      setError(error as Error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return {
    upload,
    uploading,
    progress,
    error
  };
}