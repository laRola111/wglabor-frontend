// RUTA: src/app/(admin)/dashboard/companies/[id]/page.js
export default function CompanyDetailPage({ params }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Detalle de Empresa #{params.id}</h1>
      <div className="bg-dark-surface p-8 rounded-lg border border-dark-border">
        <p className="text-dark-text-muted">Aquí se mostrarán los detalles, notas de seguimiento y ofertas asociadas a la empresa.</p>
      </div>
    </div>
  );
}