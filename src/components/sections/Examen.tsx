import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';
import { ChevronDown, BookOpen, Edit3, HelpCircle } from 'lucide-react';

interface ComprehensionQuestion {
  question: string;
  points: string[];
}

interface AnalysisQuestion {
  quote: string;
  question: string;
  points: string[];
}

interface WritingPrompt {
  prompt: string;
  points: string[];
}

const Examen: React.FC = () => {
  const { t } = useBook();
  const comprehensionQuestions: ComprehensionQuestion[] = useMemo(() => t('examen.comprehension_questions', { returnObjects: true }), [t]);
  const analysisQuestions: AnalysisQuestion[] = useMemo(() => t('examen.analysis_questions', { returnObjects: true }), [t]);
  const writingPrompts: WritingPrompt[] = useMemo(() => t('examen.writing_prompts', { returnObjects: true }), [t]);

  const [activeComprehension, setActiveComprehension] = useState<number | null>(null);
  const [activeAnalysis, setActiveAnalysis] = useState<number | null>(null);
  const [activeWriting, setActiveWriting] = useState<number | null>(null);

  const Section: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <Icon className="w-8 h-8 text-purple-400" />
        <h3 className="text-2xl md:text-3xl font-bold font-serif text-purple-300">{title}</h3>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );

  const ComprehensionCard: React.FC<{ question: ComprehensionQuestion; index: number }> = ({ question, index }) => (
    <div className="bg-slate-800/40 rounded-lg p-5 border border-slate-700">
      <p className="font-semibold text-slate-200 mb-4">{question.question}</p>
      <button
        onClick={() => setActiveComprehension(activeComprehension === index ? null : index)}
        className="flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200 transition"
      >
        <span>{t('examen.show_answer_points')}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${activeComprehension === index ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {activeComprehension === index && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <ul className="list-disc list-inside text-sm text-slate-300 mt-4 space-y-2">
              {question.points.map((point, i) => <li key={i}>{point}</li>)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const AnalysisCard: React.FC<{ question: AnalysisQuestion; index: number }> = ({ question, index }) => (
    <div className="bg-slate-800/40 rounded-lg p-5 border border-slate-700">
      <blockquote className="border-l-4 border-pink-500 pl-4 italic text-slate-300 mb-4">"{question.quote}"</blockquote>
      <p className="font-semibold text-slate-200 mb-4">{question.question}</p>
      <button
        onClick={() => setActiveAnalysis(activeAnalysis === index ? null : index)}
        className="flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200 transition"
      >
        <span>{t('examen.show_analysis_points')}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${activeAnalysis === index ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {activeAnalysis === index && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <ul className="list-disc list-inside text-sm text-slate-300 mt-4 space-y-2">
              {question.points.map((point, i) => <li key={i}>{point}</li>)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
  
    const WritingCard: React.FC<{ prompt: WritingPrompt; index: number }> = ({ prompt, index }) => (
    <div className="bg-slate-800/40 rounded-lg p-5 border border-slate-700">
      <p className="font-semibold text-slate-200 mb-4">{prompt.prompt}</p>
      <textarea 
        rows={6} 
        className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-purple-500 focus:border-purple-500 mb-4"
        placeholder={t('examen.writing_placeholder')}
      ></textarea>
      <button
        onClick={() => setActiveWriting(activeWriting === index ? null : index)}
        className="flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200 transition"
      >
        <span>{t('examen.show_writing_points')}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${activeWriting === index ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {activeWriting === index && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <ul className="list-disc list-inside text-sm text-slate-300 mt-4 space-y-2">
              {prompt.points.map((point, i) => <li key={i}>{point}</li>)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black mb-4 text-gradient text-shadow-glow">
          {t('examen.title')}
        </h2>
        <p className="text-slate-400 font-medium tracking-wide uppercase text-sm opacity-80">{t('examen.subtitle')}</p>
      </div>

      <Section title={t('examen.comprehension_title')} icon={HelpCircle}>
        <div className="grid gap-6">
          {Array.isArray(comprehensionQuestions) && comprehensionQuestions.map((q, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass card-hover rounded-2xl p-6 border border-white/10 group"
            >
              <p className="text-lg font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">{q.question}</p>
              <button
                onClick={() => setActiveComprehension(activeComprehension === i ? null : i)}
                className="flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-pink-400 transition-colors"
              >
                <span>{t('examen.show_answer_points')}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeComprehension === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeComprehension === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-6"
                  >
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <ul className="space-y-3">
                        {q.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title={t('examen.analysis_title')} icon={BookOpen}>
        <div className="grid gap-6">
          {Array.isArray(analysisQuestions) && analysisQuestions.map((q, i) => (
            <motion.div
              key={i}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass card-hover rounded-2xl p-8 border border-white/10 group"
            >
              <blockquote className="text-xl text-purple-200/90 font-serif italic border-l-4 border-purple-500/50 pl-6 mb-6">
                "{q.quote}"
              </blockquote>
              <p className="text-lg font-black text-white mb-6 group-hover:text-pink-300 transition-colors">{q.question}</p>
              <button
                onClick={() => setActiveAnalysis(activeAnalysis === i ? null : i)}
                className="flex items-center gap-2 text-sm font-black tracking-widest uppercase text-purple-400 hover:text-pink-400 transition-colors"
              >
                <span>{t('examen.show_analysis_points')}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeAnalysis === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeAnalysis === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-8"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      {q.points.map((point, idx) => (
                        <div key={idx} className="p-4 rounded-xl glass-dark border border-white/5 text-slate-300 text-sm font-medium flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0" />
                          {point}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title={t('examen.writing_title')} icon={Edit3}>
        <div className="grid gap-8">
          {Array.isArray(writingPrompts) && writingPrompts.map((p, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass rounded-3rem p-10 border border-white/10"
            >
              <p className="text-xl font-black text-white mb-8 border-b border-white/5 pb-6 leading-relaxed">{p.prompt}</p>
              <textarea 
                rows={6} 
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-slate-500 mb-8 outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={t('examen.writing_placeholder')}
              ></textarea>
              <button
                onClick={() => setActiveWriting(activeWriting === i ? null : i)}
                className="flex items-center gap-3 px-8 py-3 glass-dark rounded-xl text-sm font-black tracking-widest uppercase text-purple-300 hover:text-white transition-all"
              >
                <span>{t('examen.show_writing_points')}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeWriting === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeWriting === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-10"
                  >
                    <div className="space-y-4">
                      {p.points.map((point, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-purple-500/10 border-l-4 border-purple-500">
                          <span className="text-purple-400 font-black">{idx + 1}.</span>
                          <span className="text-slate-200 font-bold">{point}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Section>
    </motion.div>
  );
};

export default Examen;
