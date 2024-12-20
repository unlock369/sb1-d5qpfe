import { useState, useEffect } from 'react';
import type { Milestone } from '../types';

const STORAGE_KEY = 'memories_milestones';

export function useMilestones() {
  const [milestones, setMilestones] = useState<Milestone[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(milestones));
  }, [milestones]);

  const addMilestone = (milestone: Milestone) => {
    setMilestones([...milestones, milestone]);
  };

  const updateMilestone = (updatedMilestone: Milestone) => {
    setMilestones(milestones.map(m => 
      m.id === updatedMilestone.id ? updatedMilestone : m
    ));
  };

  const deleteMilestone = (id: string) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  return {
    milestones,
    addMilestone,
    updateMilestone,
    deleteMilestone
  };
}