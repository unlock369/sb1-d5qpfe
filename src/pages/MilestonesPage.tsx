import React from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import MilestoneTracker from '../components/milestones/MilestoneTracker';

export default function MilestonesPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="flex h-screen flex-col bg-black">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MilestoneTracker />
      </div>
    </div>
  );
}