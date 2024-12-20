import React, { useState } from 'react';
import { Search, Bell, Plus, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationsPanel from './NotificationsPanel';
import UserMenu from './UserMenu';
import { useAuth } from '../../hooks/useAuth';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleSidebar?: () => void;
}

export default function Navbar({ searchQuery, onSearchChange, onToggleSidebar }: NavbarProps) {
  const { user } = useAuth();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
            
            <Link 
              to="/"
              className="flex items-center gap-2 text-white/80 transition-colors duration-200 hover:text-white"
            >
              <h1 className="text-xl font-bold">memories.app</h1>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden flex-1 md:block md:max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search memories..."
                className="w-full rounded-lg bg-white/5 px-4 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white md:hidden"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              to="/upload"
              className="flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Memory</span>
            </Link>

            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-blue-500" />
            </button>

            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 rounded-full bg-white/5 px-2 py-2 text-sm text-white transition-colors hover:bg-white/10 sm:px-4"
            >
              <div className="h-6 w-6 overflow-hidden rounded-full bg-blue-500">
                {user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata.full_name || 'Profile'}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-full w-full p-1" />
                )}
              </div>
              <span className="hidden sm:inline">
                {user?.user_metadata?.full_name || user?.email}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 md:hidden"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search memories..."
                className="w-full rounded-lg bg-white/5 px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Notifications Panel */}
      <AnimatePresence>
        {isNotificationsOpen && (
          <NotificationsPanel onClose={() => setIsNotificationsOpen(false)} />
        )}
      </AnimatePresence>

      {/* User Menu */}
      <AnimatePresence>
        {isUserMenuOpen && (
          <UserMenu onClose={() => setIsUserMenuOpen(false)} />
        )}
      </AnimatePresence>
    </header>
  );
}