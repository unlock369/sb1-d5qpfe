import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageDropzoneProps {
  onFileSelect: (file: File) => void;
  maxSize?: number; // in MB
  preview?: string;
  onClear?: () => void;
  className?: string;
}

export default function ImageDropzone({
  onFileSelect,
  maxSize = 50,
  preview,
  onClear,
  className = ''
}: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    setError(null);

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, etc.)');
      return false;
    }

    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return false;
    }

    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      onFileSelect(file);
    }
  }, [onFileSelect, maxSize]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      onFileSelect(file);
    }
  }, [onFileSelect, maxSize]);

  return (
    <div className={className}>
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
        className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300 ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10'
            : error
            ? 'border-red-500 bg-red-500/5'
            : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
        }`}
      >
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative aspect-video"
            >
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full rounded-lg object-cover"
              />
              {onClear && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClear();
                  }}
                  className="absolute right-2 top-2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex aspect-video flex-col items-center justify-center gap-4 p-8"
            >
              {error ? (
                <ImageIcon className="h-12 w-12 text-red-400" />
              ) : (
                <Upload className={`h-12 w-12 ${isDragging ? 'text-blue-400' : 'text-gray-400'}`} />
              )}
              <div className="text-center">
                <p className={`text-sm ${error ? 'text-red-400' : 'text-gray-400'}`}>
                  {error || (
                    <>
                      Drop your image here or click to browse
                      <br />
                      <span className="text-xs">
                        Supports JPG, PNG • Up to {maxSize}MB
                      </span>
                    </>
                  )}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </div>
    </div>
  );
}