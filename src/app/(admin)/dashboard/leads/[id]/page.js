// RUTA: src/app/(admin)/dashboard/leads/[id]/page.js (NUEVO ARCHIVO)
import { notFound } from 'next/navigation';
import { getLeadById } from '@/lib/supabase/queries';
import LeadDetailClient from './LeadDetailClient';

export default async function LeadDetailPage({ params: { id } }) {
  const lead = await getLeadById(id);

  if (!lead) {
    notFound();
  }

  return <LeadDetailClient lead={lead} />;
}