
import React, { useState } from 'react';
import { UserIcon, SupportIcon, CheckIcon } from '../constants';
import { authService } from '../services/AuthService';
import type { UserRole } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('viewer');
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // In a real app, password validation happens here
      await authService.login(email, selectedRole);
      onLoginSuccess();
      onClose();
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
      setIsLoading(true);
      try {
          await authService.login('ace@costream.com', 'broadcaster_individual');
          onLoginSuccess();
          onClose();
      } catch (error) {
          console.error("Demo login failed", error);
      } finally {
          setIsLoading(false);
      }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] animate-fade-in-fast" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-md w-full m-4 p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Join the Horizon'}
          </h2>
          <p className="text-gray-400 text-sm">
            {mode === 'login' ? 'Sign in to access your account' : 'Create an account to start streaming'}
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div className="flex bg-gray-800 p-1 rounded-lg mb-6">
          <button
            onClick={() => setSelectedRole('viewer')}
            className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors ${selectedRole === 'viewer' || selectedRole === 'vip' ? 'bg-teal-500 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            VIEWER
          </button>
          <button
            onClick={() => setSelectedRole('broadcaster_individual')}
            className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors ${selectedRole.includes('broadcaster') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            BROADCASTER
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {selectedRole.includes('broadcaster') && mode === 'signup' && (
             <div className="grid grid-cols-2 gap-2 mb-2">
                 <div 
                    className={`border p-3 rounded cursor-pointer text-center ${selectedRole === 'broadcaster_individual' ? 'border-purple-500 bg-purple-500/20' : 'border-gray-700'}`}
                    onClick={() => setSelectedRole('broadcaster_individual')}
                 >
                     <p className="text-xs font-bold text-white">Individual</p>
                 </div>
                 <div 
                    className={`border p-3 rounded cursor-pointer text-center ${selectedRole === 'broadcaster_team' ? 'border-purple-500 bg-purple-500/20' : 'border-gray-700'}`}
                    onClick={() => setSelectedRole('broadcaster_team')}
                 >
                     <p className="text-xs font-bold text-white">Team</p>
                 </div>
             </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="user@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-bold transition-all transform hover:scale-105 flex justify-center items-center ${selectedRole.includes('broadcaster') ? 'bg-purple-600 hover:bg-purple-500' : 'bg-teal-500 hover:bg-teal-600'} text-white`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-gray-700">
            <button 
                onClick={handleDemoLogin}
                className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-purple-400 font-bold rounded-lg text-sm transition-colors border border-purple-500/30"
            >
                Quick Access: Demo Broadcaster
            </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setMode('signup')} className="text-white font-bold hover:underline">Sign Up</button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={() => setMode('login')} className="text-white font-bold hover:underline">Log In</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
