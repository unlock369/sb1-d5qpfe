import { User } from './User';
import { Tag } from './Tag';
import { PrivacySettings } from './PrivacySettings';

export interface Memory {
  id: string;
  userId: string;
  title: string;
  description?: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  createdAt: Date;
  updatedAt: Date;
  dateTaken?: Date;
  location?: MemoryLocation;
  tags: Tag[];
  privacySettings: PrivacySettings;
  sharedWith: User[];
  reactions: Reaction[];
  comments: Comment[];
}

export interface MemoryLocation {
  latitude: number;
  longitude: number;
  placeName?: string;
  country?: string;
}

export interface Reaction {
  id: string;
  userId: string;
  memoryId: string;
  type: 'like' | 'love' | 'laugh' | 'cry';
  createdAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  memoryId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  parentId?: string;
  reactions: Reaction[];
}