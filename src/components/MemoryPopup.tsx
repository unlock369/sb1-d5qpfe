import React from 'react';
import { X, Heart, Share2, MessageCircle } from 'lucide-react';
import type { Memory } from '../types';
import { formatDate } from '../utils/dateUtils';

interface MemoryPopupProps {
  memory: Memory;
  onClose: () => void;
}

export default function MemoryPopup({ memory, onClose }: MemoryPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative max-h-[90vh] w-full max-w-4xl rounded-2xl bg-gray-900 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="flex h-full">
          {/* Image Section */}
          <div className="w-2/3 overflow-hidden rounded-l-2xl">
            <img
              src={memory.imageUrl}
              alt={memory.title}
              className="h-full w-full object-cover"
            />
          </div>
          
          {/* Details Section */}
          <div className="flex w-1/3 flex-col p-6">
            <h2 className="text-2xl font-bold text-white">{memory.title}</h2>
            <p className="mt-2 text-sm text-gray-400">{formatDate(memory.date)}</p>
            
            <p className="mt-4 text-gray-300">{memory.description}</p>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {memory.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="mt-auto flex items-center justify-between border-t border-gray-800 pt-4">
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 text-gray-400 hover:text-pink-500">
                  <Heart className="h-5 w-5" />
                  <span>24</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500">
                  <MessageCircle className="h-5 w-5" />
                  <span>12</span>
                </button>
              </div>
              <button className="text-gray-400 hover:text-white">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}