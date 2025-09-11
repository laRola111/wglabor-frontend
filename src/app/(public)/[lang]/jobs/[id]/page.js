// src/app/(public)/[lang]/jobs/[id]/page.js
import { notFound } from 'next/navigation';
import { getJobById } from '@/lib/supabase/queries';
import JobDetailClient from '@/components/organisms/JobDetailClient'; // Importamos el componente de presentación

// Esta función se encarga de los metadatos de la página para SEO
export async function generateMetadata({ params: paramsPromise }) {
  const { lang, id } = await paramsPromise;
  const job = await getJobById(id, lang);

  if (!job) {
    return {
      title: 'Empleo no encontrado'
    }
  }

  return {
    title: `${job.title} | ${job.companies?.name || ''}`,
    description: job.description.substring(0, 160)
  }
}

// Este es el Componente de Servidor. Su única tarea es obtener datos.
export default async function JobDetailPage({ params: paramsPromise }) {
  const { lang, id } = await paramsPromise;
  const job = await getJobById(id, lang);

  // Si no se encuentra el trabajo, la función notFound detiene el renderizado
  if (!job) {
    notFound();
  }

  // Una vez obtenidos los datos, se los pasamos al componente de cliente para que los renderice.
  return <JobDetailClient job={job} lang={lang} />;
}