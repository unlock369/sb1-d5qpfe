import { useState, useEffect } from 'react';
import type { Person } from '../types';

const STORAGE_KEY = 'memories_people';

export function usePeople() {
  const [people, setPeople] = useState<Person[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
  }, [people]);

  const addPerson = (person: Person) => {
    setPeople([...people, person]);
  };

  const updatePerson = (updatedPerson: Person) => {
    setPeople(people.map(p => 
      p.id === updatedPerson.id ? updatedPerson : p
    ));
  };

  const deletePerson = (id: string) => {
    setPeople(people.filter(p => p.id !== id));
  };

  const getPerson = (id: string) => {
    return people.find(p => p.id === id);
  };

  return {
    people,
    addPerson,
    updatePerson,
    deletePerson,
    getPerson
  };
}