import React from 'react';
import AlbumCard from './AlbumCard';
import { popularAlbums } from '../../data/albums';

export default function AlbumsSection() {
  return (
    <section className="px-8 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Popular albums and singles</h2>
        <button className="text-sm font-semibold text-gray-400 hover:text-white">
          Show all
        </button>
      </div>
      
      <div className="mt-6 grid grid-cols-5 gap-6">
        {popularAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </section>
  );
}