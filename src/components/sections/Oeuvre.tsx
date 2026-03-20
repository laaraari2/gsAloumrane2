import React from 'react';
import { motion } from 'framer-motion';
import { BookMarked, Drama, Feather } from 'lucide-react';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';

const Oeuvre: React.FC = () => {
  const { t } = useBook();

  const sections = [
    { key: 'creation', icon: Drama },
    { key: 'style', icon: Feather },
    { key: 'vision', icon: BookMarked }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto"
    >
      <div className="text-center mb-16">
        <motion.h2 
          className="text-4xl md:text-6xl font-black mb-4 text-gradient text-shadow-glow"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {t('oeuvre.title')}
        </motion.h2>
        <p className="text-slate-400 font-medium tracking-wide uppercase text-sm opacity-80">{t('oeuvre.subtitle')}</p>
      </div>

      <div className="space-y-10">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={index}
              initial={{ x: index % 2 === 0 ? -30 : 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.15 }}
              className="glass card-hover rounded-[2.5rem] p-10 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors" />
              
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-5 rounded-[1.5rem] border border-white/10 group-hover:rotate-6 transition-transform">
                  <Icon className="w-10 h-10 text-purple-400" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-6 group-hover:text-purple-300 transition-colors">{t(`oeuvre.${section.key}.title`)}</h3>
                  <p className="text-slate-300 text-lg leading-relaxed text-justify opacity-90 font-medium">{t(`oeuvre.${section.key}.content`)}</p>
                </div>
              </div>

              {/* Decorative line */}
              <div className="absolute bottom-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Oeuvre;
