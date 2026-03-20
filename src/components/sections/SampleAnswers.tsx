import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';
import { FileText, BookOpen, Edit3, ChevronDown, ChevronUp, Star, CheckCircle } from 'lucide-react';

const SampleAnswers: React.FC = () => {
  const { t } = useBook();
  const [expandedAnswer, setExpandedAnswer] = useState<number | null>(null);

  const answers = t('sample_answers.answers', { returnObjects: true }) as Array<{
    type: string;
    question: string;
    answer: string;
    points: string[];
    grade?: string;
  }>;

  const toggleAnswer = (index: number) => {
    setExpandedAnswer(expandedAnswer === index ? null : index);
  };

  const getTypeIcon = (type: string) => {
    return type === 'analysis' ? BookOpen : Edit3;
  };

  const getTypeColorClasses = (type: string) => {
    if (type === 'analysis') {
      return {
        bg: 'bg-blue-500/20',
        text: 'text-blue-400',
        border: 'border-blue-500/30'
      };
    }
    return {
      bg: 'bg-pink-500/20',
      text: 'text-pink-400',
      border: 'border-pink-500/30'
    };
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
          {t('sample_answers.title')}
        </h2>
        <p className="text-slate-400">{t('sample_answers.subtitle')}</p>
      </div>

      <div className="space-y-6">
        {Array.isArray(answers) &&
          answers.map((answer, index) => {
            const Icon = getTypeIcon(answer.type);
            const colorClasses = getTypeColorClasses(answer.type);
            const isExpanded = expandedAnswer === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl backdrop-blur-sm border border-purple-500/20 overflow-hidden"
              >
                <button
                  onClick={() => toggleAnswer(index)}
                  className="w-full p-6 flex items-center justify-between hover:bg-slate-800/30 transition"
                >
                  <div className="flex items-center gap-4 flex-1 text-start">
                    <div className={`${colorClasses.bg} p-3 rounded-lg`}>
                      <Icon className={`w-6 h-6 ${colorClasses.text}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold font-serif text-purple-300">
                          {t(`sample_answers.types.${answer.type}`)}
                        </h3>
                        {answer.grade && (
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-bold">{answer.grade}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-slate-300 text-sm">{answer.question}</p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 space-y-4">
                        <div className="bg-slate-900/50 rounded-lg p-5 border border-purple-500/20">
                          <h4 className="text-sm font-bold text-purple-300 mb-3 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            {t('sample_answers.model_answer')}
                          </h4>
                          <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                            {answer.answer}
                          </div>
                        </div>

                        {Array.isArray(answer.points) && answer.points.length > 0 && (
                          <div className="bg-slate-900/50 rounded-lg p-5 border border-green-500/20">
                            <h4 className="text-sm font-bold text-green-300 mb-3">
                              {t('sample_answers.key_points')}
                            </h4>
                            <ul className="space-y-2">
                              {answer.points.map((point, pointIndex) => (
                                <li key={pointIndex} className="flex items-start gap-2 text-slate-300 text-sm">
                                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
      </div>
    </motion.div>
  );
};

export default SampleAnswers;

