import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

type AuthView = 'login' | 'register' | 'forgot-password';

export default function AuthPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<AuthView>('login');

  const handleAuthSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="w-full max-w-md">
        {view === 'login' && (
          <LoginForm
            onSuccess={handleAuthSuccess}
            onRegisterClick={() => setView('register')}
            onForgotPasswordClick={() => setView('forgot-password')}
          />
        )}

        {view === 'register' && (
          <RegisterForm
            onSuccess={handleAuthSuccess}
            onLoginClick={() => setView('login')}
          />
        )}

        {view === 'forgot-password' && (
          <ForgotPasswordForm
            onBackToLogin={() => setView('login')}
          />
        )}
      </div>
    </div>
  );
}