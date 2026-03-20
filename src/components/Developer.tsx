import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Github, Globe, Award, ShieldCheck, MapPin, Code2 } from 'lucide-react';

const Developer: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="py-24 px-4">
      <motion.div 
        className="max-w-5xl mx-auto glass rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative group"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient-x" />
        
        <div className="md:flex">
          {/* Portfolio Image Area */}
          <div className="md:w-2/5 bg-slate-950/80 p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent pointer-events-none" />
            
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative w-48 h-48 rounded-3xl overflow-hidden mb-10 shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-[1.4rem] bg-slate-900 flex items-center justify-center overflow-hidden">
                   <Code2 className="w-20 h-20 text-white/20 absolute" />
                   {/* Placeholder for real photo if available, otherwise high-end icon */}
                   <div className="text-6xl font-black text-white bg-gradient-to-br from-purple-500 to-pink-500 w-full h-full flex items-center justify-center">
                    ML
                   </div>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col items-center gap-4 relative z-10">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                  {t('developer.badge')}
                </span>
              </div>
              
              <h3 className="text-3xl font-black text-white text-center tracking-tighter">
                {i18n.language === 'ar' ? 'مصطفى لعراري' : 'Mustapha Laaraari'}
              </h3>
              
              <div className="h-1 w-12 bg-purple-500/50 rounded-full" />
              
              <p className="text-slate-500 text-xs font-black text-center uppercase tracking-[0.3em]">
                {t('developer.role')}
              </p>
            </div>
          </div>

          {/* Content Area */}
          <div className="md:w-3/5 p-12 md:p-16 flex flex-col justify-center">
            <div className="mb-12">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-purple-400 block mb-3 opacity-80">
                {t('developer.subtitle')}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-none">
                {t('developer.title')}
              </h2>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 relative group/quote">
                <p className="text-slate-300 font-medium leading-relaxed text-lg italic">
                  "{t('developer.description')}"
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Experience</p>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-purple-400" />
                  <span className="text-lg font-black text-white">{t('developer.stats.experience')}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Projects</p>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-pink-400" />
                  <span className="text-lg font-black text-white">{t('developer.stats.projects')}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Location</p>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-yellow-400" />
                  <span className="text-lg font-black text-white">{t('developer.stats.location')}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-5 pt-10 border-t border-white/10">
              <motion.button 
                whileHover={{ y: -3 }}
                className="flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-black text-white transition-all uppercase tracking-widest"
              >
                <Github className="w-5 h-5" /> Github
              </motion.button>
              <motion.button 
                whileHover={{ y: -3 }}
                className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl shadow-purple-900/20 rounded-2xl text-sm font-black text-white border border-white/10 transition-all uppercase tracking-widest"
              >
                <Globe className="w-5 h-5" /> Portfolio
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Developer;
