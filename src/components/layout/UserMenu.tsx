import React from 'react';
import { motion } from 'framer-motion';
import { Settings, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface UserMenuProps {
  onClose: () => void;
}

export default function UserMenu({ onClose }: UserMenuProps) {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute right-0 mt-2 w-48 rounded-lg border border-white/10 bg-black shadow-xl"
    >
      <div className="p-2">
        <Link
          to="/profile"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white hover:bg-white/5"
          onClick={onClose}
        >
          <User className="h-4 w-4" />
          Profile
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white hover:bg-white/5"
          onClick={onClose}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <div className="my-1 border-t border-white/10" />
        <button
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white hover:bg-white/5"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    </motion.div>
  );
}