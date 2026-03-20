import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';
import { Timer, AlertCircle, ChevronRight, ChevronLeft, Award, PlayCircle } from 'lucide-react';

interface SimulatorQuestion {
  id: number;
  type: 'comprehension' | 'analysis';
  text: string;
  quote?: string;
  modelAnswer: string[];
}

const ExamSimulator: React.FC = () => {
  const { i18n } = useTranslation();
  const { t } = useBook();
  const [gameState, setGameState] = useState<'welcome' | 'active' | 'finished'>('welcome');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes simulation
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const simulationQuestions: SimulatorQuestion[] = useMemo(() => {
    const raw = t('exam_simulator.questions', { returnObjects: true });
    if (Array.isArray(raw)) return raw as SimulatorQuestion[];
    // Fallback if no questions found
    return [];
  }, [t]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'active' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'active') {
      setGameState('finished');
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startExam = () => {
    setGameState('active');
    setTimeLeft(900);
    setCurrentIdx(0);
    setAnswers({});
  };

  if (gameState === 'welcome') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto py-20 px-4 text-center"
      >
        <div className="glass rounded-[3rem] p-12 md:p-20 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500" />
          <PlayCircle className="w-24 h-24 text-purple-400 mx-auto mb-8 animate-pulse" />
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            {t('navigation.exam_simulator')}
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {i18n.language === 'ar' 
              ? 'اختبر نفسك في ظروف الامتحان الحقيقية. لديك 15 دقيقة للإجابة على سلسلة من الأسئلة المختارة.'
              : 'Testez-vous dans des conditions réelles. Vous avez 15 minutes pour répondre à une série de questions.'}
          </p>
          
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <Timer className="w-6 h-6 text-pink-400 mx-auto mb-3" />
                <p className="text-sm font-black text-white uppercase">15 Minutes</p>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <AlertCircle className="w-6 h-6 text-yellow-400 mx-auto mb-3" />
                <p className="text-sm font-black text-white uppercase">Focus</p>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <Award className="w-6 h-6 text-purple-400 mx-auto mb-3" />
                <p className="text-sm font-black text-white uppercase">Evaluation</p>
             </div>
          </div>

          <button 
            onClick={startExam}
            className="px-12 py-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-xl font-black text-white shadow-2xl hover:shadow-purple-500/20 transition-all uppercase tracking-widest"
          >
            {i18n.language === 'ar' ? 'ابدأ المحاكاة الآن' : 'Démarrer la Simulation'}
          </button>
        </div>
      </motion.div>
    );
  }

  if (gameState === 'active') {
    if (simulationQuestions.length === 0) {
      return (
        <div className="max-w-4xl mx-auto py-20 px-4 text-center">
          <div className="glass rounded-[3rem] p-12 border border-white/10">
            <h2 className="text-2xl font-black text-white mb-4">
              {i18n.language === 'ar' ? 'لا توجد أسئلة متوفرة حالياً لهذه المحاكاة.' : 'Aucune question n\'est disponible pour cette simulation.'}
            </h2>
            <button 
              onClick={() => setGameState('welcome')}
              className="px-8 py-3 bg-white/10 rounded-xl text-white font-bold"
            >
              {i18n.language === 'ar' ? 'عودة' : 'Retour'}
            </button>
          </div>
        </div>
      );
    }
    const q = simulationQuestions[currentIdx];
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="flex items-center justify-between mb-8 glass px-6 py-4 rounded-2xl border border-white/10">
          <div className="flex items-center gap-4">
            <Timer className={`w-6 h-6 ${timeLeft < 180 ? 'text-rose-500 animate-pulse' : 'text-purple-400'}`} />
            <span className={`text-2xl font-black ${timeLeft < 180 ? 'text-rose-500' : 'text-white'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="text-right">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Progression</p>
             <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                <div 
                   className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                   style={{ width: `${((currentIdx + 1) / simulationQuestions.length) * 100}%` }}
                />
             </div>
          </div>
        </div>

        <motion.div 
          key={currentIdx}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="glass rounded-3rem p-10 md:p-16 border border-white/10 min-h-[500px] flex flex-col"
        >
          <span className="text-xs font-black text-purple-400 uppercase tracking-[0.3em] mb-4">
            Question {currentIdx + 1} / {simulationQuestions.length}
          </span>
          
          {q.quote && (
            <blockquote className="text-2xl font-serif italic text-purple-200 border-l-4 border-purple-500/30 pl-8 mb-8">
              "{q.quote}"
            </blockquote>
          )}
          
          <h3 className="text-3xl font-black text-white mb-10 leading-tight">
            {q.text}
          </h3>

          <textarea
            value={answers[q.id] || ''}
            onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
            className="w-full flex-grow bg-slate-950/50 border border-white/10 rounded-2xl p-8 text-white text-lg placeholder-slate-700 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all mb-10"
            placeholder={i18n.language === 'ar' ? 'اكتب إجابتك هنا...' : 'Écrivez votre réponse ici...'}
          />

          <div className="flex items-center justify-between gap-4">
            <button
               disabled={currentIdx === 0}
               onClick={() => setCurrentIdx(prev => prev - 1)}
               className="flex items-center gap-3 px-8 py-4 glass-dark rounded-xl text-sm font-black text-slate-400 disabled:opacity-30 disabled:pointer-events-none hover:text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" /> {i18n.language === 'ar' ? 'السابق' : 'Précédent'}
            </button>
            
            {currentIdx === simulationQuestions.length - 1 ? (
              <button
                onClick={() => setGameState('finished')}
                className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm font-black text-white hover:shadow-green-500/20 shadow-xl transition-all"
              >
                {i18n.language === 'ar' ? 'إنهاء المحاكاة' : 'Terminer'}
              </button>
            ) : (
              <button
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="flex items-center gap-3 px-10 py-4 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-black text-white transition-all"
              >
                {i18n.language === 'ar' ? 'التالي' : 'Suivant'} <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <Award className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
           {i18n.language === 'ar' ? 'انتهت المحاكاة!' : 'Simulation Terminée !'}
        </h2>
        <p className="text-slate-400 font-medium">
          {i18n.language === 'ar' ? 'راجع إجاباتك وقارنها مع الأجوبة النموذجية.' : 'Révisez vos réponses et comparez-les avec le modèle.'}
        </p>
      </div>

      <div className="space-y-8">
        {simulationQuestions.map((q, i) => (
          <motion.div 
            key={q.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-3xl p-8 border border-white/10"
          >
            <div className="mb-6 pb-6 border-b border-white/5">
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2 block">Question {i + 1}</span>
              <p className="text-xl font-black text-white">{q.text}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                 <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Votre Réponse / إجابتك</p>
                 <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-slate-300 italic min-h-[100px]">
                    {answers[q.id] || (i18n.language === 'ar' ? 'لا توجد إجابة' : 'Aucune réponse')}
                 </div>
              </div>
              <div className="space-y-3">
                 <p className="text-xs font-black text-emerald-500 uppercase tracking-widest">Réponse Modèle / الجواب النموذجي</p>
                 <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 font-bold min-h-[100px]">
                    <ul className="list-disc list-inside space-y-1">
                      {q.modelAnswer.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                 </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
         <button 
           onClick={startExam}
           className="px-12 py-5 bg-white/5 hover:bg-white/10 rounded-2xl text-sm font-black text-white border border-white/10 transition-all uppercase tracking-widest"
         >
           {i18n.language === 'ar' ? 'إعادة المحاكاة' : 'Réessayer'}
         </button>
      </div>
    </div>
  );
};

export default ExamSimulator;
