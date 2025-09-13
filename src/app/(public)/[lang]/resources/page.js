// RUTA: src/app/(public)/[lang]/resources/page.js
import { getDictionary } from '@/lib/dictionaries';
import AnimatedSection from '@/components/ui/AnimatedSection';
import JobSearchBar from '@/components/molecules/JobSearchBar';
import VisualBlock from '@/components/ui/VisualBlock';
import CtaBlock from '@/components/ui/CtaBlock';

export async function generateMetadata({ params }) {
  // Desestructuración correcta para evitar errores de Next.js
  const { lang } = params; 
  const dict = await getDictionary(lang);
  const t = dict.home;
  return {
    title: t.resourcesPageTitle,
    description: t.resourcesPageSubtitle,
  };
}

export default async function ResourcesPage({ params }) {
  // Desestructuración correcta para evitar errores de Next.js
  const { lang } = params;
  const dict = await getDictionary(lang);
  const t = dict.home;

  const tipsData = [
    {
      title: t.cvSectionTitle,
      description: t.cvSectionDesc,
      iconName: 'FaFileAlt',
      imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=1770',
      extendedContent: (
        <>
          <h4 className="text-lg font-semibold text-dark-text mb-2">Consejos clave para tu CV:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Adapta tu CV a cada oferta de empleo.</li>
            <li>Usa palabras clave de la descripción del puesto.</li>
            <li>Destaca logros medibles con números y datos.</li>
            <li>Mantén un diseño limpio y profesional.</li>
            <li>Incluye un perfil profesional conciso y potente.</li>
          </ul>
          <h4 className="text-lg font-semibold text-dark-text mt-4 mb-2">Carta de Presentación:</h4>
          <p>Tu carta es tu oportunidad de mostrar personalidad y conectar con el reclutador a un nivel más profundo. Investiga la empresa y personaliza cada carta.</p>
        </>
      )
    },
    {
      title: t.interviewSectionTitle,
      description: t.interviewSectionDesc,
      iconName: 'FaUserTie',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1770',
      extendedContent: (
        <>
          <h4 className="text-lg font-semibold text-dark-text mb-2">Prepárate para la Entrevista:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Investiga a fondo la empresa y el puesto.</li>
            <li>Practica tus respuestas a preguntas comunes.</li>
            <li>Prepara preguntas inteligentes para el entrevistador.</li>
            <li>Vístete de manera profesional y llega a tiempo.</li>
            <li>Envía un correo de agradecimiento después.</li>
          </ul>
          <h4 className="text-lg font-semibold text-dark-text mt-4 mb-2">Entrevistas Virtuales:</h4>
          <p>Asegura una buena conexión a internet, un fondo limpio y sin distracciones, y una iluminación adecuada. Mira a la cámara para simular contacto visual.</p>
        </>
      )
    },
    {
      title: t.hiringSectionTitle,
      description: t.hiringSectionDesc,
      iconName: 'FaHandshake',
      imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b2baf?q=80&w=1770',
      extendedContent: (
        <>
          <h4 className="text-lg font-semibold text-dark-text mb-2">Negociación y Onboarding:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Conoce tu valor de mercado antes de negociar.</li>
            <li>No tengas miedo de pedir lo que mereces, pero sé flexible.</li>
            <li>Revisa cuidadosamente el contrato antes de firmar.</li>
            <li>Sé proactivo en tus primeros días: aprende, pregunta y colabora.</li>
            <li>Establece objetivos claros con tu nuevo manager.</li>
          </ul>
          <h4 className="text-lg font-semibold text-dark-text mt-4 mb-2">Primeras Impresiones:</h4>
          <p>Tus primeras semanas son cruciales. Demuestra entusiasmo, capacidad de aprendizaje y una actitud positiva para integrarte rápidamente al equipo.</p>
        </>
      )
    }
  ];

  return (
    <>
      <section className="relative h-[50vh] flex flex-col justify-center items-center text-center px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-surface to-dark-background opacity-70 z-0" />
        <AnimatedSection className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
            {t.resourcesPageTitle}
          </h1>
          <p className="text-lg md:text-xl text-dark-text-muted max-w-3xl mx-auto">
            {t.resourcesPageSubtitle}
          </p>
        </AnimatedSection>
      </section>

      <main className="max-w-7xl mx-auto py-16 px-8 relative -top-16 z-20">
        <div className="bg-dark-surface p-6 rounded-3xl shadow-2xl shadow-black/40 border-2 border-dark-border">
          <JobSearchBar dict={dict} />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {tipsData.map((tip, index) => (
            <VisualBlock 
              key={index} 
              iconName={tip.iconName} 
              title={tip.title} 
              description={tip.description}
              imageUrl={tip.imageUrl}
              extendedContent={tip.extendedContent}
            />
          ))}
        </div>
      </main>

      <div className="max-w-7xl mx-auto px-8 py-20">
        <CtaBlock
          title={t.startSearching}
          description={lang === 'es' ? 'Tu próximo gran paso profesional te está esperando. Explora cientos de oportunidades hoy.' : 'Your next big career move is waiting. Explore hundreds de oportunidades today.'}
          buttonText={t.browseJobs}
          buttonHref={`/${lang}/jobs`}
        />
      </div>
    </>
  );
}