import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Person, RelationType } from '../../types';
import TagInput from '../upload/TagInput';

interface PersonFormProps {
  person?: Person;
  onSave: (person: Person) => void;
  onClose: () => void;
}

const relationshipTypes: RelationType[] = ['family', 'friend', 'colleague', 'other'];

export default function PersonForm({ person, onSave, onClose }: PersonFormProps) {
  const [name, setName] = useState(person?.name || '');
  const [relationship, setRelationship] = useState<RelationType>(
    (person?.relationship as RelationType) || 'family'
  );
  const [description, setDescription] = useState(person?.description || '');
  const [avatar, setAvatar] = useState(person?.avatar || '');
  const [tags, setTags] = useState<string[]>(person?.tags || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: person?.id || Date.now().toString(),
      name,
      relationship,
      description,
      avatar,
      dateAdded: person?.dateAdded || new Date().toISOString(),
      tags
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="w-full max-w-lg rounded-xl border border-white/10 bg-black p-6"
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">
            {person ? 'Edit Person' : 'Add Person'}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full rounded-lg bg-white/5 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
            value={relationship}
            onChange={(e) => setRelationship(e.target.value as RelationType)}
            className="w-full rounded-lg bg-white/5 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {relationshipTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="h-24 w-full rounded-lg bg-white/5 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="Avatar URL (optional)"
            className="w-full rounded-lg bg-white/5 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <TagInput tags={tags} onChange={setTags} />

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/10 px-4 py-2 text-white hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Save Person
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}