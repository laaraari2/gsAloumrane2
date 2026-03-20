import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Timer } from 'lucide-react';

const Countdown: React.FC = () => {
  const { t } = useTranslation();
  
  // Set exam date to June 15, 2026 (approximate date for regional exams)
  const calculateTimeLeft = () => {
    const examDate = new Date('2026-06-15T08:00:00');
    const now = new Date();
    const difference = examDate.getTime() - now.getTime();
    
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeItems = [
    { label: t('countdown.days'), value: timeLeft.days },
    { label: t('countdown.hours'), value: timeLeft.hours },
    { label: t('countdown.minutes'), value: timeLeft.minutes },
    { label: t('countdown.seconds'), value: timeLeft.seconds },
  ];

  return (
    <motion.div 
      className="glass-dark rounded-3xl p-8 mb-12 border border-purple-500/20 shadow-glow flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
          <Timer className="w-6 h-6 animate-pulse" />
        </div>
        <h3 className="text-2xl font-black text-gradient uppercase tracking-widest">
          {t('countdown.title')}
        </h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-2xl">
        {timeItems.map((item, i) => (
          <div key={i} className="flex flex-col items-center p-4 rounded-2xl glass-dark border border-white/5">
            <span className="text-4xl md:text-5xl font-black text-white mb-1">{item.value.toString().padStart(2, '0')}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-slate-300 font-bold mb-2">{t('countdown.remaining_text')}</p>
        <div className="px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-black uppercase tracking-tighter">
          {t('countdown.motivation')}
        </div>
      </div>
    </motion.div>
  );
};

export default Countdown;
