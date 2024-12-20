import React from 'react';
import { Archive, Star, Users, Calendar, Lock, Heart } from 'lucide-react';
import CategoryCard from './CategoryCard';

const categories = [
  {
    name: 'All Memories',
    icon: Archive,
    imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74',
    count: 128
  },
  {
    name: 'Milestones',
    icon: Star,
    imageUrl: 'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35',
    count: 45
  },
  {
    name: 'Family',
    icon: Users,
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300',
    count: 67
  },
  {
    name: 'Events',
    icon: Calendar,
    imageUrl: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902',
    count: 23
  },
  {
    name: 'Private',
    icon: Lock,
    imageUrl: 'https://images.unsplash.com/photo-1516571748831-5d81767b788d',
    count: 15
  },
  {
    name: 'Favorites',
    icon: Heart,
    imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7',
    count: 32
  }
];

export default function CategoriesSection() {
  return (
    <section className="px-8 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Memory Categories</h2>
        <button className="text-sm font-semibold text-gray-400 hover:text-white">
          Show all
        </button>
      </div>
      
      <div className="mt-6 grid grid-cols-6 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            name={category.name}
            icon={category.icon}
            imageUrl={category.imageUrl}
            count={category.count}
            onClick={() => console.log('Category clicked:', category.name)}
          />
        ))}
      </div>
    </section>
  );
}