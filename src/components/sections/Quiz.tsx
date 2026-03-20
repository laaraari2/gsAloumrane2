import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';
import { CheckCircle, XCircle, Award } from 'lucide-react';
import { addQuizResult, markSectionVisited } from '../../lib/storage';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const QuizRapide: React.FC = () => {
  const { i18n } = useTranslation();
  const { t } = useBook();
  const rawQuestions = t('quiz_rapide.questions', { returnObjects: true });
  const questions: Question[] = useMemo(() => {
    return Array.isArray(rawQuestions) ? rawQuestions : [];
  }, [rawQuestions]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Save result when quiz is completed
  useEffect(() => {
    if (currentQuestionIndex >= questions.length && !quizCompleted && quizStarted) {
      const percentage = (score / questions.length) * 100;
      addQuizResult({
        date: new Date().toISOString(),
        score,
        totalQuestions: questions.length,
        percentage,
      });
      markSectionVisited('quiz');
      setQuizCompleted(true);
    }
  }, [currentQuestionIndex, questions.length, score, quizCompleted, quizStarted]);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setQuizStarted(true);
    setQuizCompleted(false);
  };

  const getFinalMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return t('quiz_rapide.final_message_good');
    if (percentage >= 50) return t('quiz_rapide.final_message_medium');
    return t('quiz_rapide.final_message_bad');
  };

  if (!quizStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="max-w-4xl mx-auto px-4 py-20"
      >
        <div className="glass rounded-[3rem] p-12 text-center border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-10 flex items-center justify-center shadow-2xl shadow-purple-500/40">
              <Award className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient text-shadow-glow">
              {t('quiz_rapide.title')}
            </h2>
            <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed mb-12">
              {t('quiz_rapide.subtitle')}
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setQuizStarted(true)}
              className="px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black rounded-2xl shadow-2xl shadow-purple-900/40 border border-white/10 uppercase tracking-widest text-lg"
            >
              {t('quiz_rapide.start_button')}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (currentQuestionIndex >= questions.length) {
    const percentage = (score / questions.length) * 100;
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-4 py-12"
      >
        <div className="glass rounded-[3rem] p-12 text-center border border-white/10 relative overflow-hidden">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mx-auto mb-10 flex items-center justify-center shadow-2xl shadow-yellow-500/40 ring-8 ring-yellow-500/10"
          >
            <Award className="w-16 h-16 text-white" />
          </motion.div>
          
          <h2 className="text-5xl font-black mb-4 text-white uppercase tracking-tighter">
            {i18n.language === 'ar' ? 'اكتمل الاختبار!' : 'Quiz Terminé !'}
          </h2>
          
          <div className="flex items-center justify-center gap-6 mb-10">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">{t('quiz_rapide.score_text')}</p>
              <p className="text-4xl font-black text-purple-400">{score} / {questions.length}</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Percentage</p>
              <p className="text-4xl font-black text-pink-400">{Math.round(percentage)}%</p>
            </div>
          </div>
          
          <p className="text-xl text-slate-300 mb-12 max-w-md mx-auto leading-relaxed font-medium bg-white/5 p-6 rounded-2xl border border-white/5 italic">
            " {getFinalMessage()} "
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRestart}
            className="px-12 py-5 bg-white text-slate-900 font-black rounded-2xl shadow-2xl transition-all uppercase tracking-widest text-lg"
          >
            {t('quiz_rapide.restart_button')}
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4 px-2">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-purple-400">
              {i18n.language === 'ar' ? `السؤال ${currentQuestionIndex + 1}` : `Question ${currentQuestionIndex + 1}`}
            </p>
            <p className="text-2xl font-black text-white">Progress</p>
          </div>
          <p className="text-xl font-black text-white/50">{currentQuestionIndex + 1} / {questions.length}</p>
        </div>
        <div className="w-full bg-white/5 rounded-full h-4 p-1 border border-white/5 border-shadow-glow">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full shadow-glow"
            initial={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
            animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.6, ease: "circOut" }}
          ></motion.div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="glass rounded-[2.5rem] p-10 md:p-14 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl" />
          
          <h3 className="text-2xl md:text-3xl font-black text-white mb-12 text-center leading-tight tracking-tight px-4">
            {currentQuestion.question}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentQuestion.options.map((option, index) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const isSelected = option === selectedAnswer;
              
              let stateClass = 'bg-white/5 border-white/10 hover:border-purple-500/40 hover:bg-white/10';
              if (isAnswered) {
                if (isCorrect) {
                  stateClass = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-500/10';
                } else if (isSelected) {
                  stateClass = 'bg-red-500/20 border-red-500/50 text-red-400 ring-2 ring-red-500/20 shadow-lg shadow-red-500/10';
                } else {
                  stateClass = 'bg-white/5 border-white/5 opacity-40 grayscale';
                }
              }

              return (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                  className={`group relative p-6 rounded-2xl border text-lg font-bold transition-all duration-300 text-start flex items-center justify-between ${stateClass}`}
                >
                  <span className="relative z-10">{option}</span>
                  {isAnswered && isCorrect && <CheckCircle className="w-6 h-6 flex-shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 flex-shrink-0" />}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-12 pt-10 border-t border-white/10"
              >
                <div className={`p-8 rounded-3xl ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'} border backdrop-blur-sm mb-10`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                      {selectedAnswer === currentQuestion.correctAnswer ? <CheckCircle className="w-7 h-7 text-emerald-400" /> : <XCircle className="w-7 h-7 text-red-400" />}
                    </div>
                    <span className={`text-2xl font-black ${selectedAnswer === currentQuestion.correctAnswer ? 'text-emerald-400' : 'text-red-400'}`}>
                      {selectedAnswer === currentQuestion.correctAnswer ? (i18n.language === 'ar' ? 'إجابة صحيحة!' : 'Bonne réponse !') : (i18n.language === 'ar' ? 'إجابة خاطئة' : 'Mauvaise réponse.')}
                    </span>
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed font-medium">
                    {currentQuestion.explanation}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  className="w-full p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black rounded-2xl shadow-2xl shadow-purple-900/40 border border-white/10 uppercase tracking-widest text-lg flex items-center justify-center gap-3"
                >
                  {t('quiz_rapide.next_button')}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default QuizRapide;
