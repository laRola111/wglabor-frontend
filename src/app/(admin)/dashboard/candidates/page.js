// RUTA: src/app/(admin)/dashboard/candidates/page.js (REEMPLAZAR ARCHIVO COMPLETO)
import { getUniqueCandidates } from '@/lib/supabase/queries';
import CandidatesClient from './CandidatesClient';

export default async function CandidatesListPage() {
  const candidates = await getUniqueCandidates();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Candidate Database</h1>
      </div>
      <CandidatesClient candidates={candidates} />
    </div>
  );
}