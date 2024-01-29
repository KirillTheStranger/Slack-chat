import i18next from 'i18next';
import resources from './locales/index.js';

i18next.init({
  lng: 'ru',
  resources,
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
