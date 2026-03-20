import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Users, Quote, ChevronRight, ChevronLeft, Theater, ScrollText } from 'lucide-react';
import { antigoneScenes } from '../../data/antigone_scenes';

const Scenes: React.FC = () => {
  const { i18n } = useTranslation();
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const currentScene = antigoneScenes[currentSceneIndex];

  const nextScene = () => {
    if (currentSceneIndex < antigoneScenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
    }
  };

  const prevScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(currentSceneIndex - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 min-h-[80vh]">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-black mb-4 text-gradient shadow-glow">
          {i18n.language === 'ar' ? 'مشاهد المسرحية' : 'Les Scènes de la Pièce'}
        </h2>
        <p className="text-slate-400 text-lg italic">
          {i18n.language === 'ar' ? 'انغمس في أحداث أنتيجون مشهداً بمشهد' : 'Plongez dans l\'intrigue d\'Antigone scène par scène'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar: Scene List */}
        <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {antigoneScenes.map((scene, index) => (
            <button
              key={scene.id}
              onClick={() => setCurrentSceneIndex(index)}
              className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-3 ${
                currentSceneIndex === index
                  ? 'bg-purple-500/20 border-purple-500/50 text-white shadow-glow'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                currentSceneIndex === index ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-500'
              }`}>
                <span className="text-xs font-black">{scene.id}</span>
              </div>
              <span className={`text-sm font-bold truncate ${i18n.language === 'ar' ? 'font-serif' : ''}`}>
                {i18n.language === 'ar' ? scene.title_ar : scene.title_fr}
              </span>
            </button>
          ))}
        </div>

        {/* Maincontent: Scene Display */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative overflow-hidden h-full flex flex-col"
            >
              {/* Decorative side element */}
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Theater className="w-32 h-32 text-purple-500" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black uppercase tracking-widest shadow-glow">
                    {i18n.language === 'ar' ? `المشهد ${currentScene.id}` : `Scène ${currentScene.id}`}
                  </div>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <h1 className={`text-3xl md:text-5xl font-black text-white mb-8 ${i18n.language === 'ar' ? 'font-serif text-right' : ''}`}>
                  {i18n.language === 'ar' ? currentScene.title_ar : currentScene.title_fr}
                </h1>

                <div className={`space-y-12 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {/* Summary Section */}
                  <section>
                    <div className={`flex items-center gap-3 mb-6 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <ScrollText className="w-6 h-6 text-purple-400" />
                      <h3 className="text-lg font-black uppercase tracking-widest text-slate-300">
                        {i18n.language === 'ar' ? 'ملخص المشهد' : 'Résumé de la Scène'}
                      </h3>
                    </div>
                    <p className={`text-xl leading-relaxed text-slate-300 font-medium ${i18n.language === 'ar' ? 'leading-loose' : ''}`}>
                      {i18n.language === 'ar' ? currentScene.summary_ar : currentScene.summary_fr}
                    </p>
                  </section>

                  {/* Characters Section */}
                  <section>
                    <div className={`flex items-center gap-3 mb-4 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <Users className="w-5 h-5 text-pink-400" />
                      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
                        {i18n.language === 'ar' ? 'الشخصيات' : 'Personnages'}
                      </h3>
                    </div>
                    <div className={`flex flex-wrap gap-2 ${i18n.language === 'ar' ? 'justify-end' : ''}`}>
                      {currentScene.characters.map((char, i) => (
                        <span key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-bold capitalize">
                          {char}
                        </span>
                      ))}
                    </div>
                  </section>

                  {/* Key Quotes Section */}
                  <section className="pt-8 border-t border-white/5">
                    <div className={`flex items-center gap-3 mb-6 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <Quote className="w-5 h-5 text-purple-400" />
                      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
                        {i18n.language === 'ar' ? 'مقتطفات هامة' : 'Paroles Clés'}
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {currentScene.key_quotes.map((quote, i) => (
                        <div key={i} className={`p-6 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 relative group ${i18n.language === 'ar' ? 'text-right' : ''}`}>
                          <div className={`absolute top-0 w-1 h-full bg-purple-500 rounded-full transition-all group-hover:h-full ${i18n.language === 'ar' ? 'right-0' : 'left-0'}`} />
                          <p className={`text-lg italic text-white mb-2 ${i18n.language === 'ar' ? 'font-serif' : ''}`}>
                            "{quote.text}"
                          </p>
                          <span className="text-xs font-black uppercase tracking-widest text-purple-400">
                            — {quote.speaker}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="mt-auto pt-12 flex items-center justify-between gap-4">
                <button
                  onClick={prevScene}
                  disabled={currentSceneIndex === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all ${
                    currentSceneIndex === 0 
                    ? 'opacity-20 cursor-not-allowed text-slate-500' 
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="font-bold text-sm">{i18n.language === 'ar' ? 'المشهد السابق' : 'Scène Précédente'}</span>
                </button>

                <div className="hidden sm:flex items-center gap-1">
                  {antigoneScenes.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === currentSceneIndex ? 'w-8 bg-purple-500 shadow-glow' : 'w-2 bg-white/10'
                      }`} 
                    />
                  ))}
                </div>

                <button
                  onClick={nextScene}
                  disabled={currentSceneIndex === antigoneScenes.length - 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all ${
                    currentSceneIndex === antigoneScenes.length - 1 
                    ? 'opacity-20 cursor-not-allowed text-slate-500' 
                    : 'bg-purple-500 text-white shadow-glow hover:scale-105 active:scale-95'
                  }`}
                >
                  <span className="font-bold text-sm">{i18n.language === 'ar' ? 'المشهد التالي' : 'Scène Suivante'}</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Scenes;
