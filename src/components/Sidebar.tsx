import React from 'react';
import { Calendar, Users, Star, Lock, Image } from 'lucide-react';
import IconButton from './ui/IconButton';

interface SidebarProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string) => void;
}

const categories = [
  { name: 'All Photos', icon: Image, count: 128 },
  { name: 'Milestones', icon: Star, count: 45 },
  { name: 'Family', icon: Users, count: 67 },
  { name: 'Events', icon: Calendar, count: 23 },
  { name: 'Private', icon: Lock, count: 15 },
];

export default function Sidebar({ selectedCategory, onCategorySelect }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-gray-800 bg-black px-4 py-6">
      <nav>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.name}>
              <IconButton
                Icon={category.icon}
                label={category.name}
                count={category.count}
                onClick={() => onCategorySelect(category.name)}
                active={selectedCategory === category.name}
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}