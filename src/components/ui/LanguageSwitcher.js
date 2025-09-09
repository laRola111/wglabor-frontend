// src/components/ui/LanguageSwitcher.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  
  // Extrae el segmento de idioma de la URL
  const pathSegments = pathname.split('/');
  const currentLang = pathSegments[1] || 'es'; // 'es' como predeterminado
  
  // Genera la URL para el otro idioma
  const newPath = pathname.replace(`/${currentLang}`, `/${currentLang === 'es' ? 'en' : 'es'}`);
  
  return (
    <div className="flex items-center space-x-2 text-dark-text">
      <Link href={newPath}>
        <span className="text-sm font-semibold text-dark-text-muted hover:text-accent-primary transition-colors">
          {currentLang === 'es' ? 'English' : 'Español'}
        </span>
      </Link>
    </div>
  );
}