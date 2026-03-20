import React from 'react';
import { useTranslation } from 'react-i18next';
import { getSettings, saveSettings } from '../lib/storage';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    const settings = getSettings();
    saveSettings({ ...settings, language: lng as 'ar' | 'fr' });
    document.documentElement.lang = lng;
    document.documentElement.dir = i18n.dir(lng);
  };

  const languages = [
    { code: 'fr', name: t('lang.fr') },
    { code: 'ar', name: t('lang.ar') },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1 glass-dark rounded-xl">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 ${
            i18n.language === lang.code
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
