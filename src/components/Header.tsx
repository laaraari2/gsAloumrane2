import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, BookOpen, Lightbulb, Quote, FileText, Theater, PenSquare, Ear, GraduationCap, Timer, Scale, BookMarked, Network, HelpCircle, FileCheck, BarChart3, StickyNote, Search, Zap, Bookmark, Info, LogOut, User, Target, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const firstPart = pathParts[1];
  const bookId = ['antigone', 'boite', 'condamne'].includes(firstPart) ? firstPart : 'antigone';

  const isHub = location.pathname === '/';

  const handleLogout = () => {
    if (window.confirm(t('logout.confirm'))) {
      logout();
      navigate('/login', { replace: true });
    }
  };

  const navCategories = [
    {
      title: i18n.language === 'ar' ? "المسرحية" : "L'Œuvre",
      items: [
        { to: `/${bookId}`, label: t('navigation.home'), icon: Home },
        { to: `/${bookId}/personnages`, label: t('navigation.characters'), icon: Users },
        { to: `/${bookId}/oeuvre`, label: t('navigation.oeuvre'), icon: BookOpen },
        { to: `/${bookId}/timeline`, label: t('navigation.timeline'), icon: Clock },
        { to: `/${bookId}/themes`, label: t('navigation.themes'), icon: Lightbulb },
        { to: `/${bookId}/citations`, label: t('navigation.quotes'), icon: Quote },
        { to: `/${bookId}/fiche`, label: t('navigation.fiche'), icon: FileText },
        ...(bookId === 'antigone' ? [{ to: `/${bookId}/scenes`, label: t('navigation.scenes'), icon: Theater }] : []),
        { to: `/${bookId}/audio`, label: t('navigation.audio'), icon: Ear },
      ]
    },
    {
      title: i18n.language === 'ar' ? "الامتحان" : "Examen",
      items: [
        { to: `/${bookId}/quick-review`, label: t('navigation.quick_review'), icon: Zap },
        { to: `/${bookId}/examen`, label: t('navigation.examen'), icon: GraduationCap },
        { to: `/${bookId}/exam-simulator`, label: t('navigation.exam_simulator'), icon: Timer },
        { to: `/${bookId}/howto`, label: t('navigation.howto'), icon: HelpCircle },
        { to: `/${bookId}/sample-answers`, label: t('navigation.sample_answers'), icon: FileCheck },
        { to: `/${bookId}/quiz`, label: t('navigation.quiz_rapide'), icon: Timer },
      ]
    },
    {
      title: i18n.language === 'ar' ? "تحليل" : "Analyse",
      items: [
        ...(bookId === 'antigone' ? [{ to: `/${bookId}/comparison`, label: t('navigation.comparison'), icon: Scale }] : []),
        { to: `/${bookId}/glossary`, label: t('navigation.glossary'), icon: BookMarked },
        { to: `/${bookId}/mindmaps`, label: t('navigation.mindmaps'), icon: Network },
        { to: `/${bookId}/figures-style`, label: t('navigation.figures_style'), icon: Target },
      ]
    },
    {
      title: i18n.language === 'ar' ? "مساحتي" : "Mon Espace",
      items: [
        { to: `/${bookId}/progress`, label: t('navigation.progress'), icon: BarChart3 },
        { to: `/${bookId}/notes`, label: t('navigation.notes'), icon: StickyNote },
        { to: `/${bookId}/bookmarks`, label: t('navigation.bookmarks'), icon: Bookmark },
        { to: `/${bookId}/ecrits`, label: t('navigation.ecrits'), icon: PenSquare },
      ]
    },
    {
      title: i18n.language === 'ar' ? "المزيد" : "Plus",
      items: [
        { to: `/${bookId}/search`, label: t('navigation.search'), icon: Search },
        { to: `/${bookId}/guide`, label: t('guide.title'), icon: HelpCircle },
        { to: `/${bookId}/about`, label: t('navigation.about'), icon: Info },
      ]
    }
  ];

  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -150 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: 'spring', damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 glass shadow-2xl shadow-purple-900/20"
    >
      <div className="container mx-auto px-4">
        {/* Main Header Row */}
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Left: Mobile Burger & Brand */}
          <div className="flex items-center gap-4">
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((s) => !s)}
              className="md:hidden inline-flex items-center justify-center p-2.5 rounded-xl text-slate-300 hover:bg-white/10 glass-dark transition-all active:scale-95 shrink-0"
            >
              <MenuToggle isOpen={open} />
            </button>
            
            <NavLink to="/" className="flex items-center gap-3 group shrink-0">
               <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-0.5 shadow-glow shrink-0">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Theater className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase truncate max-w-[150px] md:max-w-none">
                  {isHub ? t('app.hub_title') : t(`hub.works.${bookId}.title`)}
                </span>
                {!isHub && (
                  <span className="hidden sm:block text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest -mt-1">
                    {t('app.by')} {t(`hub.works.${bookId}.author`)}
                  </span>
                )}
              </div>
            </NavLink>
          </div>

          {/* Center: Developer Status (Desktop) */}
          <div className="hidden lg:flex flex-1 justify-center">
             <div className="glass-dark px-6 py-2 rounded-2xl border border-white/5 flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('app.developer_full', 'Mustapha Laaraari')}</span>
             </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {user && (
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-2xl glass-dark text-xs font-black uppercase tracking-tighter text-slate-300 border border-white/5">
                <User className="w-4 h-4 text-purple-400" />
                <span className="truncate max-w-[100px]">{i18n.language === 'ar' ? user.name : user.nameFr}</span>
              </div>
            )}
            
            <div className="hidden md:flex items-center gap-2">
              <LanguageSwitcher />
              {user && (
                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 glass-dark transition-all active:scale-90"
                  title={t('logout.title')}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              )}
            </div>

            <NavLink to="/search" className="md:hidden p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                <Search className="w-5 h-5" />
            </NavLink>
          </div>
        </div>

        {/* Desktop Sophisticated Navigation Bar - Balanced 2-Row Layout */}
        {!isHub && (
          <nav className="hidden lg:block border-t border-white/5 py-2.5">
            <div className="flex flex-col gap-2 max-w-7xl mx-auto px-4">
              {/* Row 1: The Play & Analysis (13 Items) */}
              <div className="flex items-center justify-center gap-x-1 flex-nowrap">
                {[...navCategories[0].items, ...navCategories[2].items].map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end
                      className={(props) =>
                        `group relative flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all duration-300 shrink-0 ${
                          props.isActive
                            ? 'bg-purple-500/15 text-white shadow-glow-sm'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`
                      }
                    >
                      {(props) => (
                        <>
                          <Icon className={`w-3.5 h-3.5 ${props.isActive ? 'text-purple-400' : 'text-slate-500'}`} />
                          <span className="text-[10px] font-bold tracking-tight whitespace-nowrap">{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>

              {/* Row 2: Exam, My Space & More (13 Items) */}
              <div className="flex items-center justify-center gap-x-1 flex-nowrap">
                {[...navCategories[1].items, ...navCategories[3].items, ...navCategories[4].items].map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end
                      className={(props) =>
                        `group relative flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all duration-300 shrink-0 ${
                          props.isActive
                            ? 'bg-purple-500/15 text-white shadow-glow-sm'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`
                      }
                    >
                      {(props) => (
                        <>
                          <Icon className={`w-3.5 h-3.5 ${props.isActive ? 'text-purple-400' : 'text-slate-500'}`} />
                          <span className="text-[10px] font-bold tracking-tight whitespace-nowrap">{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </nav>
        )}

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/5 bg-slate-950 shadow-2xl z-60 overflow-hidden"
            >
              <div className="flex flex-col py-6 px-4 gap-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                {/* Mobile actions: Language & Logout */}
                <div className="flex flex-col gap-4 p-4 rounded-3xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 line-clamp-1">{t('app.developer')}</span>
                      <span className="text-sm font-black text-white">{t('app.developer_full', 'Mustapha Laaraari')}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500">{t('lang.change')}</span>
                    <LanguageSwitcher />
                  </div>
                  {user && (
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-3 w-full py-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold"
                    >
                      <LogOut className="w-5 h-5" />
                      {t('logout.title')}
                    </button>
                  )}
                </div>

                {navCategories.map((category, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex items-center gap-3 px-3">
                      <div className="w-1.5 h-4 rounded-full bg-purple-500 shadow-glow-sm" />
                      <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
                        {category.title}
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {category.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <NavLink
                            key={item.to}
                            to={item.to}
                            end
                            onClick={() => setOpen(false)}
                            className={(props) =>
                              `flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all border ${
                                props.isActive 
                                  ? 'bg-purple-500/20 text-white border-purple-500/30 shadow-glow' 
                                  : 'bg-white/5 text-slate-400 border-white/5'
                              }`
                            }
                          >
                            {(props) => (
                              <>
                                <Icon className={`w-5 h-5 transition-colors ${props.isActive ? 'text-purple-400' : 'text-slate-500'}`} />
                                <span className="font-bold text-[11px] tracking-tight uppercase text-center line-clamp-1">{item.label}</span>
                              </>
                            )}
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

const MenuToggle: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.path
          key="close"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          exit={{ pathLength: 0, opacity: 0 }}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <motion.path
          key="menu"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          exit={{ pathLength: 0, opacity: 0 }}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </AnimatePresence>
  </svg>
);

export default Header;
