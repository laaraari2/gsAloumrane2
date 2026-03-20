import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBook } from '../hooks/useBook';
import { Zap, RefreshCcw } from 'lucide-react';

interface FlashcardData {
  q: string;
  a: string;
}

const Flashcards: React.FC = () => {
  const { t } = useBook();
  const cards = (t('flashcards.cards', { returnObjects: true }) || []) as FlashcardData[];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 200);
  };

  return (
    <div className="py-20 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black mb-4 text-gradient text-shadow-glow">
          {t('flashcards.title')}
        </h2>
        <p className="text-slate-400 font-medium uppercase tracking-widest text-sm">{t('flashcards.subtitle')}</p>
      </div>

      <div className="max-w-md mx-auto relative perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="w-full aspect-[4/3] cursor-pointer"
            initial={{ rotateY: 0, opacity: 0, x: 50 }}
            animate={{ rotateY: isFlipped ? 180 : 0, opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front */}
            <div 
              className={`absolute inset-0 glass rounded-3xl p-10 flex flex-col items-center justify-center text-center backface-hidden border-2 border-white/10 ${isFlipped ? 'invisible' : 'visible'}`}
            >
              <Zap className="w-12 h-12 text-yellow-400 mb-6" />
              <p className="text-2xl font-black text-white leading-tight">
                {cards[currentIndex].q}
              </p>
              <p className="absolute bottom-6 text-xs text-slate-500 font-bold uppercase tracking-widest">
                {t('flashcards.flip_hint')}
              </p>
            </div>

            {/* Back */}
            <div 
              className={`absolute inset-0 glass-dark rounded-3xl p-10 flex flex-col items-center justify-center text-center backface-hidden border-2 border-purple-500/30 ${isFlipped ? 'visible' : 'invisible'}`}
              style={{ transform: "rotateY(180deg)" }}
            >
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8 shadow-glow" />
              <p className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">
                {cards[currentIndex].a}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-12 gap-8">
          <button 
            onClick={nextCard}
            className="flex items-center gap-3 px-8 py-3 glass-dark rounded-2xl text-sm font-black tracking-widest uppercase text-purple-400 hover:text-white hover:bg-purple-500/20 transition-all border border-purple-500/20 group"
          >
            <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
            {t('quiz_rapide.next_button')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
