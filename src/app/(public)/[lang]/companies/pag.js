// RUTA: src/app/(public)/[lang]/companies/page.js

import { getDictionary } from '@/lib/dictionaries';

export async function generateMetadata({ params: { lang } }) {
  const dict = await getDictionary(lang);
  // Usaremos claves del diccionario para el metadata en el futuro.
  // Por ahora, valores estáticos.
  const title = lang === 'es' ? 'Para Empresas | WG Labor LLC' : 'For Companies | WG Labor LLC';
  const description = lang === 'es' 
    ? 'Descubra cómo podemos ayudarle a encontrar el talento calificado que su empresa necesita.' 
    : 'Discover how we can help you find the qualified talent your company needs.';
  
  return { title, description };
}

export default async function CompaniesPage({ params: { lang } }) {
  const dict = await getDictionary(lang);

  // Textos placeholder mientras definimos el contenido final.
  const pageContent = {
    es: {
      title: "Soluciones de Personal para su Empresa",
      subtitle: "Encuentre el talento adecuado, en el momento adecuado.",
      description: "En WG Labor, entendemos que el éxito de su empresa depende de tener el equipo correcto. Nos especializamos en conectar a compañías líderes con profesionales calificados y listos para trabajar en roles temporales y permanentes. Nuestro riguroso proceso de selección asegura que cada candidato no solo cumpla con los requisitos técnicos, sino que también se alinee con la cultura de su empresa."
    },
    en: {
      title: "Staffing Solutions for Your Company",
      subtitle: "Find the right talent, at the right time.",
      description: "At WG Labor, we understand that your company's success depends on having the right team. We specialize in connecting leading companies with qualified professionals ready to work in temporary and permanent roles. Our rigorous selection process ensures that each candidate not only meets the technical requirements but also aligns with your company's culture."
    }
  }

  const content = pageContent[lang] || pageContent['es'];

  return (
    <div className="max-w-4xl mx-auto py-20 px-8 text-center">
      <h1 className="text-4xl lg:text-5xl font-extrabold text-dark-text mb-4">
        {content.title}
      </h1>
      <p className="text-lg text-accent-primary mb-8">
        {content.subtitle}
      </p>
      <div className="prose prose-invert text-left max-w-none mx-auto text-dark-text-muted">
        <p>{content.description}</p>
        <p>Próximamente: Detalles sobre nuestros servicios, industrias que cubrimos y el formulario de contacto para empresas.</p>
      </div>
    </div>
  );
}