import React from 'react';
import { motion } from 'framer-motion';
import { Quote as QuoteIcon } from 'lucide-react';
import { useBook } from '../../hooks/useBook';
const Quotes: React.FC = () => {
  const { t } = useBook();

  const quotesData = t('quotes', { returnObjects: true }) as Record<string, any>;
  const quoteKeys = Object.keys(quotesData || {}).filter(
    key => key !== 'title' && key !== 'subtitle'
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="max-w-5xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black mb-4 text-gradient text-shadow-glow">
          {t('quotes.title')}
        </h2>
        <p className="text-slate-400 font-medium tracking-wide uppercase text-sm opacity-80">{t('quotes.subtitle')}</p>
      </div>

      <div className="space-y-10">
        {quoteKeys.map((key, index) => {
          return (
            <motion.div
              key={key}
              initial={{ x: index % 2 === 0 ? -30 : 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass card-hover rounded-[2.5rem] p-10 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors" />
              
              <div className="flex flex-col md:flex-row items-start gap-8 relative">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-5 rounded-2xl border border-white/10 group-hover:rotate-12 transition-transform">
                  <QuoteIcon className="w-10 h-10 text-purple-400 opacity-60" />
                </div>
                
                <div className="flex-1">
                  <blockquote className="text-2xl md:text-3xl text-white font-serif italic mb-8 leading-relaxed font-medium">
                    "{t(`quotes.${key}.text`)}"
                  </blockquote>
                  
                  <div className="flex items-center justify-end gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
                    <div className="text-right">
                      <span className="text-xl font-black text-gradient block mb-1">{t(`quotes.${key}.speaker`)}</span>
                      <p className="text-slate-400 font-bold tracking-widest uppercase text-xs opacity-70">{t(`quotes.${key}.context`)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Quotes;
