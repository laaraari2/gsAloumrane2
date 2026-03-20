import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';
import { BookOpen, Search } from 'lucide-react';

const Glossary: React.FC = () => {
  const { i18n } = useTranslation();
  const { t } = useBook();
  const [searchTerm, setSearchTerm] = useState('');
  const terms = t('glossary.terms', { returnObjects: true }) as Array<{
    term: string;
    definition: string;
    example?: string;
  }>;

  const filteredTerms = Array.isArray(terms)
    ? terms.filter((term) =>
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="max-w-6xl mx-auto px-4"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient text-shadow-glow">
          {t('glossary.title')}
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6" />
        <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
          {t('glossary.subtitle')}
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-16 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition-opacity duration-500" />
        <div className="relative">
          <Search className={`absolute ${i18n.language === 'ar' ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 group-focus-within:text-purple-400 transition-colors`} />
          <input
            type="text"
            placeholder={t('glossary.search_placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full bg-slate-900/80 border border-white/10 rounded-2xl ${i18n.language === 'ar' ? 'pr-16 pl-6' : 'pl-16 pr-6'} py-5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium text-lg`}
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          />
        </div>
      </div>

      {/* Terms List */}
      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((term, index) => (
              <motion.div
                key={term.term}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass rounded-3xl p-8 border border-white/10 hover:border-purple-500/30 transition-all group overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors" />
                
                <div className="flex flex-col md:flex-row md:items-start gap-8 relative z-10">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/5 flex items-center justify-center group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all">
                      <BookOpen className="w-8 h-8 text-purple-400" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-purple-300 transition-colors">
                      {term.term}
                    </h3>
                    <p className="text-slate-400 text-lg leading-relaxed mb-6 font-medium">
                      {term.definition}
                    </p>
                    {term.example && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-5 rounded-2xl bg-white/5 border-l-4 border-pink-500/50 backdrop-blur-sm"
                      >
                        <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                          {t('glossary.example')}
                        </p>
                        <p className="text-slate-200 italic font-medium text-lg leading-relaxed">
                          " {term.example} "
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 glass rounded-3xl border border-white/5"
            >
              <Search className="w-16 h-16 text-slate-700 mx-auto mb-6" />
              <p className="text-2xl font-bold text-slate-500">{t('glossary.no_results')}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Glossary;

