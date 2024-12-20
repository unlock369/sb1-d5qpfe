import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export default function NavLink({ to, children, className = '' }: NavLinkProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link
        to={to}
        className={`transition-colors duration-200 ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}