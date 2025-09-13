// RUTA: src/app/(public)/[lang]/[slug]/page.js (VERSIÓN FINAL)

import { notFound } from 'next/navigation';
import { getLegalDocument } from '@/lib/supabase/queries';
import AnimatedSection from '@/components/ui/AnimatedSection';

// Generamos los metadatos dinámicamente
export async function generateMetadata({ params: { lang, slug } }) {
  const doc = await getLegalDocument(slug, lang);
  return {
    title: doc ? `${doc.title} | WG Labor LLC` : 'Documento no encontrado',
  };
}

export default async function LegalDocumentPage({ params: { lang, slug } }) {
  const doc = await getLegalDocument(slug, lang);

  if (!doc) {
    notFound();
  }

  return (
    <AnimatedSection>
      <div className="max-w-4xl mx-auto py-20 px-8">
        <h1 className="text-4xl font-extrabold text-dark-text mb-8 border-b border-dark-border pb-4">
          {doc.title}
        </h1>
        
        {/*
          AHORA QUE SABEMOS QUE `doc.content` LLEGA CORRECTAMENTE,
          ESTE DIV LO RENDERIZARÁ COMO HTML Y LE APLICARÁ LOS ESTILOS
          DE TIPOGRAFÍA PROFESIONALES DE LA CLASE `prose`.
        */}
        <div
          className="prose prose-invert lg:prose-lg max-w-none text-dark-text-muted 
                     prose-headings:text-dark-text prose-strong:text-dark-text
                     prose-a:text-accent-primary hover:prose-a:text-accent-hover"
          dangerouslySetInnerHTML={{ __html: doc.content }}
        />
      </div>
    </AnimatedSection>
  );
}