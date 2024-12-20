import React from 'react';
import { motion } from 'framer-motion';
import { usePeople } from '../../hooks/usePeople';

interface PeopleSelectorProps {
  selectedPeople: string[];
  onChange: (peopleIds: string[]) => void;
}

export default function PeopleSelector({ selectedPeople, onChange }: PeopleSelectorProps) {
  const { people } = usePeople();

  const togglePerson = (personId: string) => {
    const newSelection = selectedPeople.includes(personId)
      ? selectedPeople.filter(id => id !== personId)
      : [...selectedPeople, personId];
    onChange(newSelection);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-400">
        Tag People
      </label>
      <div className="flex flex-wrap gap-2">
        {people.map((person) => (
          <motion.button
            key={person.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => togglePerson(person.id)}
            className={`flex items-center gap-2 rounded-full px-3 py-1 transition-colors ${
              selectedPeople.includes(person.id)
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <img
              src={person.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=random`}
              alt={person.name}
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="text-sm">{person.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}