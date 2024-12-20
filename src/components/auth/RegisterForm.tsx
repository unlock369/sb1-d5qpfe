import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface RegisterFormProps {
  onSuccess?: () => void;
  onLoginClick: () => void;
}

export default function RegisterForm({ onSuccess, onLoginClick }: RegisterFormProps) {
  const { register, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await register(email, password);
      onSuccess?.();
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md rounded-xl border border-white/10 bg-black p-6"
    >
      <h2 className="text-2xl font-bold text-white">Create an account</h2>
      <p className="mt-2 text-gray-400">Sign up to start storing your memories</p>

      {(error || validationError) && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-500/10 p-4 text-red-400">
          <AlertCircle className="h-5 w-5" />
          <p>{validationError || error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">Email</label>
          <div className="mt-1 flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2">
            <Mail className="h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Password</label>
          <div className="mt-1 flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2">
            <Lock className="h-5 w-5 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
              placeholder="Create a password"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Confirm Password</label>
          <div className="mt-1 flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2">
            <Lock className="h-5 w-5 text-gray-400" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? (
            'Creating account...'
          ) : (
            <>
              <UserPlus className="h-5 w-5" />
              Create Account
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{' '}
        <button
          onClick={onLoginClick}
          className="font-medium text-blue-400 hover:text-blue-300"
        >
          Sign in
        </button>
      </p>
    </motion.div>
  );
}