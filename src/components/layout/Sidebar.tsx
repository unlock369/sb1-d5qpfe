import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home,
  Calendar,
  Users,
  Star,
  Clock,
  Heart,
  Share2,
  Settings,
  HelpCircle,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const sidebarContent = (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="px-4 text-sm font-medium text-gray-400">Main</h3>
          <div className="mt-2 space-y-1">
            {[
              { icon: Home, label: 'Home', path: '/dashboard' },
              { icon: Calendar, label: 'Calendar', path: '/calendar' },
              { icon: Users, label: 'People', path: '/people' },
              { icon: Star, label: 'Milestones', path: '/milestones' }
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-colors ${
                  isActive(link.path)
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="px-4 text-sm font-medium text-gray-400">Your Library</h3>
          <div className="mt-2 space-y-1">
            {[
              { icon: Clock, label: 'Recent', path: '/recent' },
              { icon: Heart, label: 'Favorites', path: '/favorites' },
              { icon: Share2, label: 'Shared', path: '/shared' }
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-colors ${
                  isActive(link.path)
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto space-y-1">
        {[
          { icon: Settings, label: 'Settings', path: '/settings' },
          { icon: HelpCircle, label: 'Help', path: '/help' }
        ].map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-colors ${
              isActive(link.path)
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );

  // Mobile sidebar
  if (onClose) {
    return (
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-black lg:hidden"
      >
        <div className="flex h-full flex-col p-4">
          <button
            onClick={onClose}
            className="mb-4 self-end rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          {sidebarContent}
        </div>
      </motion.div>
    );
  }

  // Desktop sidebar
  return (
    <aside className="hidden w-64 flex-col bg-black p-4 lg:flex">
      {sidebarContent}
    </aside>
  );
}