import { PhotoData } from '../types';

const STORAGE_KEY = 'memories_photos';

export async function savePhoto(photoData: PhotoData, file: File): Promise<void> {
  // Get existing photos
  const existingPhotos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  
  // Save photo data
  existingPhotos.push(photoData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existingPhotos));
  
  // In a real app, you would upload the file to a server here
  console.log('Photo saved:', photoData);
}

export function getPhotos(): PhotoData[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

export function deletePhoto(id: string): void {
  const photos = getPhotos();
  const updatedPhotos = photos.filter(photo => photo.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPhotos));
}