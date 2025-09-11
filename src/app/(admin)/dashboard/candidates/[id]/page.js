// RUTA: src/app/(admin)/dashboard/candidates/[id]/page.js
export default function CandidateDetailPage({ params }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Perfil del Candidato #{params.id}</h1>
      <div className="bg-dark-surface p-8 rounded-lg border border-dark-border">
        <p className="text-dark-text-muted">Aquí se mostrará la información del candidato, su historial de postulaciones y el botón para descargar su CV.</p>
      </div>
    </div>
  );
}