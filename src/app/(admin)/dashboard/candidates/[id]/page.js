// RUTA: src/app/(admin)/dashboard/candidates/[id]/page.js (VERSIÓN CORRECTA)
import { notFound } from 'next/navigation';
import { getCandidateDetailsByEmail } from '@/lib/supabase/queries';
import CandidateDetailClient from './CandidateDetailClient';

export default async function CandidateDetailPage({ params }) {
  const candidateEmail = decodeURIComponent(params.id);
  
  const applications = await getCandidateDetailsByEmail(candidateEmail);

  if (!applications || applications.length === 0) {
    notFound();
  }

  return <CandidateDetailClient applications={applications} />;
}