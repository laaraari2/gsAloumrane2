import React from 'react';
import { motion } from 'framer-motion';
import { ShieldOff, Smile, Baby, Clock, UserX, Landmark } from 'lucide-react';
import { useBook } from '../../hooks/useBook';
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  revolte: ShieldOff,
  bonheur: Smile,
  enfance: Baby,
  fatalite: Clock,
  solitude: UserX,
  politique: Landmark
};

const Themes: React.FC = () => {
  const { t } = useBook();

  const themesData = t('themes', { returnObjects: true }) as Record<string, any>;
  const themeKeys = Object.keys(themesData || {}).filter(
    key => key !== 'title' && key !== 'subtitle'
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black mb-4 text-gradient text-shadow-glow">
          {t('themes.title')}
        </h2>
        <p className="text-slate-400 font-medium tracking-wide uppercase text-sm opacity-80">{t('themes.subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {themeKeys.map((key, index) => {
          const Icon = iconMap[key] || Landmark;
          
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
                  <Icon className="w-8 h-8 text-purple-400 transition-colors" />
                </div>
                <h3 className="text-2xl font-black text-white group-hover:text-purple-300 transition-colors leading-tight">
                  {t(`themes.${key}.title`)}
                </h3>
              </div>
              
              <p className="text-slate-300/90 text-lg leading-relaxed flex-grow font-medium opacity-90 transition-opacity group-hover:opacity-100">
                {t(`themes.${key}.description`)}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Themes;
