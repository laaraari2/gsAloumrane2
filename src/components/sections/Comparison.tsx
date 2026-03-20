import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';
import { Scale, Users, BookOpen, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

const Comparison: React.FC = () => {
  const { t } = useBook();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sections = ['characters', 'style', 'vision', 'structure', 'themes'];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const SectionCard: React.FC<{ sectionKey: string; icon: React.ElementType }> = ({ sectionKey, icon: Icon }) => {
    const isExpanded = expandedSection === sectionKey;
    const sophocleData = t(`comparison.${sectionKey}.sophocle`, { returnObjects: true }) as string[];
    const anouilhData = t(`comparison.${sectionKey}.anouilh`, { returnObjects: true }) as string[];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20 mb-6"
      >
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-4">
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <Icon className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-serif font-bold text-purple-300 text-start">
              {t(`comparison.${sectionKey}.title`)}
            </h3>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-purple-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-purple-400" />
          )}
        </button>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              {/* Sophocle */}
              <div className="bg-slate-900/50 rounded-lg p-5 border border-blue-500/30">
                <h4 className="text-lg font-bold text-blue-300 mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  {t('comparison.sophocle')}
                </h4>
                <ul className="space-y-2">
                  {Array.isArray(sophocleData) && sophocleData.map((item, index) => (
                    <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Anouilh */}
              <div className="bg-slate-900/50 rounded-lg p-5 border border-pink-500/30">
                <h4 className="text-lg font-bold text-pink-300 mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
                  {t('comparison.anouilh')}
                </h4>
                <ul className="space-y-2">
                  {Array.isArray(anouilhData) && anouilhData.map((item, index) => (
                    <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="text-pink-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {t('comparison.title')}
        </h2>
        <p className="text-slate-400">{t('comparison.subtitle')}</p>
      </div>

      <div className="mb-8 bg-gradient-to-r from-blue-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-500/20">
        <p className="text-slate-300 leading-relaxed">{t('comparison.intro')}</p>
      </div>

      <div className="space-y-4">
        <SectionCard sectionKey="characters" icon={Users} />
        <SectionCard sectionKey="style" icon={BookOpen} />
        <SectionCard sectionKey="vision" icon={Lightbulb} />
        <SectionCard sectionKey="structure" icon={Scale} />
        <SectionCard sectionKey="themes" icon={Lightbulb} />
      </div>
    </motion.div>
  );
};

export default Comparison;

