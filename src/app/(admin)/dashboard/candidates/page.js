// RUTA: src/app/(admin)/dashboard/candidates/page.js
export default function CandidatesListPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Base de Datos de Candidatos</h1>
      <div className="bg-dark-surface p-8 rounded-lg border border-dark-border">
        <p className="text-dark-text-muted">Esta es la lista de todos los candidatos únicos que se han postulado.</p>
      </div>
    </div>
  );
}