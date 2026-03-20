import React from 'react';
import { motion } from 'framer-motion';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';
import { Network, Users, Lightbulb, GitBranch } from 'lucide-react';

const MindMaps: React.FC = () => {
  const { t } = useBook();
  const maps = t('mindmaps.maps', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    items: string[];
    icon: string;
  }>;

  const iconMap: Record<string, React.ElementType> = {
    characters: Users,
    themes: Lightbulb,
    structure: GitBranch,
    default: Network,
  };

  const gradients = [
    'from-purple-500/20 to-blue-500/20',
    'from-pink-500/20 to-purple-500/20',
    'from-emerald-500/20 to-teal-500/20',
    'from-orange-500/20 to-pink-500/20',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="max-w-7xl mx-auto px-4"
    >
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient text-shadow-glow">
          {t('mindmaps.title')}
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6" />
        <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
          {t('mindmaps.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(maps) &&
          maps.map((map, index) => {
            const Icon = iconMap[map.icon] || iconMap.default;
            const gradient = gradients[index % gradients.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass rounded-[2rem] overflow-hidden border border-white/10 flex flex-col h-full group"
              >
                <div className={`h-3 bg-gradient-to-r ${gradient.replace('/20', '')} opacity-50 group-hover:opacity-100 transition-opacity`} />
                <div className="p-8 flex flex-col h-full">
                  <div className="flex items-center gap-5 mb-8">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} border border-white/5 shadow-inner`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight">{map.title}</h3>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none mt-1">
                        Visualize Concept
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm font-medium mb-8 flex-grow">
                    {map.description}
                  </p>

                  <div className="space-y-3">
                    {Array.isArray(map.items) &&
                      map.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + itemIndex * 0.05 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient.replace('/20', '')} shadow-glow`} />
                          <span className="text-sm font-medium text-slate-300">{item}</span>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
      </div>
    </motion.div>
  );
};

export default MindMaps;

