import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// French
import commonFr from './locales/fr/common.json';
import antigoneFr from './locales/fr/antigone.json';
import boiteFr from './locales/fr/boite.json';
import condamneFr from './locales/fr/condamne.json';

// Arabic
import commonAr from './locales/ar/common.json';
import antigoneAr from './locales/ar/antigone.json';
import boiteAr from './locales/ar/boite.json';
import condamneAr from './locales/ar/condamne.json';

const resources = {
  fr: {
    translation: {
      ...commonFr,
      antigone: antigoneFr,
      boite: boiteFr,
      condamne: condamneFr,
    },
  },
  ar: {
    translation: {
      ...commonAr,
      antigone: antigoneAr,
      boite: boiteAr,
      condamne: condamneAr,
    },
  },
};

const getInitialLanguage = (): string => {
  try {
    const stored = localStorage.getItem('antigone_settings');
    if (stored) {
      const { language } = JSON.parse(stored);
      return language || 'ar';
    }
  } catch (e) {
    console.error('Failed to load language settings', e);
  }
  return 'ar'; // Default to Arabic
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

