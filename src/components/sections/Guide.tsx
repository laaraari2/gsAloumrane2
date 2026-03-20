import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookOpen, Navigation, Zap, Wrench, Bookmark, HelpCircle } from 'lucide-react';

const Guide: React.FC = () => {
  const { t, i18n } = useTranslation();

  const sections = [
    {
      icon: BookOpen,
      title: t('guide.sections.selection.title'),
      description: t('guide.sections.selection.description'),
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    {
      icon: Navigation,
      title: t('guide.sections.navigation.title'),
      description: t('guide.sections.navigation.description'),
      color: 'text-purple-400',
      bg: 'bg-purple-500/10'
    },
    {
      icon: Zap,
      title: t('guide.sections.simulator.title'),
      description: t('guide.sections.simulator.description'),
      color: 'text-amber-400',
      bg: 'bg-amber-500/10'
    },
    {
      icon: Wrench,
      title: t('guide.sections.tools.title'),
      description: t('guide.sections.tools.description'),
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    {
      icon: Bookmark,
      title: t('guide.sections.notes.title'),
      description: t('guide.sections.notes.description'),
      color: 'text-rose-400',
      bg: 'bg-rose-500/10'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto py-12 px-4"
    >
      <div className="text-center mb-16">
        <div className="inline-flex p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-6">
          <HelpCircle className="w-8 h-8 text-purple-400 animate-pulse" />
        </div>
        <h2 className="text-4xl md:text-5xl font-black mb-4 text-gradient">
          {t('guide.title')}
        </h2>
        <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto italic">
          {t('guide.subtitle')}
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: i18n.language === 'ar' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-3rem border border-white/10 group hover:border-purple-500/30 transition-all cursor-default"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className={`${section.bg} p-6 rounded-2.5rem border border-white/5 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-10 h-10 ${section.color}`} />
                </div>
                <div className={`flex-1 text-center ${i18n.language === 'ar' ? 'md:text-right' : 'md:text-left'}`}>
                  <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tighter">
                    {section.title}
                  </h3>
                  <p className="text-slate-400 font-medium leading-relaxed text-lg">
                    {section.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-20 glass p-10 rounded-3rem border border-white/5 bg-gradient-to-br from-purple-500/5 to-transparent text-center">
        <p className="text-slate-300 font-bold mb-6 italic">
          {i18n.language === 'ar' 
            ? 'إذا كان لديك أي سؤال آخر، لا تتردد في استشارة أستاذك.' 
            : 'Si vous avez d\'autres questions, n\'hésitez pas à consulter votre professeur.'}
        </p>
        <div className="h-1 w-20 bg-purple-500/30 mx-auto rounded-full" />
      </div>
    </motion.div>
  );
};

export default Guide;
