// RUTA: src/components/ui/LanguageTabs.js (CORREGIDO)
'use client';

// La única línea que cambia es esta: importamos 'React' además de 'useState'.
import React, { useState } from 'react';

export default function LanguageTabs({ children }) {
  const [activeLang, setActiveLang] = useState('en');

  const getTabClasses = (lang) => 
    `px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
      activeLang === lang 
        ? 'bg-accent-primary text-dark-text' 
        : 'text-dark-text-muted hover:bg-dark-surface'
    }`;

  // Ahora, React.Children está definido y esta línea funcionará.
  const childrenArray = React.Children.toArray(children);
  const content = {
    en: childrenArray.find(child => child.props.lang === 'en'),
    es: childrenArray.find(child => child.props.lang === 'es')
  };

  return (
    <div>
      <div className="flex items-center space-x-2 border-b border-dark-border mb-4">
        <button type="button" onClick={() => setActiveLang('en')} className={getTabClasses('en')}>
          English
        </button>
        <button type="button" onClick={() => setActiveLang('es')} className={getTabClasses('es')}>
          Español
        </button>
      </div>
      <div>
        {activeLang === 'en' && content.en}
        {activeLang === 'es' && content.es}
      </div>
    </div>
  );
}