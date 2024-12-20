import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MilestoneGrid from './MilestoneGrid';
import MilestoneForm from './MilestoneForm';
import MilestoneList from './MilestoneList';
import { useMilestones } from '../../hooks/useMilestones';
import type { Milestone } from '../../types';
import type { MilestoneIconType } from './MilestoneIcon';

export default function MilestoneTracker() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<MilestoneIconType>('custom');
  const { milestones, addMilestone, updateMilestone, deleteMilestone } = useMilestones();
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  const handleSelectCategory = ({ type }: { type: MilestoneIconType }) => {
    setSelectedType(type);
    setIsFormOpen(true);
  };

  const handleSaveMilestone = (milestone: Milestone) => {
    if (selectedMilestone) {
      updateMilestone(milestone);
    } else {
      addMilestone(milestone);
    }
    setIsFormOpen(false);
    setSelectedMilestone(null);
  };

  const handleEditMilestone = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setSelectedType(milestone.category as MilestoneIconType);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white">Milestone Tracker</h2>
          <p className="mt-2 text-gray-400">
            Track and celebrate important moments in your life
          </p>
        </motion.div>

        <MilestoneGrid onSelectCategory={handleSelectCategory} />

        <div className="mt-12">
          <h3 className="mb-6 text-xl font-semibold text-white">Your Milestones</h3>
          <MilestoneList
            milestones={milestones}
            onEdit={handleEditMilestone}
            onDelete={deleteMilestone}
          />
        </div>

        <AnimatePresence>
          {isFormOpen && (
            <MilestoneForm
              milestone={selectedMilestone}
              type={selectedType}
              onSave={handleSaveMilestone}
              onClose={() => {
                setIsFormOpen(false);
                setSelectedMilestone(null);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}