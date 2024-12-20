export interface Memory {
  id: string;
  userId: string;
  imageUrl: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  privacy: 'public' | 'private' | 'shared';
  category: 'milestone' | 'event' | 'daily';
  peopleIds: string[];
  location?: {
    latitude: number;
    longitude: number;
    placeName: string;
  };
  metadata: {
    fileSize: number;
    fileType: string;
    dimensions?: {
      width: number;
      height: number;
    };
  };
  stats: {
    views: number;
    likes: number;
    shares: number;
  };
  createdAt: string;
  updatedAt: string;
}

export type ViewMode = 'month' | 'week' | 'day';

export interface Tag {
  id: string;
  userId: string;
  name: string;
  type: 'person' | 'event' | 'milestone' | 'location' | 'custom';
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PhotoData {
  id: string;
  userId: string;
  title: string;
  description: string;
  tags: string[];
  fileName: string;
  fileUrl: string;
  thumbnailUrl?: string;
  metadata: {
    fileSize: number;
    fileType: string;
    dimensions?: {
      width: number;
      height: number;
    };
  };
  dateUploaded: string;
  dateTaken?: string;
  location?: {
    latitude: number;
    longitude: number;
    placeName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Milestone {
  id: string;
  userId: string;
  title: string;
  description?: string;
  date: string;
  category: string;
  photoIds: string[];
  isCustom: boolean;
  tags: string[];
  importance: 'low' | 'medium' | 'high';
  reminderDate?: string;
  sharedWith: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MilestoneCategory {
  id: string;
  userId: string;
  name: string;
  icon: string;
  description: string;
  isCustom: boolean;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Person {
  id: string;
  userId: string;
  name: string;
  relationship: RelationType;
  avatar?: string;
  dateAdded: string;
  description?: string;
  tags: string[];
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  birthdate?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type RelationType = 
  | 'family'
  | 'friend'
  | 'colleague'
  | 'other';

export interface Collection {
  id: string;
  userId: string;
  name: string;
  description?: string;
  coverImageId?: string;
  memoryIds: string[];
  privacy: 'public' | 'private' | 'shared';
  sharedWith: string[];
  tags: string[];
  color?: string;
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;
}