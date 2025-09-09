// src/app/(public)/[lang]/page.js
import Link from 'next/link';
import JobSearchBar from '@/components/molecules/JobSearchBar';
import JobCard from '@/components/molecules/JobCard';
import { getPublicJobs } from '@/lib/supabase/queries';
// 1. Importamos la función desde su nueva ubicación centralizada
import { getDictionary } from '@/lib/dictionaries';

// La función de metadatos ahora también usa el nuevo import
export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang);
  return {
    title: `${dict.home.heroTitle} | WG Labor LLC`,
    description: dict.home.heroSubtitle,
  };
}

export default async function Home({ params }) {
  // 2. Obtenemos el diccionario y los trabajos. Esto ahora funciona correctamente.
  const dict = await getDictionary(params.lang);
  const jobs = await getPublicJobs(params.lang);
  

  return (
    <>
      {/* Hero Section */}
      <section className="py-24 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-4">
            {dict.home.heroTitle}
          </h1>
          <p className="text-lg text-dark-text-muted mb-8">
            {dict.home.heroSubtitle}
          </p>
          <JobSearchBar dict={dict} />
          <div className="mt-4 text-dark-text-muted text-sm">
            <span>{params.lang === 'es' ? '¿Buscas empleo?' : 'Looking for a job?'} </span>
            <Link href={`/${params.lang}/jobs`} className="underline hover:no-underline text-accent-primary">
              {params.lang === 'es' ? 'Ver todas las ofertas' : 'View all openings'}
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Jobs Section */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-dark-text mb-12">
            {params.lang === 'es' ? 'Ofertas de Empleo Recientes' : 'Recent Job Openings'}
          </h2>
          {jobs && jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} lang={params.lang} />
              ))}
            </div>
          ) : (
            <p className="text-center text-dark-text-muted">
              {params.lang === 'es' ? 'No hay ofertas de empleo disponibles en este momento.' : 'No job openings available at the moment.'}
            </p>
          )}
        </div>
      </section>
    </>
  );
}