import React from 'react';
import { motion } from 'framer-motion';

interface ArtistCardProps {
  name: string;
  imageUrl: string;
  type: string;
}

export default function ArtistCard({ name, imageUrl, type }: ArtistCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col rounded-lg bg-[#181818] p-4 transition-colors hover:bg-[#282828]"
    >
      <div className="relative aspect-square overflow-hidden rounded-full">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-white">{name}</h3>
        <p className="mt-1 text-sm text-gray-400">{type}</p>
      </div>
    </motion.div>
  );
}