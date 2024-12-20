import { useState } from 'react';
import type { MilestoneCategory } from '../types';

const defaultCategories: MilestoneCategory[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    icon: '👣',
    description: 'Track those precious first steps',
    isCustom: false
  },
  {
    id: 'first-words',
    name: 'First Words',
    icon: '💭',
    description: 'Record their first words',
    isCustom: false
  },
  {
    id: 'birthday',
    name: 'Birthday',
    icon: '🎂',
    description: 'Celebrate another year',
    isCustom: false
  },
  {
    id: 'school',
    name: 'School',
    icon: '🎓',
    description: 'Educational achievements',
    isCustom: false
  },
  {
    id: 'custom',
    name: 'Custom',
    icon: '✨',
    description: 'Create your own milestone',
    isCustom: true
  }
];

export function useMilestoneCategories() {
  const [categories] = useState<MilestoneCategory[]>(defaultCategories);

  return {
    categories
  };
}