import i18next from 'i18next';
import en from './locales/en.js';
import ru from './locales/ru.js';

i18next.init({
  lng: navigator.language,
  fallbackLng: 'en',
  debug: true,
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
});

const i18nextInstance = i18next;
export default i18nextInstance;
