// src/app/(public)/[lang]/jobs/page.js
import { getPublicJobs } from '@/lib/supabase/queries';
import { getDictionary } from '@/lib/dictionaries';
import JobCard from '@/components/molecules/JobCard';

export default async function JobsPage({ params: paramsPromise, searchParams }) {
  const { lang } = await paramsPromise;
  const dict = await getDictionary(lang);
  
  // Leemos el número de página de la URL (ej: /jobs?page=2), si no existe, es la página 1.
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const pageSize = 20; // Definimos el tamaño de la página

  // Llamamos a la función de Supabase con los parámetros de paginación
  const { data: jobs, count: totalJobs } = await getPublicJobs(lang, page, pageSize);

  // Calculamos los contadores para el texto de resumen
  const start = totalJobs > 0 ? (page - 1) * pageSize + 1 : 0;
  const end = Math.min(page * pageSize, totalJobs);

  return (
    <div className="max-w-7xl mx-auto py-12 px-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Columna de Filtros (Izquierda) */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 p-6 bg-dark-surface rounded-lg border border-dark-border">
            <h2 className="text-xl font-bold text-dark-text mb-4">
              {lang === 'es' ? 'Filtros' : 'Filters'}
            </h2>
            {/* Próximamente: aquí irán los componentes de filtro */}
            <p className="text-dark-text-muted text-sm">
              {lang === 'es' ? 'Los filtros de búsqueda estarán disponibles aquí.' : 'Search filters will be available here.'}
            </p>
          </div>
        </aside>

        {/* Columna de Resultados (Derecha) */}
        <main className="lg:col-span-3">
          {/* Barra de resumen y ordenamiento */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-dark-surface p-4 rounded-lg border border-dark-border">
            <p className="text-dark-text-muted">
              {lang === 'es' 
                ? `Mostrando ${start}-${end} de ${totalJobs} empleos` 
                : `Showing ${start}-${end} of ${totalJobs} jobs`}
            </p>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <label htmlFor="sort-by" className="text-dark-text-muted">{dict.jobs.sort}</label>
              <select id="sort-by" className="bg-dark-background border border-dark-border rounded-md px-3 py-1.5 text-dark-text focus:outline-none focus:ring-2 focus:ring-accent-primary">
                <option>{dict.jobs.mostRelevant}</option>
              </select>
            </div>
          </div>
          
          {jobs && jobs.length > 0 ? (
            <div className="space-y-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="bg-dark-surface p-8 rounded-lg border border-dark-border text-center">
               <p className="text-dark-text-muted">
                {lang === 'es' ? 'No se encontraron ofertas de empleo.' : 'No job openings found.'}
              </p>
            </div>
          )}
          
          {/* Placeholder para la paginación */}
          <div className="flex justify-center mt-8">
            <p className="text-dark-text-muted">[Paginación aquí]</p>
          </div>
        </main>
      </div>
    </div>
  );
}