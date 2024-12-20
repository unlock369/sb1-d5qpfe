import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Archive, Star, Users, Calendar, Lock, Heart } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Archive,
      title: 'Memory Archive',
      description: 'Store and organize your memories',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      icon: Star,
      title: 'Milestones',
      description: 'Track important moments',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
    },
    {
      icon: Users,
      title: 'Family Sharing',
      description: 'Share memories with loved ones',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      icon: Calendar,
      title: 'Timeline View',
      description: 'Chronological organization',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
    {
      icon: Lock,
      title: 'Private Vault',
      description: 'Secure storage for memories',
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
    },
    {
      icon: Heart,
      title: 'Collections',
      description: 'Group related memories',
      color: 'text-pink-400',
      bgColor: 'bg-pink-400/10',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <h1 className="text-xl font-bold text-blue-400">memories.archive</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            Open Dashboard
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl">
            Preserve Your Precious Memories
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Create, organize, and share your memories in a beautiful digital space
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group cursor-pointer rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10"
              onClick={() => navigate('/dashboard')}
            >
              <div className={`rounded-lg ${feature.bgColor} p-3 w-fit`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">{feature.title}</h3>
              <p className="mt-1 text-sm text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}