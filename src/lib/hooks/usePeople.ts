import { useState } from 'react';
import { where } from 'firebase/firestore';
import { useFirestore } from './useFirestore';
import { useAuthContext } from '../context/AuthContext';
import type { Person } from '../../types';

export function usePeople() {
  const { user } = useAuthContext();
  const constraints = user ? [where('userId', '==', user.uid)] : [];
  const { data: people, loading, error } = useFirestore<Person>('people', constraints);

  const addPerson = async (person: Person) => {
    // Implementation will be added when we create the Firebase service
    console.log('Adding person:', person);
  };

  const updatePerson = async (person: Person) => {
    // Implementation will be added when we create the Firebase service
    console.log('Updating person:', person);
  };

  const deletePerson = async (id: string) => {
    // Implementation will be added when we create the Firebase service
    console.log('Deleting person:', id);
  };

  const getPerson = (id: string) => {
    return people.find(p => p.id === id);
  };

  return {
    people,
    loading,
    error,
    addPerson,
    updatePerson,
    deletePerson,
    getPerson
  };
}