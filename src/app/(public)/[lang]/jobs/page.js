// RUTA: src/app/(public)/[lang]/jobs/page.js (REEMPLAZAR ARCHIVO COMPLETO)
import { getPublicJobs } from '@/lib/supabase/queries';
import { getDictionary } from '@/lib/dictionaries';
import JobCard from '@/components/molecules/JobCard';
import FilterSidebar from '@/components/organisms/FilterSidebar';
import { Suspense } from 'react';

// --- NUEVO: Componente de paginación (Placeholder por ahora) ---
function Pagination({ currentPage, totalPages, lang }) {
    if (totalPages <= 1) return null;
    return (
        <div className="flex justify-center items-center space-x-2 mt-12">
            {/* Lógica de paginación irá aquí */}
            <span className="text-dark-text-muted">{lang === 'es' ? `Página ${currentPage} de ${totalPages}`: `Page ${currentPage} of ${totalPages}`}</span>
        </div>
    )
}

// --- Componente de Carga para Suspense ---
function JobsListFallback() {
  return <div className="text-center text-dark-text-muted pt-10">{`Loading jobs...`}</div>;
}

// --- Componente Async que obtiene y renderiza los trabajos ---
async function JobsList({ lang, searchParams, dict }) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const pageSize = 10; // Reducimos para que la paginación sea más visible

  // Leemos los parámetros de la URL y los convertimos a arrays para los checkboxes
  const categories = searchParams.category ? searchParams.category.split(',') : [];
  const employmentTypes = searchParams.employmentType ? searchParams.employmentType.split(',') : [];
  
  const options = {
    page,
    pageSize,
    keyword: searchParams.q || '',
    location: searchParams.location || '',
    minSalary: searchParams.minSalary ? parseInt(searchParams.minSalary, 10) : 0,
    categories,
    employmentTypes,
  };

  const { data: jobs, count: totalJobs } = await getPublicJobs(lang, options);

  const totalPages = Math.ceil(totalJobs / pageSize);
  const start = totalJobs > 0 ? (page - 1) * pageSize + 1 : 0;
  const end = Math.min(page * pageSize, totalJobs || 0);

  return (
    <main className="lg:col-span-3">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-dark-surface p-4 rounded-lg border border-dark-border">
        <p className="text-dark-text-muted text-sm">
          {lang === 'es' 
            ? `Mostrando ${start}-${end} de ${totalJobs} empleos` 
            : `Showing ${start}-${end} of ${totalJobs} jobs`}
        </p>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <label htmlFor="sort-by" className="text-dark-text-muted text-sm">{dict.jobs.sort}</label>
          <select id="sort-by" className="bg-dark-background border border-dark-border rounded-md px-3 py-1.5 text-sm text-dark-text focus:outline-none focus:ring-2 focus:ring-accent-primary">
            <option>{dict.jobs.mostRelevant}</option>
          </select>
        </div>
      </div>
      
      {jobs && jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job) => <JobCard key={job.id} job={job} lang={lang} />)}
        </div>
      ) : (
        <div className="bg-dark-surface p-12 rounded-lg border border-dark-border text-center">
          <p className="text-dark-text-muted">
            {lang === 'es' ? 'No se encontraron ofertas que coincidan con tu búsqueda.' : 'No job openings matching your search were found.'}
          </p>
        </div>
      )}
      
      <Pagination currentPage={page} totalPages={totalPages} lang={lang} />
    </main>
  );
}

// --- Componente Principal de la Página ---
export default async function JobsPage({ params, searchParams }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  
  // Aquí es donde preparamos el objeto `initialFilters` para pasarlo al Sidebar
  const initialFilters = {
    keyword: searchParams.q || '',
    location: searchParams.location || '',
    minSalary: searchParams.minSalary || '0',
    categories: searchParams.category ? searchParams.category.split(',') : [],
    types: searchParams.employmentType ? searchParams.employmentType.split(',') : [],
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          {/* AQUÍ PASAMOS LA PROP QUE FALTABA */}
          <FilterSidebar lang={lang} dict={dict} initialFilters={initialFilters} />
        </aside>
        <Suspense key={JSON.stringify(searchParams)} fallback={<JobsListFallback />}>
          <JobsList lang={lang} searchParams={searchParams} dict={dict} />
        </Suspense>
      </div>
    </div>
  );
}