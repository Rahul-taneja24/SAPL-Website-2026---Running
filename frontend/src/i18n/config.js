/**
 * Multi-Language Configuration for SAPL Website
 * Supports: English, Hindi, Spanish, Arabic, French, German, Chinese, Japanese
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en.json';
import hiTranslations from './locales/hi.json';
import esTranslations from './locales/es.json';
import arTranslations from './locales/ar.json';
import frTranslations from './locales/fr.json';
import deTranslations from './locales/de.json';
import zhTranslations from './locales/zh.json';
import jaTranslations from './locales/ja.json';

const resources = {
  en: { translation: enTranslations },
  hi: { translation: hiTranslations },
  es: { translation: esTranslations },
  ar: { translation: arTranslations },
  fr: { translation: frTranslations },
  de: { translation: deTranslations },
  zh: { translation: zhTranslations },
  ja: { translation: jaTranslations }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lang',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie']
    },
    
    interpolation: {
      escapeValue: false // React already escapes values
    },
    
    react: {
      useSuspense: false
    }
  });

export default i18n;

// Supported languages configuration
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr', active: true },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', dir: 'ltr', active: true },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', dir: 'ltr', active: false },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', dir: 'rtl', active: false },
  { code: 'fr', name: 'French', flag: '🇫🇷', dir: 'ltr', active: false },
  { code: 'de', name: 'German', flag: '🇩🇪', dir: 'ltr', active: false },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', dir: 'ltr', active: false },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', dir: 'ltr', active: false }
];

// Language switcher component helper
export const getActiveLanguages = () => {
  return SUPPORTED_LANGUAGES.filter(lang => lang.active);
};

// Get language by code
export const getLanguageByCode = (code) => {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code);
};

// Check if language is RTL
export const isRTL = (code) => {
  const lang = getLanguageByCode(code);
  return lang ? lang.dir === 'rtl' : false;
};
