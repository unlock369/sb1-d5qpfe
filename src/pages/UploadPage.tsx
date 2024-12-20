import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import { Upload, X, Tag as TagIcon } from 'lucide-react';
import TagInput from '../components/upload/TagInput';

export default function UploadPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith('image/')
    );
    setSelectedFiles(prev => [...prev, ...files]);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(
        file => file.type.startsWith('image/')
      );
      setSelectedFiles(prev => [...prev, ...files]);
    }
  }, []);

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-screen flex-col bg-black">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#121212] to-black p-6">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-2xl font-bold text-white">Upload Memories</h1>

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
              className={`relative cursor-pointer rounded-xl border-2 border-dashed p-12 transition-colors ${
                isDragging
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-white/20 bg-white/5 hover:border-white/40'
              }`}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              <div className="flex flex-col items-center">
                <Upload 
                  className={`h-16 w-16 ${isDragging ? 'text-blue-400' : 'text-gray-400'}`}
                />
                <p className="mt-4 text-center text-sm text-gray-400">
                  Drop photos here or click to upload
                  <br />
                  <span className="text-xs">Supports JPG, PNG • Up to 50MB each</span>
                </p>
              </div>
            </div>

            {selectedFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-6"
              >
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="group relative aspect-square overflow-hidden rounded-lg bg-white/5"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="h-full w-full object-cover"
                      />
                      <button
                        onClick={() => removeFile(index)}
                        className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400">Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Give your memories a title"
                        className="mt-1 w-full rounded-lg bg-white/5 px-4 py-2 text-white placeholder-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400">Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add a description"
                        className="mt-1 h-24 w-full rounded-lg bg-white/5 px-4 py-2 text-white placeholder-gray-400"
                      />
                    </div>

                    <TagInput tags={tags} onChange={setTags} />
                  </div>

                  <div className="mt-6 flex justify-end gap-4">
                    <button
                      onClick={() => setSelectedFiles([])}
                      className="rounded-lg border border-white/10 px-4 py-2 text-white hover:bg-white/10"
                    >
                      Cancel
                    </button>
                    <button
                      className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                      Upload Memories
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}