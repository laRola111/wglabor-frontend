// RUTA: src/app/(admin)/dashboard/jobs/[id]/page.js (VERSIÓN FINAL)
import { notFound } from 'next/navigation';
import { getJobForAdmin } from '@/lib/supabase/queries';
import JobDetailClient from './JobDetailClient'; // Necesitaremos un componente de cliente

export default async function JobDetailPage({ params }) {
  const job = await getJobForAdmin(params.id);

  if (!job) {
    notFound();
  }

  // Pasamos los datos del trabajo al componente de cliente
  return <JobDetailClient job={job} />;
}