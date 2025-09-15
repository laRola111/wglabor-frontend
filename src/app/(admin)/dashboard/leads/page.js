// RUTA: src/app/(admin)/dashboard/leads/page.js (REEMPLAZAR ARCHIVO COMPLETO)
import { getAllLeads } from '@/lib/supabase/queries';
import LeadsClient from './LeadsClient';

export default async function LeadsListPage() {
  const leads = await getAllLeads();
  return <LeadsClient leads={leads} />;
}