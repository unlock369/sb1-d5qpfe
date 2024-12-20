export interface Collection {
  id: string;
  userId: string;
  name: string;
  description?: string;
  coverImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  privacySettings: PrivacySettings;
  memoryIds: string[];
  tags: Tag[];
}

export interface CollectionMembership {
  collectionId: string;
  memoryId: string;
  addedAt: Date;
  order: number;
}