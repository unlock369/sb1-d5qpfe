import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface LoginFormProps {
  onSuccess?: () => void;
  onRegisterClick: () => void;
  onForgotPasswordClick: () => void;
}

export default function LoginForm({ 
  onSuccess, 
  onRegisterClick,
  onForgotPasswordClick 
}: LoginFormProps) {
  const { login, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      onSuccess?.();
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login error:', err);
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
      <h2 className="text-2xl font-bold text-white">Welcome back</h2>
      <p className="mt-2 text-gray-400">Sign in to your account to continue</p>

      {(error || authError) && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-500/10 p-4 text-red-400">
          <AlertCircle className="h-5 w-5" />
          <p>{error || authError}</p>
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
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onForgotPasswordClick}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          Forgot password?
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? (
            'Signing in...'
          ) : (
            <>
              <LogIn className="h-5 w-5" />
              Sign In
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Don't have an account?{' '}
        <button
          onClick={onRegisterClick}
          className="font-medium text-blue-400 hover:text-blue-300"
        >
          Sign up
        </button>
      </p>
    </motion.div>
  );
}