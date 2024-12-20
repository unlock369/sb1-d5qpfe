import type { Memory } from '../types';

export const featuredMemories: Memory[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74',
    title: 'First Steps',
    description: "Baby's first steps in the garden",
    date: '2024-03-10',
    tags: ['milestone', 'baby'],
    privacy: 'private',
    category: 'milestone',
    peopleIds: []
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e',
    title: 'Family Picnic',
    description: 'Summer picnic at the park',
    date: '2024-03-08',
    tags: ['family', 'outdoor'],
    privacy: 'shared',
    category: 'event',
    peopleIds: []
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35',
    title: 'Birthday Party',
    description: "Sarah's 5th birthday celebration",
    date: '2024-03-05',
    tags: ['birthday', 'family'],
    privacy: 'public',
    category: 'milestone',
    peopleIds: []
  }
];