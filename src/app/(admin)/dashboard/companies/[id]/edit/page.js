// RUTA: src/app/(admin)/dashboard/companies/[id]/edit/page.js (NUEVO ARCHIVO)
import { notFound } from 'next/navigation';
import { getCompanyById } from '@/lib/supabase/queries';
import CompanyForm from '@/components/organisms/CompanyForm';

export default async function EditCompanyPage({ params: { id } }) {
  const company = await getCompanyById(id);

  if (!company) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Company: <span className="text-accent-primary">{company.name}</span></h1>
      <CompanyForm initialData={company} />
    </div>
  );
}