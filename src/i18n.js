import i18next from 'i18next';
import en from './locales/en.js';
import ru from './locales/ru.js';

i18next.init({
  lng: navigator.language,
  fallbackLng: 'en',
  debug: false,
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
});

const i18nInstance = i18next;
export default i18nInstance;
