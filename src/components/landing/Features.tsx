import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Share2, Clock, Heart, Camera, Cloud } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure Storage',
    description: 'Your memories are encrypted and stored safely in the cloud',
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description: 'Share memories with family and friends with just a click',
  },
  {
    icon: Clock,
    title: 'Timeline View',
    description: 'Organize memories chronologically in an interactive timeline',
  },
  {
    icon: Heart,
    title: 'Collections',
    description: 'Group related memories into beautiful collections',
  },
  {
    icon: Camera,
    title: 'Auto Import',
    description: 'Import photos and videos from your devices automatically',
  },
  {
    icon: Cloud,
    title: 'Cloud Backup',
    description: 'Access your memories from any device, anytime',
  },
];

export default function Features() {
  return (
    <div className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Everything you need</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            All the features you need to preserve and share your memories effectively
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <feature.icon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}