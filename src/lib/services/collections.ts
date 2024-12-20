import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Collection {
  id: string;
  name: string;
  description?: string;
  coverImageUrl?: string;
  memoryIds: string[];
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const addCollection = async (collection: Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'collections'), {
      ...collection,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateCollection = async (id: string, updates: Partial<Collection>) => {
  try {
    const collectionRef = doc(db, 'collections', id);
    await updateDoc(collectionRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    throw error;
  }
};

export const deleteCollection = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'collections', id));
  } catch (error) {
    throw error;
  }
};

export const getCollections = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'collections'),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Collection[];
  } catch (error) {
    throw error;
  }
};