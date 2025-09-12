// RUTA: src/app/(public)/[lang]/companies/page.js (VERSIÓN FINAL Y PULIDA)
import { getDictionary } from '@/lib/dictionaries';
import TestimonialsSection from '@/components/organisms/TestimonialsSection';
import ContactSection from '@/components/organisms/ContactSection'; // Importamos la sección de contacto completa
import { FaUserCheck, FaClipboardList, FaHandshake } from 'react-icons/fa';
import AnimatedSection from '@/components/ui/AnimatedSection';

export async function generateMetadata({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  return {
    title: lang === 'es' ? 'Para Empresas | WG Labor LLC' : 'For Companies | WG Labor LLC',
    description: dict.companiesPage.heroSubtitle,
  };
}

// Sub-componente para los Pasos del Proceso
const ProcessStep = ({ icon, title, description }) => (
  <div className="text-center">
    <div className="flex items-center justify-center h-20 w-20 rounded-full bg-dark-surface border-2 border-accent-primary mx-auto mb-6 transition-transform duration-300 hover:scale-110">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-dark-text mb-3">{title}</h3>
    <p className="text-dark-text-muted px-4">{description}</p>
  </div>
);

export default async function CompaniesPage({ params: { lang } }) {
  const dict = await getDictionary(lang);
  const t = dict.companiesPage;

  return (
    <>
      {/* 1. Hero Section */}
      <section className="py-24 px-8 text-center bg-gradient-to-b from-dark-surface to-dark-background">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 max-w-4xl mx-auto">{t.heroTitle}</h1>
          <p className="text-lg text-dark-text-muted mb-8 max-w-2xl mx-auto">{t.heroSubtitle}</p>
        </AnimatedSection>
      </section>

      {/* 2. Nuestro Proceso */}
      <section className="py-20 px-8 bg-dark-background">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center text-dark-text mb-16">{t.processTitle}</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-y-8 md:gap-x-12">
            <AnimatedSection>
              <ProcessStep icon={<FaClipboardList className="text-accent-primary text-4xl" />} title={t.processStep1Title} description={t.processStep1Desc} />
            </AnimatedSection>
            <AnimatedSection>
              <ProcessStep icon={<FaUserCheck className="text-accent-primary text-4xl" />} title={t.processStep2Title} description={t.processStep2Desc} />
            </AnimatedSection>
            <AnimatedSection>
              <ProcessStep icon={<FaHandshake className="text-accent-primary text-4xl" />} title={t.processStep3Title} description={t.processStep3Desc} />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 3. Testimonios */}
      <TestimonialsSection dict={t} />

      {/* 4. AJUSTE: Reutilizamos el componente ContactSection completo */}
      <ContactSection dict={dict} lang={lang} />
    </>
  );
}