// RUTA: src/app/(admin)/dashboard/jobs/[id]/edit/page.js
import { notFound } from 'next/navigation';
import JobForm from '@/components/organisms/JobForm';
import { getCompanyList, getJobForAdmin } from '@/lib/supabase/queries';

export default async function EditJobPage({ params }) {
  const [job, companies] = await Promise.all([
    getJobForAdmin(params.id),
    getCompanyList()
  ]);

  if (!job) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Job Listing: <span className="text-accent-primary">{job.title.en}</span></h1>
      <JobForm initialData={job} companies={companies} />
    </div>
  );
}