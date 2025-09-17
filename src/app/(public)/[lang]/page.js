// RUTA: src/app/(public)/[lang]/page.js (CÓDIGO COMPLETO Y REESTRUCTURADO)

import Link from 'next/link';

// Componentes
import JobSearchBar from '@/components/molecules/JobSearchBar';
import JobCard from '@/components/molecules/JobCard';
import CompaniesSection from '@/components/organisms/CompaniesSection';
import TipsSection from '@/components/organisms/TipsSection';
import ContactSection from '@/components/organisms/ContactSection';
import AboutUsSection from '@/components/organisms/AboutUsSection';
import GallerySection from '@/components/organisms/GallerySection';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CtaSeparator from '@/components/organisms/CtaSeparator'

// Lógica y Estilos
import { getRecentJobs } from '@/lib/supabase/queries';
import { getDictionary } from '@/lib/dictionaries';
import '@/styles/hero-background.css'; // Importamos nuestro CSS
import TestimonialsSection from '@/components/organisms/TestimonialsSection';

export async function generateMetadata({ params: { lang } }) {
  const dict = await getDictionary(lang);
  return {
    title: `${dict.home.heroTitle} | WG Labor LLC`,
    description: dict.home.heroSubtitle,
  };
}


export default async function Home({ params: { lang } }) {
  const dict = await getDictionary(lang);
  const jobs = await getRecentJobs(lang, 6);

  return (
    <>
     <section className="relative z-10 py-24 px-8 text-center bg-gradient-to-r from-dark-background via-dark-surface to-dark-background animate-gradient-slow">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-extrabold text-white leading-tight mb-4">
              {dict.home.heroTitle}
            </h1>
            <p className="text-lg text-dark-text-muted mb-8">
              {dict.home.heroSubtitle}
            </p>
            <JobSearchBar dict={dict} />
            <div className="mt-4 text-dark-text-muted text-sm">
              <span>{lang === 'es' ? '¿Buscas empleo?' : 'Looking for a job?'} </span>
              <Link href={`/${lang}/jobs`} className="underline hover:no-underline text-accent-primary">
                {lang === 'es' ? 'Ver todas las ofertas' : 'View all openings'}
              </Link>
            </div>
          </div>
        </section>
          {/* Recent Jobs Section (también dentro del contenedor parallax) */}
        <AnimatedSection className="relative z-10 py-20 px-8">
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
        </AnimatedSection>
            

      {/* 3. El resto de las secciones están fuera, sobre el fondo normal */}
      <AnimatedSection>
        <AboutUsSection dict={dict.home} />
      </AnimatedSection>
      <AnimatedSection>
        <CompaniesSection dict={dict} lang={lang} />
      </AnimatedSection>
      <AnimatedSection>
        <TipsSection dict={dict} lang={lang}/>
      </AnimatedSection>
      <AnimatedSection>
        <GallerySection dict={{ lang }} />
      </AnimatedSection>
      <AnimatedSection>
        <TestimonialsSection dict={dict.companiesPage} />
      </AnimatedSection>

      <ContactSection dict={dict} lang={lang} />
    </>
  );
}