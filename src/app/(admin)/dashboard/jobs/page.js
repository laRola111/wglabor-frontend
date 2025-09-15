// RUTA: src/app/(admin)/dashboard/jobs/page.js
import { getAllJobsForAdmin } from '@/lib/supabase/queries';
import JobsClient from './JobsClient';

export default async function JobsListPage() {
  const jobs = await getAllJobsForAdmin();
  return <JobsClient jobs={jobs} />;
}