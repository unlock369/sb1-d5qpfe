export interface Tag {
  id: string;
  name: string;
  type: TagType;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export type TagType =
  | 'person'
  | 'location'
  | 'event'
  | 'custom';

export interface PersonTag extends Tag {
  type: 'person';
  relationshipId?: string;
}

export interface LocationTag extends Tag {
  type: 'location';
  latitude?: number;
  longitude?: number;
}

export interface EventTag extends Tag {
  type: 'event';
  startDate?: Date;
  endDate?: Date;
}