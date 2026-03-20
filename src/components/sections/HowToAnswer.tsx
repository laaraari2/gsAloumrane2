import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';
import { BookOpen, Edit3, CheckCircle, ChevronDown, Star } from 'lucide-react';

const HowToAnswer: React.FC = () => {
  const { i18n } = useTranslation();
  const { t } = useBook();
  const [expandedSection, setExpandedSection] = useState<string | null>('analysis');

  const sections = [
    { key: 'analysis', icon: BookOpen, title: t('howto.analysis.title'), gradient: 'from-purple-500/20 to-blue-500/20' },
    { key: 'writing', icon: Edit3, title: t('howto.writing.title'), gradient: 'from-pink-500/20 to-purple-500/20' },
    { key: 'strategic', icon: CheckCircle, title: t('howto.strategic.title'), gradient: 'from-emerald-500/20 to-teal-500/20' },
  ];

  const toggleSection = (key: string) => {
    setExpandedSection(expandedSection === key ? null : key);
  };

  const SectionCard: React.FC<{ sectionKey: string; icon: React.ElementType; title: string, gradient: string }> = ({
    sectionKey,
    icon: Icon,
    title,
    gradient
  }) => {
    const isExpanded = expandedSection === sectionKey;
    const steps = t(`howto.${sectionKey}.steps`, { returnObjects: true }) as Array<{
      step: string;
      description: string;
      tips?: string[];
    }>;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`glass rounded-3xl overflow-hidden border border-white/10 mb-6 transition-all duration-500 ${isExpanded ? 'ring-2 ring-purple-500/50 shadow-2xl shadow-purple-500/20' : ''}`}
      >
        <button
          onClick={() => toggleSection(sectionKey)}
          className={`w-full flex items-center justify-between p-8 transition-colors ${isExpanded ? 'bg-white/5' : 'hover:bg-white/5'}`}
        >
          <div className="flex items-center gap-6">
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-inner`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white text-start tracking-tight">{title}</h3>
          </div>
          <div className={`p-2 rounded-full transition-all duration-300 ${isExpanded ? 'bg-purple-500 rotate-180' : 'bg-white/10'}`}>
            <ChevronDown className={`w-6 h-6 ${isExpanded ? 'text-white' : 'text-slate-400'}`} />
          </div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "circOut" }}
            >
              <div className="p-8 pt-0 grid gap-6">
                {Array.isArray(steps) &&
                  steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all"
                    >
                      <div className="flex items-start gap-5">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-black text-white shadow-lg">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                            {step.step}
                          </h4>
                          <p className="text-slate-400 text-base leading-relaxed mb-6">
                            {step.description}
                          </p>
                          {Array.isArray(step.tips) && step.tips.length > 0 && (
                            <div className="grid sm:grid-cols-2 gap-3">
                              {step.tips.map((tip, tipIndex) => (
                                <div 
                                  key={tipIndex} 
                                  className="flex items-center gap-3 p-3 rounded-lg bg-black/20 text-sm text-slate-300 border border-white/5"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                  <span>{tip}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                {/* Practical Examples Section */}
                {Array.isArray(t(`howto.${sectionKey}.examples`, { returnObjects: true })) && (
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <h4 className="text-2xl font-black text-purple-300 mb-6 flex items-center gap-3">
                      <Star className="w-6 h-6" />
                      {i18n.language === 'ar' ? 'أمثلة تطبيقية' : 'Exemples d\'application'}
                    </h4>
                    <div className="space-y-6">
                      {(t(`howto.${sectionKey}.examples`, { returnObjects: true }) as Array<{ q: string; a: string; note?: string }>).map((example, i) => (
                        <div key={i} className="glass-dark rounded-2xl p-6 border border-white/5">
                          <div className="mb-4">
                            <span className="text-[10px] font-black text-pink-400 uppercase tracking-widest mb-1 block">Exemple / مثال</span>
                            <p className="text-lg font-bold text-white">{example.q}</p>
                          </div>
                          <div className="bg-purple-500/10 rounded-xl p-5 border-l-4 border-purple-500">
                             <p className="text-slate-200 font-medium leading-relaxed italic">"{example.a}"</p>
                             {example.note && (
                               <p className="mt-3 text-xs text-purple-400 font-bold uppercase tracking-tighter">💡 {example.note}</p>
                             )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto px-4"
    >
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient text-shadow-glow">
          {t('howto.title')}
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6" />
        <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
          {t('howto.subtitle')}
        </p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <SectionCard
            key={section.key}
            sectionKey={section.key}
            icon={section.icon}
            title={section.title}
            gradient={section.gradient}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default HowToAnswer;

