import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';
import { BarChart3, Clock, BookOpen, Trophy, TrendingUp, Target } from 'lucide-react';
import { getProgress, QuizResult } from '../../lib/storage';

const Progress: React.FC = () => {
  const { t } = useBook();
  const [progress, setProgress] = useState(getProgress());

  useEffect(() => {
    // Refresh progress every second
    const interval = setInterval(() => {
      setProgress(getProgress());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalQuizzes = progress.quizResults.length;
  const averageScore =
    totalQuizzes > 0
      ? progress.quizResults.reduce((sum, r) => sum + r.percentage, 0) / totalQuizzes
      : 0;
  const bestScore =
    totalQuizzes > 0 ? Math.max(...progress.quizResults.map((r) => r.percentage)) : 0;
  const totalTimeSpent = Object.values(progress.timeSpent).reduce((sum, time) => sum + time, 0);
  const sectionsCount = progress.sectionsVisited.length;

  const recentResults = progress.quizResults.slice(-5).reverse();

  const StatCard: React.FC<{
    icon: React.ElementType;
    title: string;
    value: string | number;
    subtitle?: string;
    colorClasses: { bg: string; text: string };
  }> = ({ icon: Icon, title, value, subtitle, colorClasses }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`${colorClasses.bg} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${colorClasses.text}`} />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-purple-300 mb-1">{value}</h3>
      <p className="text-sm text-slate-400">{title}</p>
      {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {t('progress.title')}
        </h2>
        <p className="text-slate-400">{t('progress.subtitle')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={BookOpen}
          title={t('progress.sections_visited')}
          value={sectionsCount}
          colorClasses={{ bg: 'bg-blue-500/20', text: 'text-blue-400' }}
        />
        <StatCard
          icon={Clock}
          title={t('progress.time_spent')}
          value={`${Math.round(totalTimeSpent)} ${t('progress.minutes')}`}
          colorClasses={{ bg: 'bg-green-500/20', text: 'text-green-400' }}
        />
        <StatCard
          icon={Trophy}
          title={t('progress.quizzes_taken')}
          value={totalQuizzes}
          subtitle={totalQuizzes > 0 ? `${Math.round(averageScore)}% ${t('progress.average')}` : ''}
          colorClasses={{ bg: 'bg-yellow-500/20', text: 'text-yellow-400' }}
        />
        <StatCard
          icon={Target}
          title={t('progress.best_score')}
          value={bestScore > 0 ? `${Math.round(bestScore)}%` : '-'}
          colorClasses={{ bg: 'bg-pink-500/20', text: 'text-pink-400' }}
        />
      </div>

      {/* Recent Quiz Results */}
      {recentResults.length > 0 && (
        <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold font-serif text-purple-300">
              {t('progress.recent_results')}
            </h3>
          </div>
          <div className="space-y-3">
            {recentResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                      result.percentage >= 80
                        ? 'bg-green-500/20 text-green-400'
                        : result.percentage >= 50
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {Math.round(result.percentage)}%
                  </div>
                  <div>
                    <p className="text-slate-200 font-medium">
                      {result.score} / {result.totalQuestions} {t('progress.correct')}
                    </p>
                    <p className="text-sm text-slate-400">
                      {new Date(result.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Sections Visited */}
      {progress.sectionsVisited.length > 0 && (
        <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20">
          <h3 className="text-xl font-bold font-serif text-purple-300 mb-4">
            {t('progress.sections_visited_title')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {progress.sectionsVisited.map((section, index) => {
              // Try to translate section name, fallback to original if translation not found
              const sectionLabel = t(`navigation.${section}`, { defaultValue: section });
              return (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30"
                >
                  {sectionLabel}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {totalQuizzes === 0 && sectionsCount === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">{t('progress.no_data')}</p>
        </div>
      )}
    </motion.div>
  );
};

export default Progress;

