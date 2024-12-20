import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Calendar } from 'lucide-react';
import type { Milestone } from '../../types';
import { formatDate } from '../../utils/dateUtils';

interface MilestoneListProps {
  milestones: Milestone[];
  onEdit: (milestone: Milestone) => void;
  onDelete: (id: string) => void;
}

export default function MilestoneList({ milestones, onEdit, onDelete }: MilestoneListProps) {
  return (
    <div className="space-y-4">
      {milestones.map((milestone, index) => (
        <motion.div
          key={milestone.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">{milestone.title}</h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="h-4 w-4" />
                {formatDate(milestone.date)}
              </div>
              {milestone.description && (
                <p className="mt-2 text-gray-300">{milestone.description}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {milestone.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() => onEdit(milestone)}
                className="rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(milestone.id)}
                className="rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {milestone.photoIds.length > 0 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {milestone.photoIds.map((photoId) => (
                <div
                  key={photoId}
                  className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg"
                >
                  <img
                    src={`/photos/${photoId}`}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}