import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';
import { Search as SearchIcon, FileText, Users, Lightbulb, Quote, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  type: 'character' | 'theme' | 'quote' | 'section';
  title: string;
  content: string;
  url: string;
  icon: React.ElementType;
}

const Search: React.FC = () => {
  const { i18n } = useTranslation();
  const { t } = useBook();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const searchData = useMemo(() => {
    const data: SearchResult[] = [];

    // Characters
    const characterKeys = ['antigone', 'creon', 'ismene', 'hemon', 'choeur', 'gardes', 'nurse', 'messenger', 'eurydice', 'page'];
    characterKeys.forEach((key) => {
      data.push({
        type: 'character',
        title: t(`characters.${key}.name`),
        content: t(`characters.${key}.description`),
        url: '/personnages',
        icon: Users,
      });
    });

    // Themes
    const themeKeys = ['revolte', 'bonheur', 'enfance', 'fatalite', 'solitude', 'politique'];
    themeKeys.forEach((key) => {
      data.push({
        type: 'theme',
        title: t(`themes.${key}.title`),
        content: t(`themes.${key}.description`),
        url: '/themes',
        icon: Lightbulb,
      });
    });

    // Quotes
    const quoteKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];
    quoteKeys.forEach((key) => {
      data.push({
        type: 'quote',
        title: t(`quotes.${key}.speaker`),
        content: t(`quotes.${key}.text`),
        url: '/citations',
        icon: Quote,
      });
    });

    // Sections
    const sections = [
      { key: 'home', label: t('navigation.home'), url: '/', icon: BookOpen },
      { key: 'oeuvre', label: t('navigation.oeuvre'), url: '/oeuvre', icon: BookOpen },
      { key: 'fiche', label: t('navigation.fiche'), url: '/fiche', icon: FileText },
      { key: 'comparison', label: t('navigation.comparison'), url: '/comparison', icon: FileText },
      { key: 'glossary', label: t('navigation.glossary'), url: '/glossary', icon: FileText },
    ];

    sections.forEach((section) => {
      data.push({
        type: 'section',
        title: section.label,
        content: '',
        url: section.url,
        icon: section.icon,
      });
    });

    return data;
  }, [t]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim().length < 2) {
      setResults([]);
      return;
    }

    const lowerTerm = term.toLowerCase();
    const filtered = searchData.filter((item) => {
      return (
        item.title.toLowerCase().includes(lowerTerm) ||
        item.content.toLowerCase().includes(lowerTerm)
      );
    });

    setResults(filtered);
  };

  const handleResultClick = (url: string) => {
    navigate(url);
    setSearchTerm('');
    setResults([]);
  };

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      character: t('search.character'),
      theme: t('search.theme'),
      quote: t('search.quote'),
      section: t('search.section'),
    };
    return labels[type] || type;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {t('search.title')}
        </h2>
        <p className="text-slate-400">{t('search.subtitle')}</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400" />
        <input
          type="text"
          placeholder={t('search.placeholder')}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-14 py-4 text-white placeholder-slate-400 focus:ring-purple-500 focus:border-purple-500 transition text-lg"
          autoFocus
        />
      </div>

      {/* Results */}
      <AnimatePresence>
        {searchTerm.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3"
          >
            {results.length > 0 ? (
              <>
                <p className="text-sm text-slate-400 mb-4">
                  {t('search.results_count', { count: results.length })}
                </p>
                {results.map((result, index) => {
                  const Icon = result.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleResultClick(result.url)}
                      className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-5 backdrop-blur-sm border border-purple-500/20 cursor-pointer hover:border-purple-400/40 transition"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-500/20 p-3 rounded-lg">
                          <Icon className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-purple-300">{result.title}</h3>
                            <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded">
                              {getTypeLabel(result.type)}
                            </span>
                          </div>
                          {result.content && (
                            <p className="text-slate-300 text-sm line-clamp-2">{result.content}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </>
            ) : (
              <div className="text-center py-12">
                <SearchIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">{t('search.no_results')}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {searchTerm.length < 2 && (
        <div className="text-center py-12">
          <SearchIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">{t('search.start_typing')}</p>
        </div>
      )}
    </motion.div>
  );
};

export default Search;

