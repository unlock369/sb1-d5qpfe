import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import type { Album } from '../../data/albums';

interface AlbumCardProps {
  album: Album;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative flex flex-col rounded-md bg-[#181818] p-4 transition-colors hover:bg-[#282828]"
    >
      <div className="relative aspect-square overflow-hidden rounded-md">
        <img
          src={album.imageUrl}
          alt={album.title}
          className="h-full w-full object-cover"
        />
        <button className="absolute bottom-2 right-2 flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-green-500 text-black opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100 hover:scale-105 hover:bg-green-400">
          <Play className="h-6 w-6 fill-current" />
        </button>
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="font-semibold text-white line-clamp-1">{album.title}</h3>
        <p className="mt-1 text-sm text-gray-400 line-clamp-2">{album.artist}</p>
      </div>
    </motion.div>
  );
}