import React from 'react';
import { Search, Bell, Plus, Home } from 'lucide-react';
import IconButton from './ui/IconButton';
import { Link } from 'react-router-dom';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddMemory: () => void;
  onNotificationsClick: () => void;
}

export default function Header({ 
  searchQuery, 
  onSearchChange, 
  onAddMemory, 
  onNotificationsClick 
}: HeaderProps) {
  return (
    <header className="border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center gap-6">
              <Link 
                to="/"
                className="group flex items-center gap-2 text-white/80 transition-colors duration-200 hover:text-white"
              >
                <Home className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                <h1 className="text-xl font-bold">memories.app</h1>
              </Link>
            </div>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search memories..."
                className="w-96 rounded-lg bg-gray-900 px-4 py-2 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onAddMemory}
              className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Memory</span>
            </button>
            <button
              onClick={onNotificationsClick}
              className="relative rounded-full p-2 text-gray-400 hover:bg-gray-800"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-blue-500" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}