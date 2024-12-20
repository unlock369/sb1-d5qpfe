import React from 'react';
import { motion } from 'framer-motion';
import MemoryCard from './MemoryCard';
import { useMemories } from '../../hooks/useMemories';
import { Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MemoriesSection() {
  const { memories, loading } = useMemories();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-400">Loading memories...</p>
      </div>
    );
  }

  if (memories.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4 px-4">
        <Upload className="h-12 w-12 text-gray-400" />
        <p className="text-center text-gray-400">No memories yet</p>
        <Link 
          to="/upload"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Add Your First Memory
        </Link>
      </div>
    );
  }

  return (
    <section className="p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white sm:text-2xl">Recent Memories</h2>
        <Link 
          to="/upload"
          className="text-sm font-semibold text-gray-400 hover:text-white"
        >
          Add Memory
        </Link>
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <MemoryCard
              memory={memory}
              onClick={() => console.log('Memory clicked:', memory.id)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}