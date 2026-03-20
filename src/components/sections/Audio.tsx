import React from 'react';
import { motion } from 'framer-motion';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';
import { Ear, Music, Info } from 'lucide-react';

const Audio: React.FC = () => {
  const { t } = useBook();
  const audioClips = t('audio.clips', { returnObjects: true }) as { title: string; description: string; speaker: string; src: string }[];

  // try to load localized scenes from i18n; fall back to built-in French summaries
  const scenesFromLocale = t('audio.scenes', { returnObjects: true }) as Array<{ title?: string; summary?: string; text_placeholder?: string }> | null;

  const fallbackScenes = [
    { title: 'SCÈNE 1 — Le Prologue', summary: 'Présentation de tous les personnages, annonce de leurs destins, mise en place de la tragédie.' },
    { title: 'SCÈNE 2 — Antigone et la Nourrice', summary: "Retour d’Antigone à l’aube, premiers indices de son acte, dialogue intime avec la nourrice." },
    { title: 'SCÈNE 3 — Antigone et Ismène', summary: "Ismène tente de dissuader Antigone. Antigone révèle qu’elle a déjà enterré Polynice." },
    { title: 'SCÈNE 4 — Créon et le Garde', summary: 'Le garde décrit la découverte du corps recouvert de terre. Créon double la garde et menace les soldats.' },
    { title: 'SCÈNE 5 — Intervention du Chœur', summary: 'Réflexion sur la tragédie, son mécanisme, son irréversibilité.' },
    { title: 'SCÈNE 6 — Arrestation d’Antigone', summary: 'Antigone est surprise près du cadavre, en train de recommencer l’ensevelissement.' },
    { title: 'SCÈNE 7 — Créon / Antigone', summary: 'Long duel verbal. Créon révèle la vérité sur les deux frères. Antigone refuse toute compromission.' },
    { title: 'SCÈNE 8 — Créon et Hémon', summary: "Hémon supplie son père de sauver Antigone. La dispute éclate, Hémon quitte son père." },
    { title: 'SCÈNE 9 — Antigone / Garde (avant la mort)', summary: 'Antigone seule avec un garde. Elle lui confie une lettre contre un anneau. Moment d’humanité.' },
    { title: 'SCÈNE 10 — Chœur & Messager', summary: 'Annonce de la mort d’Antigone et du suicide d’Hémon.' },
    { title: 'SCÈNE 11 — Dénouement', summary: "Créon écrasé par les événements. Le Chœur clôt la pièce en rappelant l’indifférence des gardes." },
  ];

  const scenes = Array.isArray(scenesFromLocale) && scenesFromLocale.length > 0 ? scenesFromLocale.map(s => ({ title: s.title || '', summary: s.summary || '', text_placeholder: s.text_placeholder })) : fallbackScenes;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {t('audio.title')}
        </h2>
        <p className="text-slate-400">{t('audio.subtitle')}</p>
      </div>

      <div className="bg-green-900/20 border border-green-500/30 text-green-200 px-4 py-3 rounded-lg relative mb-8 flex items-start gap-3" role="alert">
        <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div>
            <strong className="font-bold">{t('audio.placeholder_title')}</strong>
            <span className="block sm:inline"> {t('audio.placeholder_text')}</span>
        </div>
      </div>

      <div className="space-y-6">
        {scenes.map((scene, index) => {
          const clip = audioClips && audioClips[index] ? audioClips[index] : null;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-5 backdrop-blur-sm border border-purple-500/20"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <Music className="w-6 h-6 text-purple-300" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold font-serif text-purple-300">{scene.title}</h3>
                  <p className="text-sm text-slate-300 mb-3">{scene.summary}</p>

                  {clip ? (
                    <>
                      <p className="text-sm text-pink-400 mb-2">{t('audio.speaker_label')} {clip.speaker}</p>
                      <p className="text-sm text-slate-300 mb-4">{clip.description}</p>
                      <audio controls src={clip.src} className="w-full h-10">
                        Your browser does not support the audio element.
                      </audio>
                    </>
                  ) : (
                    <div className="bg-green-900/20 border border-green-500/30 text-green-200 px-3 py-2 rounded-lg relative mt-2 flex items-start gap-2" role="status">
                      <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <strong className="font-bold">{t('audio.placeholder_title')}</strong>
                        <div className="text-xs sm:inline"> {t('audio.placeholder_text')}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Audio;
