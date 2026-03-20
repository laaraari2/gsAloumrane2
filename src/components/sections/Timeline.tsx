import React from 'react';
import { motion } from 'framer-motion';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';
import { Clock, AlertTriangle, Skull, Sunset, Sun, Moon } from 'lucide-react';

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
}

const Timeline: React.FC = () => {
  const { i18n } = useTranslation();
  const { t } = useBook();
  const events: TimelineEvent[] = t('timeline.events', { returnObjects: true }) as TimelineEvent[];

  const getIcon = (time: string) => {
    const tLower = time.toLowerCase();
    if (tLower.includes('4:00') || tLower.includes('aube')) return <Moon className="w-5 h-5" />;
    if (tLower.includes('matin')) return <Sun className="w-5 h-5" />;
    if (tLower.includes('midi') || tLower.includes('ظهيرة')) return <Sun className="w-5 h-5 text-yellow-500" />;
    if (tLower.includes('soir') || tLower.includes('مساء')) return <Sunset className="w-5 h-5 text-orange-400" />;
    if (tLower.includes('fin') || tLower.includes('نهاية') || tLower.includes('فاجعة')) return <Skull className="w-5 h-5 text-rose-500" />;
    return <Clock className="w-5 h-5 text-purple-400" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto py-12 px-4"
    >
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient text-shadow-glow">
          {t('timeline.title')}
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed italic">
          {t('timeline.subtitle')}
        </p>
      </div>

      <div className="relative">
        {/* Central Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-rose-600 rounded-full opacity-30 blur-[1px]" />
        
        <div className="space-y-16">
          {Array.isArray(events) && events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`relative flex items-center justify-between gap-8 md:gap-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content Card */}
              <div className="w-full md:w-[45%]">
                <div className="glass card-hover p-8 rounded-[2rem] border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-widest border border-purple-500/20">
                      {event.time}
                    </span>
                    {getIcon(event.time)}
                  </div>

                  <h3 className={`text-2xl font-black text-white mb-4 ${i18n.language === 'ar' ? 'font-serif' : ''}`}>
                    {event.title}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed font-medium">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Dot on the line */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10" />
                <div className="absolute w-8 h-8 rounded-full bg-purple-500/30 animate-ping" />
              </div>

              {/* Empty Space for layout */}
              <div className="hidden md:block w-[45%]" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-20 text-center">
         <div className="inline-flex items-center gap-3 px-8 py-4 glass rounded-2xl border border-white/5">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <p className="text-sm font-bold text-slate-300">
               {i18n.language === 'ar' 
                 ? 'المأساة تتبع قدرها المحتوم، ولا مفر من النهاية.' 
                 : 'La tragédie suit son cours, l’issue est fatale.'}
            </p>
         </div>
      </div>
    </motion.div>
  );
};

export default Timeline;
