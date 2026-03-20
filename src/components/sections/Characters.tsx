import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { useBook } from '../../hooks/useBook';
const Characters: React.FC = () => {
  const { t } = useBook();
  
  // Get all keys from 'characters' object except 'title' and 'subtitle'
  const charactersData = t('characters', { returnObjects: true }) as Record<string, any>;
  const characterKeys = Object.keys(charactersData || {}).filter(
    key => key !== 'title' && key !== 'subtitle'
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <motion.h2 
          className="text-4xl md:text-6xl font-black mb-4 text-gradient text-shadow-glow"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {t('characters.title')}
        </motion.h2>
        <p className="text-slate-400 font-medium tracking-wide uppercase text-sm opacity-80">{t('characters.subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {characterKeys.map((key, index) => {
          const traits = t(`characters.${key}.traits`, { returnObjects: true }) as string[];
          
          return (
            <motion.div
              key={key}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="glass card-hover rounded-[2rem] p-8 flex flex-col relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors" />
              
              <div className="flex items-center gap-5 mb-6 relative">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform">
                  <User className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-1 group-hover:text-purple-300 transition-colors">{t(`characters.${key}.name`)}</h3>
                  <p className="text-xs font-bold tracking-widest uppercase text-pink-500 opacity-80">{t(`characters.${key}.role`)}</p>
                </div>
              </div>
              
              <p className="text-slate-300/90 text-md leading-relaxed mb-8 flex-grow font-medium">
                {t(`characters.${key}.description`)}
              </p>
              
              <div className="flex flex-wrap gap-2 relative">
                {Array.isArray(traits) && traits.map((trait) => (
                  <span
                    key={trait}
                    className="px-4 py-1.5 glass-dark text-purple-300 text-xs font-bold rounded-lg border border-purple-500/20 group-hover:border-purple-500/40 transition-colors"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  );
};

export default Characters;
