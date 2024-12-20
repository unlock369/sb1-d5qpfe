import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export default function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const { sendPasswordReset, error } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendPasswordReset(email);
      setSuccess(true);
    } catch (error) {
      console.error('Password reset error:', error);
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
      <button
        onClick={onBackToLogin}
        className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to login
      </button>

      <h2 className="text-2xl font-bold text-white">Reset password</h2>
      <p className="mt-2 text-gray-400">
        Enter your email address and we'll send you instructions to reset your password
      </p>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-500/10 p-4 text-red-400">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      {success ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 rounded-lg bg-green-500/10 p-4 text-green-400"
        >
          <p>Password reset instructions have been sent to your email.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6">
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

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Instructions'}
          </button>
        </form>
      )}
    </motion.div>
  );
}