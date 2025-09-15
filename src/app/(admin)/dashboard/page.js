// RUTA: src/app/(admin)/dashboard/page.js (REEMPLAZAR ARCHIVO COMPLETO)
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserProfile, getDashboardStats, getRecentApplications } from '@/lib/supabase/queries';
import StatCard from '@/components/ui/StatCard';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import ActivityCard from '@/components/ui/ActivityCard'; // Importar la nueva tarjeta
import { FaBriefcase } from 'react-icons/fa';

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Hacemos todas las peticiones de datos en paralelo
  const [profile, stats, recentApplications] = await Promise.all([
    getUserProfile(user.id),
    getDashboardStats(),
    getRecentApplications()
  ]);

  const welcomeName = profile?.full_name || user.email;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark-text">Welcome, {welcomeName}</h1>
          <p className="text-dark-text-muted mt-1">Here is a summary of your agency&apos;s activity.</p>
        </div>
        <div className="mt-4 md:mt-0">
           <Link href="/dashboard/jobs/new">
            <Button>
              <FaBriefcase className="mr-2" />
              Create New Job
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid de Estadísticas con enlaces */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="New Leads (7d)" value={stats.newLeads} iconName="FaUsers" colorClass="text-blue-400" href="/dashboard/leads" />
        <StatCard title="Active Jobs" value={stats.activeJobs} iconName="FaBriefcase" colorClass="text-green-400" href="/dashboard/jobs" />
        <StatCard title="Total Applications" value={stats.totalApplications} iconName="FaFileSignature" colorClass="text-yellow-400" href="/dashboard/candidates" />
        <StatCard title="Total Companies" value={stats.totalCompanies} iconName="FaBuilding" colorClass="text-purple-400" href="/dashboard/companies" />
      </div>

      {/* Sección de Actividad Reciente */}
      <div className="mt-12 bg-dark-surface p-6 md:p-8 rounded-lg border border-dark-border">
        <h2 className="text-xl font-semibold text-dark-text mb-4">Recent Activity</h2>
        {recentApplications && recentApplications.length > 0 ? (
          <div className="space-y-3">
            {recentApplications.map(app => (
              <ActivityCard key={app.id} application={app} />
            ))}
          </div>
        ) : (
          <p className="text-dark-text-muted">
            No new applications in the last few days.
          </p>
        )}
      </div>
    </div>
  );
}