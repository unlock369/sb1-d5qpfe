import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useMemories } from '../../hooks/useMemories';
import ImageDropzone from './ImageDropzone';
import TagInput from './TagInput';
import ProgressBar from '../ui/ProgressBar';

export default function PhotoUpload() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addMemory } = useMemories();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState<'public' | 'private' | 'shared'>('private');
  const [category, setCategory] = useState<'milestone' | 'event' | 'daily'>('daily');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedFile || !title) {
      setError('Please select an image and fill in all required fields');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      await addMemory({
        userId: user.id,
        title,
        description,
        date,
        tags,
        privacy,
        category,
        peopleIds: [],
        imageUrl: '', // Will be set by the service
        metadata: {
          fileSize: selectedFile.size,
          fileType: selectedFile.type
        },
        stats: {
          views: 0,
          likes: 0,
          shares: 0
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, selectedFile);

      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading memory');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-red-500/10 p-4 text-red-400"
          >
            {error}
          </motion.div>
        )}

        <ImageDropzone
          onFileSelect={handleFileSelect}
          preview={preview}
          onClear={() => {
            setSelectedFile(null);
            setPreview('');
          }}
        />

        {uploading && <ProgressBar progress={uploadProgress} />}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="w-full rounded-lg bg-white/5 px-4 py-2 text-white placeholder-gray-400 transition-colors focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="h-24 w-full rounded-lg bg-white/5 px-4 py-2 text-white placeholder-gray-400 transition-colors focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm text-gray-400">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="mt-1 w-full rounded-lg bg-white/5 px-4 py-2 text-white transition-colors focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400">Privacy</label>
              <select
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value as typeof privacy)}
                className="mt-1 w-full rounded-lg bg-white/5 px-4 py-2 text-white transition-colors focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="private">Private</option>
                <option value="shared">Shared</option>
                <option value="public">Public</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as typeof category)}
                className="mt-1 w-full rounded-lg bg-white/5 px-4 py-2 text-white transition-colors focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Daily</option>
                <option value="milestone">Milestone</option>
                <option value="event">Event</option>
              </select>
            </div>
          </div>

          <TagInput tags={tags} onChange={setTags} />
        </motion.div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="rounded-lg border border-white/10 px-4 py-2 text-white transition-colors hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={uploading || !selectedFile || !title}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Save Memory'}
          </button>
        </div>
      </form>
    </div>
  );
}