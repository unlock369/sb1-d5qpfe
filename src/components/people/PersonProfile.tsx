import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag as TagIcon, Heart } from 'lucide-react';
import type { Person, Memory } from '../../types';
import { formatDate } from '../../utils/dateUtils';

interface PersonProfileProps {
  person: Person;
  memories: Memory[];
}

export default function PersonProfile({ person, memories }: PersonProfileProps) {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
      >
        <div className="flex items-start gap-6">
          <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-white/10">
            <img
              src={person.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=random`}
              alt={person.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">{person.name}</h2>
            <p className="text-gray-400">{person.relationship}</p>
            {person.description && (
              <p className="mt-2 text-gray-300">{person.description}</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {person.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Memories</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {memories.map((memory) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={memory.imageUrl}
                alt={memory.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-0 w-full p-4">
                  <h4 className="text-lg font-medium text-white">{memory.title}</h4>
                  <p className="text-sm text-gray-300">{formatDate(memory.date)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}