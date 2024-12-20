import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Milestone } from '../../types';
import { useMilestoneCategories } from '../../hooks/useMilestoneCategories';
import TagInput from '../upload/TagInput';

interface MilestoneFormProps {
  milestone?: Milestone | null;
  onSave: (milestone: Milestone) => void;
  onClose: () => void;
}

export default function MilestoneForm({ milestone, onSave, onClose }: MilestoneFormProps) {
  const { categories } = useMilestoneCategories();
  const [title, setTitle] = useState(milestone?.title || '');
  const [description, setDescription] = useState(milestone?.description || '');
  const [date, setDate] = useState(milestone?.date || new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState(milestone?.category || categories[0].id);
  const [tags, setTags] = useState<string[]>(milestone?.tags || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: milestone?.id || Date.now().toString(),
      title,
      description,
      date,
      category,
      photoIds: milestone?.photoIds || [],
      isCustom: true,
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
            {milestone ? 'Edit Milestone' : 'Add Milestone'}
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Milestone Title"
            className="w-full rounded-lg bg-white/5 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="h-24 w-full rounded-lg bg-white/5 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg bg-white/5 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg bg-white/5 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

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
              Save Milestone
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}