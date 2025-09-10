// src/app/(public)/[lang]/page.js
import Link from 'next/link';
import JobSearchBar from '@/components/molecules/JobSearchBar';
import JobCard from '@/components/molecules/JobCard';
import { getRecentJobs } from '@/lib/supabase/queries';
import { getDictionary } from '@/lib/dictionaries';
import CompaniesSection from '@/components/organisms/CompaniesSection';
import TipsSection from '@/components/organisms/TipsSection';
import ContactSection from '@/components/organisms/ContactSection';


export async function generateMetadata({ params: paramsPromise }) {
  // 1. "Esperamos" los parámetros para obtener el valor de 'lang'
  const { lang } = await paramsPromise;
  const dict = await getDictionary(lang);
  return {
    title: `${dict.home.heroTitle} | WG Labor LLC`,
    description: dict.home.heroSubtitle,
  };
}

export default async function Home({ params: paramsPromise }) {
  // 2. "Esperamos" los params una sola vez al principio
  const { lang } = await paramsPromise;

  // 3. Usamos la variable 'lang' en todas las llamadas y lógicas
  const dict = await getDictionary(lang);
  const jobs = await getRecentJobs(lang);

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
            {/* 4. Usamos la variable 'lang' resuelta en todo el JSX */}
            <span>{lang === 'es' ? '¿Buscas empleo?' : 'Looking for a job?'} </span>
            <Link href={`/${lang}/jobs`} className="underline hover:no-underline text-accent-primary">
              {lang === 'es' ? 'Ver todas las ofertas' : 'View all openings'}
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Jobs Section */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-dark-text mb-12">
            {lang === 'es' ? 'Ofertas de Empleo Recientes' : 'Recent Job Openings'}
          </h2>
          {jobs && jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} lang={lang} />
              ))}
            </div>
          ) : (
            <p className="text-center text-dark-text-muted">
              {lang === 'es' ? 'No hay ofertas de empleo disponibles en este momento.' : 'No job openings available at the moment.'}
            </p>
          )}
        </div>
      </section>
      <CompaniesSection dict={dict} lang={lang} />
      <TipsSection dict={dict} />
      <ContactSection dict={dict} lang={lang} />
    </>
  );
}