export interface Album {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  type: 'Album' | 'Single';
}

export const popularAlbums: Album[] = [
  {
    id: '1',
    title: 'After Hours',
    artist: 'The Weeknd',
    imageUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17',
    type: 'Album'
  },
  {
    id: '2',
    title: 'Happier Than Ever',
    artist: 'Billie Eilish',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
    type: 'Album'
  },
  {
    id: '3',
    title: 'Chromatica',
    artist: 'Lady Gaga',
    imageUrl: 'https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a',
    type: 'Album'
  },
  {
    id: '4',
    title: 'Emails I Can\'t Send',
    artist: 'Sabrina Carpenter',
    imageUrl: 'https://images.unsplash.com/photo-1583001809873-a128495da465',
    type: 'Album'
  },
  {
    id: '5',
    title: 'Music of the Spheres',
    artist: 'Coldplay',
    imageUrl: 'https://images.unsplash.com/photo-1501612780327-45045538702b',
    type: 'Album'
  }
];