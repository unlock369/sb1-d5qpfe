import { Memory } from './Memory';
import { Relationship } from './Relationship';

export interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
  settings: UserSettings;
  relationships: Relationship[];
  memories: Memory[];
}

export interface UserSettings {
  id: string;
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  defaultPrivacy: 'public' | 'private' | 'shared';
  theme: 'light' | 'dark' | 'system';
  language: string;
}