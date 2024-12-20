export interface Relationship {
  id: string;
  userId: string;
  relatedUserId: string;
  type: RelationshipType;
  status: RelationshipStatus;
  createdAt: Date;
  updatedAt: Date;
  customLabel?: string;
}

export type RelationshipType =
  | 'family'
  | 'friend'
  | 'colleague'
  | 'significant_other'
  | 'custom';

export type RelationshipStatus =
  | 'pending'
  | 'accepted'
  | 'blocked'
  | 'archived';