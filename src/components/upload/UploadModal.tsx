import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import { useStorage } from '../../hooks/useStorage';
import { useMemories } from '../../hooks/useMemories';
import { useAuthContext } from '../../lib/context/AuthContext';
import TagInput from './TagInput';
import ProgressBar from '../ui/ProgressBar';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

interface UploadModalProps {
  onClose: () => void;
}

export default function UploadModal({ onClose }: UploadModalProps) {
  const { user } = useAuthContext();
  const { upload, uploading, progress } = useStorage();
  const { addMemory } = useMemories();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file: File): boolean => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Please select a valid image file (JPG, PNG, or WebP)');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 5MB');
      return false;
    }

    return true;
  };

  const handleFileSelect = useCallback((file: File) => {
    if (!validateFile(file)) return;

    setSelectedFile(file);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedFile || !title) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      console.log('Starting upload process...');
      const path = `memories/${user.uid}/${Date.now()}_${selectedFile.name}`;
      console.log('Upload path:', path);

      const imageUrl = await upload(selectedFile, path);
      console.log('Image uploaded successfully:', imageUrl);

      const memoryData = {
        userId: user.uid,
        title,
        description,
        date: new Date().toISOString(),
        imageUrl,
        tags,
        privacy: 'private' as const,
        category: 'daily' as const,
        peopleIds: [],
        metadata: {
          fileSize: selectedFile.size,
          fileType: selectedFile.type,
        },
        stats: {
          views: 0,
          likes: 0,
          shares: 0
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('Adding memory to database:', memoryData);
      await addMemory(memoryData, selectedFile);
      console.log('Memory added successfully');

      onClose();
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError(err instanceof Error ? err.message : 'Error uploading memory');
    }
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
        className="w-full max-w-lg rounded-xl border border-white/10 bg-black p-6"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Add Memory</h2>
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
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={handleDrop}
            className={`relative cursor-pointer rounded-lg border-2 border-dashed transition-colors ${
              isDragging
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-white/20 bg-white/5 hover:border-white/40'
            }`}
          >
            {preview ? (
              <div className="relative aspect-video">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreview('');
                  }}
                  className="absolute right-2 top-2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex aspect-video flex-col items-center justify-center">
                <Upload className="h-12 w-12 text-gray-400" />
                <p className="mt-2 text-center text-sm text-gray-400">
                  Drop photo here or click to upload
                  <br />
                  <span className="text-xs">Supports JPG, PNG, WebP • Up to 5MB</span>
                </p>
              </div>
            )}
            <input
              type="file"
              accept={ALLOWED_TYPES.join(',')}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </div>

          {uploading && <ProgressBar progress={progress} />}

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full rounded-lg bg-white/5 px-4 py-2 text-white placeholder-gray-400"
            required
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="h-24 w-full rounded-lg bg-white/5 px-4 py-2 text-white placeholder-gray-400"
          />

          <TagInput tags={tags} onChange={setTags} />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/10 px-4 py-2 text-white hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || !selectedFile || !title}
              className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Save Memory'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}