import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, Sparkles, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Authentication failed. Please check credentials.');
        setIsLoading(false);
        return;
      }

      // Store token in localStorage as well for authorization headers
      if (data.token) {
        localStorage.setItem('norwen_admin_token', data.token);
      }

      setIsLoading(false);
      onLoginSuccess(data.user);
    } catch (err) {
      console.error('Login request failed:', err);
      setError('Could not connect to backend server. Make sure the server is running on port 5000.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDFB] via-[#FAF5EA] to-[#FBF5EE] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#EADBBA]/70 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#C9A24B]/15 blur-3xl pointer-events-none" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md rounded-3xl glass-panel p-6 sm:p-10 border border-[#EADBBA] shadow-2xl shadow-amber-950/10 relative z-10 bg-white/85"
      >
        {/* Back to site button */}
        <button
          type="button"
          onClick={onBackToSite}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C7355] hover:text-[#C9A24B] transition-colors mb-6 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Salon Website</span>
        </button>

        {/* Brand Emblem */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-[#C9A24B] via-[#E6C36E] to-[#C9A24B] shadow-md mb-3">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-2">
              <img src="/images/logo.png" alt="Norwen Logo" className="w-full h-full object-contain" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#251B12] text-white flex items-center justify-center border-2 border-white shadow-xs">
              <Lock className="w-3 h-3 text-[#C9A24B]" />
            </div>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#251B12]">
            Salon Management
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#8C7355] font-medium mt-1">
            Norwen Beauty Salon • Palmerston North
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-start gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#251B12] mb-1.5">
              Admin Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C7355]">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-[#EADBBA] text-sm text-[#251B12] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/30 focus:border-[#C9A24B] transition-all"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#251B12] mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C7355]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-11 py-3 rounded-2xl bg-white border border-[#EADBBA] text-sm text-[#251B12] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/30 focus:border-[#C9A24B] transition-all"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8C7355] hover:text-[#251B12]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#DFB76C] to-[#B38728] text-white font-semibold text-sm shadow-md shadow-[#C9A24B]/25 hover:shadow-lg hover:shadow-[#C9A24B]/35 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Enter Admin Console</span>
              </>
            )}
          </button>
        </form>

        {/* Credentials Reminder */}
        <div className="mt-8 pt-5 border-t border-[#EADBBA] text-center">
          <p className="text-[11px] font-semibold text-[#8C7355] uppercase tracking-wider mb-1">
            Demo Access Credentials
          </p>
          <div className="inline-block px-3 py-1.5 rounded-xl bg-[#FAF5EA] border border-[#EADBBA] text-xs text-[#251B12] font-mono">
            User: <strong>admin</strong> • Pass: <strong>NorwenAdmin2026!</strong>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
