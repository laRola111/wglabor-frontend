// RUTA: src/app/(admin)/dashboard/jobs/page.js
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function JobsListPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Ofertas de Empleo</h1>
        <Link href="/dashboard/jobs/new">
          <Button>Crear Nueva Oferta</Button>
        </Link>
      </div>
      <div className="bg-dark-surface p-8 rounded-lg border border-dark-border">
        <p className="text-dark-text-muted">Aquí irá la tabla (JobsDataTable) con todas las ofertas de empleo.</p>
      </div>
    </div>
  );
}