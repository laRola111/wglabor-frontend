// RUTA: src/app/(admin)/dashboard/jobs/[id]/page.js
export default function JobDetailPage({ params }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Detalle de la Oferta #{params.id}</h1>
      <div className="bg-dark-surface p-8 rounded-lg border border-dark-border">
        <p className="text-dark-text-muted">Aquí se mostrarán todos los detalles de la oferta y la lista de candidatos postulados.</p>
      </div>
    </div>
  );
}