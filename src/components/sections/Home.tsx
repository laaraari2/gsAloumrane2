import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';
import { Sparkles, Quote, Theater, ArrowLeft } from 'lucide-react';
import BookmarkButton from '../BookmarkButton';
import hero from '../../images/hero.svg';

import Countdown from '../Countdown';

const Home: React.FC = () => {
  const { i18n } = useTranslation();
  const { t, bookId } = useBook();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="max-w-6xl mx-auto space-y-12"
    >
      {/* Navigation Header for Book */}
      <div className="flex items-center justify-between mb-8">
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 px-5 py-2.5 rounded-2xl glass border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all group"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className={`w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform ${i18n.language === 'ar' ? 'rotate-180' : ''}`} />
          <span className="font-bold tracking-wide uppercase text-xs">
            {i18n.language === 'ar' ? 'العودة للبواية' : 'Retour au Portail'}
          </span>
        </motion.button>
        
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/20">
          <Theater className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-black text-purple-300 uppercase tracking-widest">
            {t(`hub.works.${bookId}.title`)}
          </span>
        </div>
      </div>
      {/* Hero Section */}
      <motion.div
        className="glass rounded-3rem overflow-hidden shadow-2xl relative group border border-white/10"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute top-8 right-8 z-10">
          <BookmarkButton section="home" title={t('navigation.home')} />
        </div>
        
        <div className="lg:flex">
          <div className="lg:w-2/5 relative h-[300px] lg:h-auto overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
            <motion.div 
               className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 z-1"
               animate={{ opacity: [0.1, 0.3, 0.1] }}
               transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              src={`/gsAloumrane2/${bookId}-cover.png`}
              alt={bookId}
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = hero as unknown as string;
              }}
            />
          </div>
          
          <div className="p-10 lg:p-16 lg:w-3/5 flex flex-col justify-center relative bg-gradient-to-br from-white/[0.03] to-transparent">
            <motion.div 
              className="flex items-start gap-6 mb-8"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-orange-400/10 border border-yellow-400/20">
                <Sparkles className="w-10 h-10 text-yellow-400 shadow-glow" />
              </div>
              <div className="flex-1">
                <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tighter">
                  <span className="text-gradient text-shadow-glow uppercase">{t('home.title')}</span>
                </h2>
                
                <div className="space-y-6 text-slate-300 text-lg md:text-xl leading-relaxed font-medium">
                  <p className="border-l-4 border-purple-500/50 pl-6 py-2 bg-white/5 rounded-r-xl">
                    {t('home.p1_part1')} <strong className="text-purple-400 font-black">{t('home.p1_part2')}</strong> {t('home.p1_part3')}
                  </p>
                  <p className="border-l-4 border-pink-500/50 pl-6 py-2 bg-white/5 rounded-r-xl">
                    {t('home.p2_part1')} <strong className="text-pink-400 font-black">{t('home.p2_part2')}</strong>{t('home.p2_part3')}
                  </p>
                  <p className="border-l-4 border-yellow-500/50 pl-6 py-2 bg-white/5 rounded-r-xl">
                    {t('home.p3_part1')} <strong className="text-yellow-400 font-black">{t('home.p3_part2')}</strong> {t('home.p3_part3')} <strong className="text-purple-400 font-black">{t('home.p3_part4')}</strong> {t('home.p3_part5')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Countdown />

      {/* Featured Quote or Call to Action */}
      <motion.div 
        className="grid md:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="glass p-10 rounded-3rem border border-white/10 flex flex-col justify-center text-center items-center">
            <Quote className="w-12 h-12 text-purple-400 mb-6 opacity-30" />
            <p className="text-2xl font-black text-white italic leading-tight mb-4">
                "C'est propre, la tragédie. C'est reposant, c'est certain..."
            </p>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">— Le Chœur</span>
        </div>
        <div className="glass p-10 rounded-3rem border border-white/10 flex flex-col justify-center text-center items-center">
             <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center mb-6">
                <Theater className="w-8 h-8 text-pink-400" />
             </div>
             <h4 className="text-xl font-black text-white mb-2 uppercase tracking-widest">{t('navigation.exam_simulator')}</h4>
             <p className="text-slate-400 text-sm font-medium mb-6">{i18n.language === 'ar' ? 'اختبر مستواك الحقيقي مع محاكي الامتحان الجهوي الجديد.' : 'Testez votre niveau réel avec notre nouveau simulateur.'}</p>
             <button 
                onClick={() => navigate(`/${bookId}/exam-simulator`)}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white font-black uppercase tracking-widest text-xs hover:shadow-glow transition-all"
            >
                {i18n.language === 'ar' ? 'ابدأ المحاكاة' : 'Démarrer'}
            </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
