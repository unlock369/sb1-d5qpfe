import React, { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function UploadZone() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      navigate('/app', { state: { files } });
    }
  }, [navigate]);

  const handleClick = useCallback(() => {
    navigate('/app');
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative cursor-pointer rounded-xl border-2 border-dashed p-12 transition-colors ${
        isDragging
          ? 'border-blue-500 bg-blue-500/10'
          : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
      }`}
    >
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center justify-center"
        >
          <Upload 
            className={`h-16 w-16 ${isDragging ? 'text-blue-400' : 'text-gray-400'}`} 
          />
          <p className="mt-4 text-center text-sm text-gray-400">
            Drop photos here or click to upload
            <br />
            <span className="text-xs">Supports JPG, PNG, HEIC • Up to 50MB each</span>
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}