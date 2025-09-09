import { Suspense } from 'react';
import Link from 'next/link';

// Este es un ejemplo para probar la configuración
// En el futuro, usaremos una lógica más robusta para obtener el diccionario
import { dictionary as esDict } from '../../../dictionaries/es.js';
import { dictionary as enDict } from '../../../dictionaries/en.js';

// Función para obtener el diccionario basado en la URL
async function getDictionary(lang) {
  if (lang === 'en') {
    return enDict;
  }
  return esDict;
}

// Función que genera metadatos dinámicos
export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang);
  
  return {
    title: dict.home.heroTitle + ' | WG Labor LLC',
    description: dict.home.heroSubtitle,
  };
}

export default async function Home({ params }) {
  const dict = await getDictionary(params.lang);

  return (
    <div className="bg-dark-background text-dark-text min-h-screen">
      {/* <header className="py-4 px-8 border-b border-dark-surface">
        <nav className="flex justify-between items-center">
          <span className="text-xl font-bold">WGLABOR LLC</span>
          <div className="flex items-center space-x-4">
            <Link href="/en" className="text-dark-text-muted hover:underline">
              English
            </Link>
            <Link href="/es" className="text-dark-text-muted hover:underline">
              Español
            </Link>
            <button className="bg-accent-primary text-white py-2 px-4 rounded-lg hover:bg-accent-hover transition-colors">
              Login / Registrarse
            </button>
          </div>
        </nav>
      </header> */}

      <main className="py-24 px-8 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-white leading-tight mb-4">
          {dict.home.heroTitle}
        </h1>
        <p className="text-lg text-dark-text-muted mb-8">
          {dict.home.heroSubtitle}
        </p>
        <div className="bg-dark-surface rounded-xl p-4 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder={dict.home.searchPlaceholder}
            className="bg-dark-background text-dark-text px-4 py-3 rounded-lg flex-1 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-accent-primary"
          />
          <input
            type="text"
            placeholder={dict.home.locationPlaceholder}
            className="bg-dark-background text-dark-text px-4 py-3 rounded-lg flex-1 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-accent-primary"
          />
          <button className="bg-accent-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-accent-hover transition-colors w-full sm:w-auto">
            {dict.home.searchButton}
          </button>
        </div>
        <div className="mt-4 text-dark-text-muted text-sm">
          <span>Looking for a job? </span>
          <Link href="#" className="underline hover:no-underline">
            View all openings
          </Link>
          <span className="ml-4">Need talent? </span>
          <Link href="#" className="underline hover:no-underline">
            Post a job
          </Link>
        </div>
      </main>

      <footer className="text-center text-dark-text-muted text-sm py-4">
        © 2024 WGLABOR LLC. All rights reserved.
      </footer>
    </div>
  );
}