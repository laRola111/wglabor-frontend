// src/lib/dictionaries.js
import { dictionary as esDict } from '../dictionaries/es.js';
import { dictionary as enDict } from '../dictionaries/en.js';

const dictionaries = {
  en: () => Promise.resolve(enDict),
  es: () => Promise.resolve(esDict),
};

export const getDictionary = async (lang) => {
  // Si el idioma no existe, usamos español como predeterminado.
  const loader = dictionaries[lang] || dictionaries.es;
  return loader();
};