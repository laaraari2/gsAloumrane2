import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBook } from '../../hooks/useBook';
import { ChevronRight, ChevronLeft, BookOpen, Users, Lightbulb } from 'lucide-react';

import Flashcards from '../Flashcards';

const QuickReview: React.FC = () => {
  const { t } = useBook();
  const [currentIndex, setCurrentIndex] = useState(0);

  const charactersData = t('characters', { returnObjects: true }) as Record<string, any>;
  const themesData = t('themes', { returnObjects: true }) as Record<string, any>;

  const charactersList = Object.entries(charactersData || {})
    .filter(([k]) => k !== 'title' && k !== 'subtitle')
    .slice(0, 4)
    .map(([_, v]) => ({ label: v.name, value: v.role }));

  const themesList = Object.entries(themesData || {})
    .filter(([k]) => k !== 'title' && k !== 'subtitle')
    .slice(0, 4)
    .map(([_, v]) => ({ label: v.title, value: v.description }));

  const reviewCards = [
    {
      title: t('quick_review.characters.title'),
      icon: Users,
      items: charactersList,
    },
    {
      title: t('quick_review.themes.title'),
      icon: Lightbulb,
      items: themesList,
    },
    {
      title: t('quick_review.key_info.title'),
      icon: BookOpen,
      items: [
        { label: t('quick_review.key_info.author'), value: t('fiche.identity.author_value') },
        { label: t('quick_review.key_info.date'), value: t('fiche.identity.date_value') },
        { label: t('quick_review.key_info.genre'), value: t('fiche.identity.genre_value') },
        { label: t('quick_review.key_info.context'), value: t('quick_review.key_info.context_value') },
      ],
    },
  ];

  const currentCard = reviewCards[currentIndex];
  const Icon = currentCard.icon;

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewCards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + reviewCards.length) % reviewCards.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black mb-4 text-gradient text-shadow-glow">
          {t('quick_review.title')}
        </h2>
        <p className="text-slate-400 font-medium uppercase tracking-widest text-sm opacity-80">{t('quick_review.subtitle')}</p>
      </div>

      <Flashcards />

      <div className="relative mt-20">
        <h3 className="text-2xl font-black text-white mb-8 text-center uppercase tracking-widest">
            {t('quick_review.key_info.title')}
        </h3>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass p-10 rounded-3rem border border-white/10 min-h-[450px]"
          >
            <div className="flex items-center gap-6 mb-10">
              <div className="bg-purple-500/20 p-4 rounded-2xl border border-purple-500/20">
                <Icon className="w-8 h-8 text-purple-400 shadow-glow" />
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{currentCard.title}</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {currentCard.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-dark rounded-2xl p-6 border border-white/5 group card-hover"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-glow group-hover:scale-110 transition-transform">
                      <span className="text-white font-black text-lg">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-black text-white mb-2 group-hover:text-purple-300 transition-colors">{item.label}</h4>
                      <p className="text-slate-300 font-medium leading-relaxed opacity-90">{item.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={prevCard}
            className="flex items-center gap-3 px-8 py-3 glass-dark rounded-2xl text-slate-300 font-black tracking-widest uppercase text-xs hover:text-white transition-all border border-white/5"
          >
            <ChevronLeft className="w-5 h-5" />
            {t('quick_review.previous')}
          </button>

          <div className="flex gap-3">
            {reviewCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentIndex ? 'w-12 bg-gradient-to-r from-purple-400 to-pink-400' : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextCard}
            className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-black tracking-widest uppercase text-xs hover:shadow-glow transition-all"
          >
            {t('quick_review.next')}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickReview;
