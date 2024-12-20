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
import type { Milestone } from '../../types';

export const addMilestone = async (milestone: Omit<Milestone, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'milestones'), {
      ...milestone,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateMilestone = async (id: string, updates: Partial<Milestone>) => {
  try {
    const milestoneRef = doc(db, 'milestones', id);
    await updateDoc(milestoneRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    throw error;
  }
};

export const deleteMilestone = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'milestones', id));
  } catch (error) {
    throw error;
  }
};

export const getMilestones = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'milestones'),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Milestone[];
  } catch (error) {
    throw error;
  }
};