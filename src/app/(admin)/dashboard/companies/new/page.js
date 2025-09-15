// RUTA: src/app/(admin)/dashboard/companies/new/page.js (REEMPLAZAR ARCHIVO COMPLETO)
import CompanyForm from '@/components/organisms/CompanyForm';

export default function NewCompanyPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create New Company</h1>
      <CompanyForm />
    </div>
  );
}