import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import { useMemories } from '../hooks/useMemories';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setSearchQuery: updateSearch } = useMemories();

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateSearch(query);
  };

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        
        {/* Desktop Sidebar */}
        <Sidebar />
        
        <main className="relative flex-1 overflow-y-auto bg-gradient-to-b from-[#121212] to-black">
          {children}
        </main>
      </div>
    </div>
  );
}