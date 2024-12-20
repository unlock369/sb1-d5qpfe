import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import { Camera, Edit2 } from 'lucide-react';

export default function ProfilePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Photography enthusiast and memory keeper.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
  });

  return (
    <div className="flex h-screen flex-col bg-black">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#121212] to-black p-6">
          <div className="mx-auto max-w-2xl">
            <div className="relative mb-8 text-center">
              <div className="relative mx-auto h-32 w-32">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-full w-full rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600">
                  <Camera className="h-5 w-5" />
                </button>
              </div>
              <h1 className="mt-4 text-2xl font-bold text-white">{profile.name}</h1>
              <p className="text-gray-400">{profile.email}</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
                  >
                    <Edit2 className="h-4 w-4" />
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="mt-1 w-full rounded-lg bg-white/5 px-4 py-2 text-white disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="mt-1 w-full rounded-lg bg-white/5 px-4 py-2 text-white disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400">Bio</label>
                    <textarea
                      value={profile.bio}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="mt-1 h-24 w-full rounded-lg bg-white/5 px-4 py-2 text-white disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold text-white">Account Statistics</h2>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-white/5 p-4 text-center">
                    <div className="text-2xl font-bold text-white">247</div>
                    <div className="text-sm text-gray-400">Memories</div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-4 text-center">
                    <div className="text-2xl font-bold text-white">15</div>
                    <div className="text-sm text-gray-400">Collections</div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-4 text-center">
                    <div className="text-2xl font-bold text-white">1.2GB</div>
                    <div className="text-sm text-gray-400">Storage Used</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}