import React from 'react';
import { motion } from 'framer-motion';
import { Archive, Star, Users, Calendar, Lock, Heart } from 'lucide-react';

const categories = [
  {
    name: 'All Memories',
    icon: Archive,
    imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74',
    description: 'View all your memories'
  },
  {
    name: 'Milestones',
    icon: Star,
    imageUrl: 'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35',
    description: 'Life\'s important moments'
  },
  {
    name: 'Family',
    icon: Users,
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300',
    description: 'Family memories'
  },
  {
    name: 'Events',
    icon: Calendar,
    imageUrl: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902',
    description: 'Special occasions'
  },
  {
    name: 'Private',
    icon: Lock,
    imageUrl: 'https://images.unsplash.com/photo-1516571748831-5d81767b788d',
    description: 'Personal memories'
  },
  {
    name: 'Favorites',
    icon: Heart,
    imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7',
    description: 'Your favorite moments'
  }
];

export default function CategoryGrid() {
  return (
    <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-white/5 to-white/10 p-4 hover:from-white/10 hover:to-white/20"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{category.name}</h3>
              <p className="text-sm text-gray-400">{category.description}</p>
            </div>
            <category.icon className="ml-auto h-6 w-6 text-gray-400 transition-transform duration-300 group-hover:scale-110 group-hover:text-white" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}