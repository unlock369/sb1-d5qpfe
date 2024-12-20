import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import { ChevronDown, Search } from 'lucide-react';

const faqs = [
  {
    question: 'How do I upload memories?',
    answer: 'Click the "Add Memory" button in the top navigation bar. You can drag and drop photos or click to select them from your device.'
  },
  {
    question: 'Can I share memories with others?',
    answer: 'Yes! When viewing a memory, click the share button to generate a link or invite specific people to view it.'
  },
  {
    question: 'How do I organize my memories?',
    answer: 'You can organize memories using tags, collections, and categories. Use the sidebar navigation to access different views and organization options.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we use industry-standard encryption to protect your memories. You can also control privacy settings for each memory individually.'
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="flex h-screen flex-col bg-black">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#121212] to-black p-6">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-2xl font-bold text-white">Help Center</h1>
            
            <div className="mb-8 flex items-center gap-2 rounded-lg bg-white/5 px-4 py-3">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search help articles..."
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
              />
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="overflow-hidden rounded-lg border border-white/10 bg-white/5"
                >
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="flex w-full items-center justify-between p-4 text-left"
                  >
                    <span className="text-lg font-medium text-white">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform ${
                        expandedIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="border-t border-white/10 p-4 text-gray-300"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-6 text-center">
              <h2 className="text-lg font-semibold text-white">Still need help?</h2>
              <p className="mt-2 text-gray-300">
                Contact our support team and we'll get back to you as soon as possible.
              </p>
              <button className="mt-4 rounded-lg bg-blue-500 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-600">
                Contact Support
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}