// RUTA: src/app/(admin)/dashboard/companies/page.js
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function CompaniesListPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Empresas</h1>
        <Link href="/dashboard/companies/new">
          <Button>Crear Nueva Empresa</Button>
        </Link>
      </div>
      <div className="bg-dark-surface p-8 rounded-lg border border-dark-border">
        <p className="text-dark-text-muted">Esta es la lista de empresas.</p>
      </div>
    </div>
  );
}