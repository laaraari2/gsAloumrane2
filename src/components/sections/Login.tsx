import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn, User, Lock, AlertCircle, Code } from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';


const Login: React.FC = () => {
  const { i18n } = useTranslation();
  const { t } = useBook();
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple validation
    if (!username.trim() || !password.trim()) {
      setError(t('login.error.empty'));
      setLoading(false);
      return;
    }

    // Attempt login
    try {
      const success = await login(username, password);
      
      if (success) {
        // Redirect to home page
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 100);
      } else {
        setError(t('login.error.invalid'));
        setLoading(false);
      }
    } catch (error) {
      setError(t('login.error.invalid'));
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-slate-400 font-medium">{i18n.language === 'ar' ? 'جاري التحميل...' : 'Chargement...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="absolute top-8 right-8 z-50">
        <LanguageSwitcher />
      </div>

      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-pink-500/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg z-10"
      >
        {/* Welcome Section */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
            className="mx-auto mb-8 flex items-center justify-center relative"
          >
            <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-3xl animate-pulse"></div>
            
            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full p-1.5 glass bg-white/5 border-white/10 shadow-2xl">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900/50 flex items-center justify-center border border-white/10 ring-4 ring-purple-500/10">
                <img
                  src={`${import.meta.env.VITE_BASE_URL || '/gsAloumrane2/'}logo-new.jpg?${new Date().getTime()}`}
                  alt={t('login.institution_name')}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const timestamp = `?${new Date().getTime()}`;
                    const baseUrl = import.meta.env.VITE_BASE_URL || '/gsAloumrane2/';
                    const tryPaths = [
                      `${baseUrl}logo-new.jpg${timestamp}`,
                      `${baseUrl}logo.jpg${timestamp}`,
                      `/logo-new.jpg${timestamp}`,
                    ];
                    let currentIndex = 0;
                    const tryNextPath = () => {
                      if (currentIndex < tryPaths.length) {
                        target.src = tryPaths[currentIndex++];
                        setTimeout(() => { if (!target.complete || target.naturalWidth === 0) tryNextPath(); }, 150);
                      } else target.style.display = 'none';
                    };
                    tryNextPath();
                  }}
                />
              </div>
            </div>
            
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-purple-500/20"
              style={{ width: 'calc(100% + 24px)', height: 'calc(100% + 24px)', margin: '-12px' }}
            ></motion.div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl font-black font-serif text-gradient text-shadow-glow mb-4"
          >
            {t('login.institution_name')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-400 font-medium"
          >
            {t('login.welcome')}
          </motion.p>
        </div>

        {/* Login Form Card */}
        <div className="glass rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden shadow-2xl border-white/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl" />
          
          <div className="text-center mb-10 relative">
            <h2 className="text-3xl font-black font-serif text-white mb-3">
              {t('login.title')}
            </h2>
            <p className="text-slate-400 font-medium tracking-wide uppercase text-xs">{t('login.subtitle')}</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4"
            >
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
              <p className="text-red-200 text-sm font-semibold">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label htmlFor="username" className="block text-sm font-bold text-slate-300 ml-1">
                {t('login.username')}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all font-medium"
                  placeholder={t('login.username_placeholder')}
                  autoComplete="username"
                  dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="password" className="block text-sm font-bold text-slate-300 ml-1">
                {t('login.password')}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all font-medium"
                  placeholder={t('login.password_placeholder')}
                  autoComplete="current-password"
                  dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-purple-900/40 border border-white/10 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span className="tracking-widest uppercase text-sm">{t('login.logging_in')}</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 flex-shrink-0" />
                  <span className="tracking-widest uppercase text-sm">{t('login.submit')}</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-10 p-5 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
            <p className="text-slate-400 text-sm text-center font-medium italic leading-relaxed">{t('login.info')}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2 text-sm font-bold text-slate-500 mt-8 tracking-widest uppercase"
        >
          <Code className="w-4 h-4 text-purple-600" />
          <span>{t('login.developer')}</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;

