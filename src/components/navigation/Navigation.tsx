import React from 'react';
import { useLocation } from 'react-router-dom';
import NavLink from './NavLink';
import { motion } from 'framer-motion';
import { Archive } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  if (isHomePage) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed left-4 top-4 z-50 md:left-8 md:top-8"
    >
      <NavLink
        to="/"
        className="group flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md transition-all duration-300 hover:bg-white/20"
      >
        <Archive className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        <span className="text-sm font-medium text-white">memories.archive</span>
      </NavLink>
    </motion.nav>
  );
}