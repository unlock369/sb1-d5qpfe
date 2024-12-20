import React from 'react';
import ArtistCard from './ArtistCard';

const popularArtists = [
  {
    name: 'The Weeknd',
    imageUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6',
    type: 'Artist'
  },
  {
    name: 'Billie Eilish',
    imageUrl: 'https://images.unsplash.com/photo-1619983081563-430f63602796',
    type: 'Artist'
  },
  {
    name: 'Lady Gaga',
    imageUrl: 'https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a',
    type: 'Artist'
  },
  {
    name: 'Sabrina Carpenter',
    imageUrl: 'https://images.unsplash.com/photo-1583001809873-a128495da465',
    type: 'Artist'
  },
  {
    name: 'Coldplay',
    imageUrl: 'https://images.unsplash.com/photo-1501612780327-45045538702b',
    type: 'Artist'
  }
];

export default function PopularSection() {
  return (
    <section className="px-8 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Popular artists</h2>
        <button className="text-sm font-semibold text-gray-400 hover:text-white">
          Show all
        </button>
      </div>
      
      <div className="mt-6 grid grid-cols-5 gap-6">
        {popularArtists.map((artist) => (
          <ArtistCard
            key={artist.name}
            name={artist.name}
            imageUrl={artist.imageUrl}
            type={artist.type}
          />
        ))}
      </div>
    </section>
  );
}