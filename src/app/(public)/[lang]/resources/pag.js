// RUTA: src/app/(public)/[lang]/resources/page.js

import { getDictionary } from '@/lib/dictionaries';

export async function generateMetadata({ params: { lang } }) {
  const dict = await getDictionary(lang);
  const title = lang === 'es' ? 'Recursos y Tips | WG Labor LLC' : 'Resources and Tips | WG Labor LLC';
  const description = lang === 'es' 
    ? 'Consejos y recursos para candidatos para mejorar su búsqueda de empleo y desarrollo profesional.' 
    : 'Advice and resources for candidates to improve their job search and professional development.';
  
  return { title, description };
}

export default async function ResourcesPage({ params: { lang } }) {
  const dict = await getDictionary(lang);

  const pageContent = {
    es: {
      title: "Recursos para Impulsar su Carrera",
      description: "Aquí encontrará artículos, guías y consejos prácticos para cada etapa de su búsqueda de empleo. Desde la optimización de su CV hasta la preparación para entrevistas, estamos aquí para ayudarle a alcanzar sus metas profesionales."
    },
    en: {
      title: "Resources to Boost Your Career",
      description: "Here you will find articles, guides, and practical tips for every stage of your job search. From optimizing your resume to preparing for interviews, we are here to help you achieve your professional goals."
    }
  }

  const content = pageContent[lang] || pageContent['es'];

  return (
    <div className="max-w-4xl mx-auto py-20 px-8 text-center">
      <h1 className="text-4xl lg:text-5xl font-extrabold text-dark-text mb-4">
        {content.title}
      </h1>
      <p className="text-lg text-dark-text-muted mb-8">
        {content.description}
      </p>
      <div className="bg-dark-surface p-8 rounded-lg border border-dark-border mt-12">
        <p className="text-dark-text-muted">Próximamente: Listado de artículos y guías.</p>
      </div>
    </div>
  );
}