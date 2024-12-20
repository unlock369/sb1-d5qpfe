import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, MapPin } from 'lucide-react';
import TagInput from '../upload/TagInput';
import PeopleSelector from '../people/PeopleSelector';
import { useStorage } from '../../lib/hooks/useStorage';
import { useAuthContext } from '../../lib/context/AuthContext';
import type { Memory } from '../../types';

interface MemoryFormProps {
  memory?: Memory;
  onClose: () => void;
  onSuccess: () => void;
}

export default function MemoryForm({ memory, onClose, onSuccess }: MemoryFormProps) {
  const { user } = useAuthContext();
  const { upload, uploading, progress } = useStorage();
  
  const [title, setTitle] = useState(memory?.title || '');
  const [description, setDescription] = useState(memory?.description || '');
  const [date, setDate] = useState(memory?.date || new Date().toISOString().split('T')[0]);
  const [privacy, setPrivacy] = useState<Memory['privacy']>(memory?.privacy || 'private');
  const [category, setCategory] = useState<Memory['category']>(memory?.category || 'daily');
  const [tags, setTags] = useState<string[]>(memory?.tags || []);
  const [selectedPeople, setSelectedPeople] = useState<string[]>(memory?.peopleIds || []);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(memory?.imageUrl || '');
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      setError('File size must be less than 50MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return;
    }

    setError(null);
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to upload memories');
      return;
    }

    try {
      let imageUrl = memory?.imageUrl;

      if (imageFile) {
        const path = `memories/${user.uid}/${Date.now()}_${imageFile.name}`;
        imageUrl = await upload(imageFile, path);
      }

      if (!imageUrl && !memory) {
        setError('Please select an image');
        return;
      }

      const memoryData: Partial<Memory> = {
        userId: user.uid,
        title,
        description,
        date,
        imageUrl,
        privacy,
        category,
        tags,
        peopleIds: selectedPeople,
        metadata: imageFile ? {
          fileSize: imageFile.size,
          fileType: imageFile.type,
          dimensions: await getImageDimensions(imageFile)
        } : memory?.metadata,
        stats: memory?.stats || {
          views: 0,
          likes: 0,
          shares: 0
        },
        updatedAt: new Date().toISOString()
      };

      if (!memory) {
        memoryData.createdAt = new Date().toISOString();
      }

      await (memory ? 
        updateMemory(memory.id, memoryData) : 
        addMemory(memoryData as Omit<Memory, 'id'>, imageFile!)
      );

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error saving memory');
      console.error('Error saving memory:', err);
    }
  };

  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="w-full max-w-2xl rounded-xl border border-white/10 bg-black p-6"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {memory ? 'Edit Memory' : 'Add Memory'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-white/5">
            {preview ? (
              <>
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setPreview('');
                  }}
                  className="absolute right-2 top-2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center">
                <Upload className="h-12 w-12 text-gray-400" />
                <p className="mt-2 text-center text-sm text-gray-400">
                  Drop photo here or click to upload
                  <br />
                  <span className="text-xs">Supports JPG, PNG • Up to 50MB</span>
                </p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageSelect(file);
              }}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-400">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-lg bg-white/5 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full rounded-lg bg-white/5 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 h-24 w-full rounded-lg bg-white/5 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-400">Privacy</label>
              <select
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value as Memory['privacy'])}
                className="mt-1 w-full rounded-lg bg-white/5 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="private">Private</option>
                <option value="shared">Shared</option>
                <option value="public">Public</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Memory['category'])}
                className="mt-1 w-full rounded-lg bg-white/5 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Daily</option>
                <option value="milestone">Milestone</option>
                <option value="event">Event</option>
              </select>
            </div>
          </div>

          <TagInput tags={tags} onChange={setTags} />
          <PeopleSelector selectedPeople={selectedPeople} onChange={setSelectedPeople} />

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/10 px-4 py-2 text-white hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || (!imageFile && !memory)}
              className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
            >
              {uploading ? `Uploading ${Math.round(progress)}%` : memory ? 'Save Changes' : 'Add Memory'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}