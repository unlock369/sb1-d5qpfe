import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import { Bell, Moon, Globe, Lock, Database } from 'lucide-react';

export default function SettingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');
  const [privacy, setPrivacy] = useState('private');
  const [autoBackup, setAutoBackup] = useState(true);

  return (
    <div className="flex h-screen flex-col bg-black">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#121212] to-black p-6">
          <h1 className="mb-6 text-2xl font-bold text-white">Settings</h1>
          
          <div className="space-y-6">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-white/10 bg-white/5 p-6"
            >
              <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                <Bell className="h-5 w-5" />
                Notifications
              </h2>
              <div className="mt-4 space-y-4">
                <label className="flex items-center justify-between">
                  <span className="text-gray-300">Enable notifications</span>
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    className="h-6 w-6 rounded border-gray-300 bg-gray-700 text-blue-500 focus:ring-blue-500"
                  />
                </label>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-lg border border-white/10 bg-white/5 p-6"
            >
              <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                <Moon className="h-5 w-5" />
                Appearance
              </h2>
              <div className="mt-4 space-y-4">
                <label className="flex items-center justify-between">
                  <span className="text-gray-300">Dark mode</span>
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    className="h-6 w-6 rounded border-gray-300 bg-gray-700 text-blue-500 focus:ring-blue-500"
                  />
                </label>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-lg border border-white/10 bg-white/5 p-6"
            >
              <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                <Globe className="h-5 w-5" />
                Language
              </h2>
              <div className="mt-4">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-lg bg-white/5 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-lg border border-white/10 bg-white/5 p-6"
            >
              <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                <Lock className="h-5 w-5" />
                Privacy
              </h2>
              <div className="mt-4">
                <select
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value)}
                  className="w-full rounded-lg bg-white/5 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="private">Private</option>
                  <option value="friends">Friends Only</option>
                  <option value="public">Public</option>
                </select>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-lg border border-white/10 bg-white/5 p-6"
            >
              <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                <Database className="h-5 w-5" />
                Backup
              </h2>
              <div className="mt-4 space-y-4">
                <label className="flex items-center justify-between">
                  <span className="text-gray-300">Auto backup</span>
                  <input
                    type="checkbox"
                    checked={autoBackup}
                    onChange={(e) => setAutoBackup(e.target.checked)}
                    className="h-6 w-6 rounded border-gray-300 bg-gray-700 text-blue-500 focus:ring-blue-500"
                  />
                </label>
              </div>
            </motion.section>
          </div>
        </main>
      </div>
    </div>
  );
}