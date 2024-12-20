import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  imageUrl: string;
  count: number;
  onClick: () => void;
}

export default function CategoryCard({ name, icon: Icon, imageUrl, count, onClick }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex cursor-pointer flex-col items-center"
      onClick={onClick}
    >
      <div className="group relative mb-4 aspect-square w-full overflow-hidden rounded-full">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <Icon className="h-12 w-12 text-white" />
        </div>
      </div>
      <h3 className="text-center font-semibold text-white">{name}</h3>
      <p className="mt-1 text-sm text-gray-400">{count} memories</p>
    </motion.div>
  );
}