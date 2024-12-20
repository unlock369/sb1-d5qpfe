import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import { usePeople } from '../hooks/usePeople';
import { Plus, Search } from 'lucide-react';
import PersonForm from '../components/people/PersonForm';
import type { Person } from '../types';

export default function PeoplePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingPerson, setIsAddingPerson] = useState(false);
  const { people, addPerson } = usePeople();

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen flex-col bg-black">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#121212] to-black p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">People</h1>
            <button
              onClick={() => setIsAddingPerson(true)}
              className="flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              <Plus className="h-4 w-4" />
              Add Person
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPeople.map((person) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative overflow-hidden rounded-xl bg-white/5 p-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full">
                    <img
                      src={person.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=random`}
                      alt={person.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{person.name}</h3>
                    <p className="text-sm text-gray-400">{person.relationship}</p>
                  </div>
                </div>
                
                {person.description && (
                  <p className="mt-4 text-sm text-gray-300">{person.description}</p>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {person.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>

      {isAddingPerson && (
        <PersonForm
          onSave={(person) => {
            addPerson(person);
            setIsAddingPerson(false);
          }}
          onClose={() => setIsAddingPerson(false)}
        />
      )}
    </div>
  );
}