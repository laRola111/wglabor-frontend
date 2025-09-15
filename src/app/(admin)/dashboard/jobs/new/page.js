// RUTA: src/app/(admin)/dashboard/jobs/new/page.js
import JobForm from '@/components/organisms/JobForm';
import { getCompanyList } from '@/lib/supabase/queries';

export default async function NewJobPage() {
  const companies = await getCompanyList();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create New Job Listing</h1>
      <JobForm companies={companies} />
    </div>
  );
}