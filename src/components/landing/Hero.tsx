import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-black" />
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1516627145497-ae6968895b74"
        >
          <source src="https://player.vimeo.com/external/449623669.sd.mp4?s=ce5db5dd5b6f4cf8a6b487e722344d81a24c812d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Preserve Your Precious
            <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Memories Forever
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Create, organize, and share your memories in a beautiful digital space. Keep your precious moments safe and accessible forever.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            <Link
              to="/app"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-white px-8 py-3 font-medium text-black transition duration-300 hover:scale-105"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <button className="rounded-lg border border-white/20 px-8 py-3 font-medium text-white transition duration-300 hover:bg-white/10">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}