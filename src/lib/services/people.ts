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
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import type { Person } from '../../types';

export const addPerson = async (person: Omit<Person, 'id'>, avatarFile?: File) => {
  try {
    let avatarUrl = person.avatar;

    if (avatarFile) {
      const storageRef = ref(storage, `avatars/${Date.now()}_${avatarFile.name}`);
      const snapshot = await uploadBytes(storageRef, avatarFile);
      avatarUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = await addDoc(collection(db, 'people'), {
      ...person,
      avatar: avatarUrl,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updatePerson = async (id: string, updates: Partial<Person>, avatarFile?: File) => {
  try {
    let avatarUrl = updates.avatar;

    if (avatarFile) {
      const storageRef = ref(storage, `avatars/${Date.now()}_${avatarFile.name}`);
      const snapshot = await uploadBytes(storageRef, avatarFile);
      avatarUrl = await getDownloadURL(snapshot.ref);
    }

    const personRef = doc(db, 'people', id);
    await updateDoc(personRef, {
      ...updates,
      ...(avatarUrl && { avatar: avatarUrl }),
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    throw error;
  }
};

export const deletePerson = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'people', id));
  } catch (error) {
    throw error;
  }
};

export const getPeople = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'people'),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Person[];
  } catch (error) {
    throw error;
  }
};