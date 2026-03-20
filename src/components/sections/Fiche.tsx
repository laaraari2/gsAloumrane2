import React from 'react';
import { motion } from 'framer-motion';
import { useBook } from '../../hooks/useBook';
import { BookCopy, Users, Waypoints, Milestone } from 'lucide-react';
import BookmarkButton from '../BookmarkButton';

const Section: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20"
  >
    <div className="flex items-start gap-4 mb-4">
      <div className="bg-purple-500/20 p-3 rounded-lg mt-1">
        <Icon className="w-6 h-6 text-purple-400" />
      </div>
      <h3 className="text-2xl font-serif font-bold text-purple-300">{title}</h3>
    </div>
    <div className="space-y-3 ps-4">{children}</div>
  </motion.div>
);

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="grid grid-cols-3 gap-2 text-sm">
    <dt className="text-slate-400 font-semibold col-span-1">{label}</dt>
    <dd className="text-slate-200 col-span-2">{value}</dd>
  </div>
);

const Fiche: React.FC = () => {
  const { t } = useBook();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12 relative">
        <div className="absolute top-0 right-0">
          <BookmarkButton section="fiche" title={t('navigation.fiche')} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {t('fiche.title')}
        </h2>
        <p className="text-slate-400">{t('fiche.subtitle')}</p>
      </div>

      <div className="space-y-8">
        <Section title={t('fiche.identity.title')} icon={BookCopy}>
          <dl className="space-y-2">
            <InfoRow label={t('fiche.identity.author')} value={t('fiche.identity.author_value')} />
            <InfoRow label={t('fiche.identity.full_title')} value={t('fiche.identity.full_title_value')} />
            <InfoRow label={t('fiche.identity.genre')} value={t('fiche.identity.genre_value')} />
            <InfoRow label={t('fiche.identity.date')} value={t('fiche.identity.date_value')} />
            <InfoRow label={t('fiche.identity.first_perf')} value={t('fiche.identity.first_perf_value')} />
          </dl>
        </Section>

        <Section title={t('fiche.characters_section.title')} icon={Users}>
          <ul className="list-disc list-inside text-slate-300 space-y-2 text-sm">
            {Object.entries(t('fiche.characters_section', { returnObjects: true }) as Record<string, string>).map(([k, v]) => {
                if (k === 'title') return null;
                return <li key={k}>{v}</li>;
            })}
          </ul>
        </Section>

        <Section title={t('fiche.schema.title')} icon={Waypoints}>
          <ul className="list-decimal list-inside text-slate-300 space-y-2 text-sm">
            {['prologue', 'element', 'peripeties', 'denouement', 'final'].map((step) => {
              const val = t(`fiche.schema.${step}`);
              if (!val) return null;
              const [label, ...rest] = val.split(':');
              return (
                <li key={step}>
                  <strong className="text-purple-300 me-2">{label}:</strong> {rest.join(':')}
                </li>
              );
            })}
          </ul>
        </Section>
        
        <Section title={t('fiche.themes_section.title')} icon={Milestone}>
            <p className="text-slate-300 text-sm">{t('fiche.themes_section.items')}</p>
        </Section>
      </div>
    </motion.div>
  );
};

export default Fiche;
