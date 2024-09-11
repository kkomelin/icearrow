import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    backend: {
      loadPath: (import.meta.env.VITE_BASE_URL || '') + '/locales/{{lng}}.json',
    },

    fallbackLng: import.meta.env.VITE_FALLBACK_LANGUAGE || 'en',
    debug: false,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
    },

    appendNamespaceToMissingKey: true,
    returnNull: false,
  });

export default i18n;
