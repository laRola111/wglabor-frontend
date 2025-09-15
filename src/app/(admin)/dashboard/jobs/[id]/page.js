// RUTA: src/app/(admin)/dashboard/jobs/[id]/page.js (REEMPLAZAR ARCHIVO COMPLETO)
import { notFound } from 'next/navigation';
import { getJobForAdmin, getApplicationsForJob } from '@/lib/supabase/queries';
import JobDetailClient from './JobDetailClient';

// SOLUCIÓN: Desestructuramos 'id' directamente de 'params' para seguir las mejores prácticas.
export default async function JobDetailPageAdmin({ params: { id } }) {
  const [job, applications] = await Promise.all([
    getJobForAdmin(id),
    getApplicationsForJob(id)
  ]);

  if (!job) {
    notFound();
  }

  return <JobDetailClient job={job} applications={applications} />;
}