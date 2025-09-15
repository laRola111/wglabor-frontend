// RUTA: src/app/(public)/[lang]/jobs/page.js
import { getPublicJobs } from '@/lib/supabase/queries';
import { getDictionary } from '@/lib/dictionaries';
import JobCard from '@/components/molecules/JobCard';
import FilterSidebar from '@/components/organisms/FilterSidebar';
import { Suspense } from 'react';
import SortDropdown from '@/components/molecules/SortDropdown'; // 1. IMPORTAMOS EL NUEVO COMPONENTE

function Pagination({ currentPage, totalPages, lang }) {
    if (totalPages <= 1) return null;
    return (
        <div className="flex justify-center items-center space-x-2 mt-12">
            <span className="text-dark-text-muted">{lang === 'es' ? `Página ${currentPage} de ${totalPages}`: `Page ${currentPage} of ${totalPages}`}</span>
        </div>
    )
}

function JobsListFallback() {
  return <div className="text-center text-dark-text-muted pt-10">Loading jobs...</div>;
}

async function JobsList({ lang, searchParams, dict }) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const pageSize = 10;
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
    sortBy: searchParams.sort || 'date_desc', // 2. LEEMOS EL PARÁMETRO DE ORDENAMIENTO
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
        {/* 3. REEMPLAZAMOS EL SELECT ESTÁTICO POR NUESTRO COMPONENTE DINÁMICO */}
        <div className="mt-4 md:mt-0">
          <SortDropdown lang={lang} dict={dict} />
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

export default async function JobsPage({ params, searchParams }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  
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
          <FilterSidebar lang={lang} dict={dict} initialFilters={initialFilters} />
        </aside>
        {/* Usamos JSON.stringify(searchParams) en la key para forzar el re-renderizado en cada cambio de URL */}
        <Suspense key={JSON.stringify(searchParams)} fallback={<JobsListFallback />}>
          <JobsList lang={lang} searchParams={searchParams} dict={dict} />
        </Suspense>
      </div>
    </div>
  );
}