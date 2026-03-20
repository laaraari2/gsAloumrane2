import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';
import { BookOpen, GraduationCap, ArrowRight, Info, HelpCircle } from 'lucide-react';

const Hub: React.FC = () => {
  const { i18n } = useTranslation();
  const { t } = useBook();
  const navigate = useNavigate();

  const works = [
    {
      id: 'boite',
      title: t('hub.works.boite.title'),
      author: t('hub.works.boite.author'),
      description: t('hub.works.boite.description'),
      image: '/gsAloumrane2/boite-cover.png',
      color: 'from-amber-500 to-orange-600',
      locked: false
    },
    {
      id: 'antigone',
      title: t('hub.works.antigone.title'),
      author: t('hub.works.antigone.author'),
      description: t('hub.works.antigone.description'),
      image: '/gsAloumrane2/antigone-cover.png',
      color: 'from-purple-500 to-indigo-600',
      locked: false
    },
    {
      id: 'condamne',
      title: t('hub.works.condamne.title'),
      author: t('hub.works.condamne.author'),
      description: t('hub.works.condamne.description'),
      image: '/gsAloumrane2/condamne-cover.png',
      color: 'from-blue-500 to-slate-700',
      locked: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden pt-20">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/30 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <GraduationCap className="w-5 h-5 text-purple-400" />
            <span className="text-[10px] md:text-sm font-bold text-slate-300 tracking-widest uppercase">
              1Bac Maroc - الامتحان الجهوي
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 text-gradient text-shadow-glow leading-tight">
            {t('hub.title')}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t('hub.subtitle')}
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => navigate('/guide')}
              className="flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-purple-500/25 active:scale-95"
            >
              <HelpCircle className="w-5 h-5" />
              {t('guide.button')}
            </button>
            <button
              onClick={() => navigate('/antigone/about')}
              className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl font-black uppercase tracking-widest border border-white/10 transition-all active:scale-95"
            >
              <Info className="w-5 h-5" />
              {t('navigation.about')}
            </button>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto pb-20 items-stretch">
          {works.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`group relative glass rounded-[2.5rem] overflow-hidden border border-white/10 cursor-pointer flex flex-col h-full ${work.locked ? 'opacity-80' : ''}`}
              onClick={() => !work.locked && navigate(`/${work.id}`)}
            >
              <div className="aspect-[3/4] overflow-hidden relative shrink-0">
                <img 
                  src={work.image} 
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                
                {work.locked && (
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl">
                      <span className="text-white font-black uppercase tracking-widest text-sm italic">Coming Soon / قريباً</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8 relative flex flex-col flex-grow">
                <div className={`absolute top-0 inset-inline-start-8 -translate-y-1/2 w-12 h-1.5 rounded-full bg-gradient-to-r ${work.color}`} />
                
                <div className="flex justify-between items-start mb-4">
                  <div className="text-start">
                    <h3 className={`text-3xl font-black text-white mb-1 ${i18n.language === 'ar' ? 'font-arabic' : ''}`}>
                      {work.title}
                    </h3>
                    <p className="text-purple-400 font-bold text-sm tracking-wide">
                      {work.author}
                    </p>
                  </div>
                  <BookOpen className="w-6 h-6 text-slate-500 shrink-0 mt-1" />
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3 text-start flex-grow">
                  {work.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${work.locked ? 'text-slate-600' : 'text-purple-500'}`}>
                    {work.locked ? (i18n.language === 'ar' ? 'قيد التحضير' : 'En préparation') : (i18n.language === 'ar' ? 'متاح الآن' : 'Disponible maintenant')}
                  </span>
                  {!work.locked && (
                    <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500 transition-colors ${i18n.language === 'ar' ? 'rotate-180' : ''}`}>
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hub;
