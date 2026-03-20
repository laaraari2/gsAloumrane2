import React from 'react';
import { motion } from 'framer-motion';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';
import { Info, Code, BookOpen, Users, Target, Heart, Award, Zap } from 'lucide-react';

import Developer from '../Developer';

const About: React.FC = () => {
  const { t } = useBook();

  const features = [
    {
      icon: BookOpen,
      title: t('about.features.content.title'),
      description: t('about.features.content.description'),
    },
    {
      icon: Zap,
      title: t('about.features.interactive.title'),
      description: t('about.features.interactive.description'),
    },
    {
      icon: Target,
      title: t('about.features.exam.title'),
      description: t('about.features.exam.description'),
    },
    {
      icon: Users,
      title: t('about.features.community.title'),
      description: t('about.features.community.description'),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black mb-4 text-gradient text-shadow-glow">
          {t('about.title')}
        </h2>
        <p className="text-slate-400 font-medium uppercase tracking-widest text-sm opacity-80">{t('about.subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <motion.div 
          className="glass p-10 rounded-3rem border border-white/10"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <div className="flex items-start gap-6">
            <div className="bg-purple-500/20 p-4 rounded-2xl border border-purple-500/20">
              <Info className="w-8 h-8 text-purple-400 shadow-glow" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">
                {t('about.intro.title')}
              </h3>
              <p className="text-slate-300 leading-relaxed font-medium text-lg opacity-90">{t('about.intro.description')}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="glass p-10 rounded-3rem border border-white/10"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <div className="flex items-start gap-6">
            <div className="bg-yellow-500/20 p-4 rounded-2xl border border-yellow-500/20">
              <Heart className="w-8 h-8 text-yellow-400 shadow-glow" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">
                {t('about.purpose.title')}
              </h3>
              <p className="text-slate-300 leading-relaxed font-medium text-lg opacity-90">{t('about.purpose.description')}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mb-20">
        <h3 className="text-3xl font-black text-white mb-12 text-center uppercase tracking-widest">
          {t('about.features.title')}
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark card-hover rounded-2xl p-8 border border-white/5 text-center"
              >
                <div className="bg-white/5 p-4 rounded-2xl w-min mx-auto mb-6">
                  <Icon className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="text-xl font-black text-white mb-3 uppercase tracking-tighter">{feature.title}</h4>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Developer />

      <div className="grid md:grid-cols-3 gap-8 mt-12 pb-20">
        {[
          { icon: Award, value: "20+", label: t('about.stats.sections'), color: "text-yellow-400" },
          { icon: BookOpen, value: "100%", label: t('about.stats.free'), color: "text-blue-400" },
          { icon: Zap, value: "2", label: t('about.stats.languages'), color: "text-green-400" }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-dark rounded-3xl p-8 border border-white/5 text-center group"
          >
            <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
            <h4 className="text-4xl font-black text-white mb-2">{stat.value}</h4>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default About;

