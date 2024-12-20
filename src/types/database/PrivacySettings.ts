export interface PrivacySettings {
  id: string;
  memoryId: string;
  visibility: PrivacyVisibility;
  sharedUserIds: string[];
  password?: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type PrivacyVisibility =
  | 'public'
  | 'private'
  | 'shared'
  | 'password_protected';

export interface SharedAccess {
  id: string;
  userId: string;
  memoryId: string;
  accessType: 'view' | 'edit' | 'admin';
  grantedAt: Date;
  expiresAt?: Date;
}