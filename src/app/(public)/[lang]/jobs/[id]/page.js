// RUTA: src/app/(public)/[lang]/jobs/[id]/page.js (VERSIÓN MEJORADA)

import { notFound } from 'next/navigation';
import { getJobById } from '@/lib/supabase/queries';
import JobDetailClient from '@/components/organisms/JobDetailClient';

// AJUSTE: Se simplifica la firma. 'params' ya no necesita ser esperado (awaited).
export async function generateMetadata({ params }) {
  const { lang, id } = params;
  const job = await getJobById(id, lang);

  if (!job) {
    return {
      title: 'Empleo no encontrado'
    }
  }

  const description = job.description ? job.description.substring(0, 160) : 'Ver detalles de la oferta.';

  return {
    title: `${job.title} | ${job.companies?.name || 'WG Labor'}`,
    description: description,
  }
}

// AJUSTE: Se simplifica la firma aquí también.
export default async function JobDetailPage({ params }) {
  const { lang, id } = params;
  const job = await getJobById(id, lang);

  if (!job) {
    notFound();
  }

  return <JobDetailClient job={job} lang={lang} />;
}