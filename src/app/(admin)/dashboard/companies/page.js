// RUTA: src/app/(admin)/dashboard/companies/page.js (REEMPLAZAR ARCHIVO COMPLETO)
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { getAllCompanies } from '@/lib/supabase/queries';
import CompaniesClient from './CompaniesClient';

export default async function CompaniesListPage() {
  const companies = await getAllCompanies();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Companies Management</h1>
        <Link href="/dashboard/companies/new">
          <Button>Create New Company</Button>
        </Link>
      </div>
      <CompaniesClient companies={companies} />
    </div>
  );
}