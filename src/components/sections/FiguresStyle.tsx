import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';
import { Target, Search, BookOpen, Quote, ChevronDown, ChevronUp } from 'lucide-react';

interface Figure {
  name: string;
  definition: string;
  examples: { text: string; context: string }[];
}

const FiguresStyle: React.FC = () => {
  const { i18n } = useTranslation();
  const { t } = useBook();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const figures = t('figures_style.list', { returnObjects: true }) as Figure[];

  const filteredFigures = Array.isArray(figures) 
    ? figures.filter(f => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        f.definition.toLowerCase().includes(searchTerm.toLowerCase())
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
          {t('navigation.figures_style')}
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6" />
        <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
           {t('figures_style.subtitle', 'Maîtrisez les outils de la rhétorique pour l\'examen.')}
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-16 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition-opacity duration-500" />
        <div className="relative">
          <Search className={`absolute ${i18n.language === 'ar' ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 group-focus-within:text-purple-400 transition-colors`} />
          <input
            type="text"
            placeholder={i18n.language === 'ar' ? 'ابحث عن أداة بلاغية...' : 'Rechercher une figure de style...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full bg-slate-900/80 border border-white/10 rounded-2xl ${i18n.language === 'ar' ? 'pr-16 pl-6' : 'pl-16 pr-6'} py-5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium text-lg`}
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          />
        </div>
      </div>

      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {filteredFigures.map((figure, index) => (
            <motion.div
              key={figure.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all group"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full p-8 flex items-center justify-between text-start"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="w-7 h-7 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white group-hover:text-purple-300 transition-colors">
                      {figure.name}
                    </h3>
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">
                      {i18n.language === 'ar' ? 'أداة بلاغية' : 'Figure de Rhétorique'}
                    </p>
                  </div>
                </div>
                {expandedIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-slate-500" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-slate-500" />
                )}
              </button>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 space-y-8">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                          <BookOpen className="w-5 h-5 text-pink-400" />
                          <span className="text-xs font-black uppercase tracking-widest text-slate-500">Définition / تعريف</span>
                        </div>
                        <p className="text-slate-300 text-lg leading-relaxed font-medium">
                          {figure.definition}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3 px-2">
                          <Quote className="w-5 h-5 text-purple-400" />
                          <span className="text-xs font-black uppercase tracking-widest text-slate-500">Exemples d'Antigone / أمثلة من النص</span>
                        </div>
                        <div className="grid gap-4">
                          {figure.examples.map((ex, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 relative overflow-hidden group/ex">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl" />
                              <p className="text-xl font-black text-white mb-3 italic leading-relaxed">
                                " {ex.text} "
                              </p>
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-tighter">
                                  {ex.context}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredFigures.length === 0 && (
        <div className="text-center py-20 glass rounded-3xl border border-white/5">
          <Search className="w-16 h-16 text-slate-700 mx-auto mb-6" />
          <p className="text-2xl font-bold text-slate-500">Aucun résultat trouvé.</p>
        </div>
      )}
    </motion.div>
  );
};

export default FiguresStyle;
