// RUTA: src/app/(public)/[lang]/resources/page.js (RE-ARQUITECTADO)
'use client'; // Convertimos la página en un Componente de Cliente para manejar el estado

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaFileAlt, FaUserTie, FaHandshake, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

// NOTA: Para este componente, mantenemos los textos en español como base,
// ya que la lógica de internacionalización se manejaría en un caso real
// a través del diccionario que se pasaría como prop.

const iconMap = {
  FaFileAlt,
  FaUserTie,
  FaHandshake,
};

// --- COMPONENTE INTERNO: Tarjeta de Vista Previa ---
const TipCard = ({ tip, onSelect }) => {
  const IconComponent = iconMap[tip.iconName];
  return (
    <motion.div
      layoutId={`card-container-${tip.id}`}
      onClick={() => onSelect(tip.id)}
      className="relative p-8 rounded-2xl shadow-xl border-2 border-dark-border bg-dark-surface cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-accent-primary/50 overflow-hidden flex flex-col"
    >
      <div className="flex items-center space-x-4 mb-4">
        {IconComponent && <IconComponent className="text-accent-primary flex-shrink-0" size={32} />}
        <h3 className="text-2xl font-extrabold text-dark-text leading-tight">{tip.title}</h3>
      </div>
      <p className="text-md text-dark-text-muted">{tip.description}</p>
      <div className="flex-grow" />
      <p className="mt-6 text-sm text-accent-primary font-semibold flex items-center justify-center">
        Leer más
      </p>
    </motion.div>
  );
};

// --- COMPONENTE INTERNO: Vista Detallada Inmersiva ---
const ExpandedTipView = ({ tip, onDeselect }) => {
  const IconComponent = iconMap[tip.iconName];
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <motion.div
        layoutId={`card-container-${tip.id}`}
        className="relative w-full max-w-4xl max-h-[90vh] bg-dark-surface rounded-2xl shadow-2xl border-2 border-dark-border p-8 overflow-y-auto"
      >
        <motion.button
          onClick={onDeselect}
          className="absolute top-4 right-4 text-dark-text-muted hover:text-white z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3 } }}
        >
          <FaTimes size={24} />
        </motion.button>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
          <div className="flex items-center space-x-4 mb-6">
            {IconComponent && <IconComponent className="text-accent-primary flex-shrink-0" size={32} />}
            <h2 className="text-3xl font-extrabold text-dark-text">{tip.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="prose prose-invert text-dark-text-muted prose-p:my-2 prose-ul:my-2 prose-li:my-1">
              {tip.extendedContent}
            </div>
            <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
              <Image 
                src={tip.imageUrl} 
                alt={tip.title} 
                fill 
                className="object-cover" 
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---
export default function ResourcesPage() {
  const [selectedId, setSelectedId] = useState(null);

  // Arquitectura de Contenido Enriquecido
  const tipsData = [
    {
      id: 1,
      title: "Optimiza tu CV y Carta de Presentación",
      description: "Aprende a crear documentos que capturen la atención de los reclutadores y te abran las puertas a nuevas oportunidades.",
      iconName: 'FaFileAlt',
      imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=1770',
      extendedContent: (
        <>
          <h4>Puntos Clave:</h4>
          <ul>
            <li><strong>Adapta tu CV:</strong> Personaliza tu CV para cada oferta, destacando la experiencia y habilidades más relevantes.</li>
            <li><strong>Usa Palabras Clave:</strong> Integra términos de la descripción del puesto para pasar los filtros automáticos (ATS).</li>
            <li><strong>Cuantifica Logros:</strong> En lugar de &quot;Responsable de ventas&quot;, usa &quot;Incrementé las ventas un 15% en 6 meses&quot;. Los números son poderosos.</li>
          </ul>
          <h4 className="mt-4">Verbos de Acción para Impresionar:</h4>
          <p>Utiliza palabras como: <em>Lideré, Optimicé, Implementé, Aumenté, Desarrollé, Gestioné, Creé.</em></p>
        </>
      )
    },
    {
      id: 2,
      title: "Prepárate para el Éxito en tus Entrevistas",
      description: "La confianza es clave. Con nuestras guías, estarás listo para cualquier pregunta y dejarás una impresión memorable.",
      iconName: 'FaUserTie',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1770',
      extendedContent: (
        <>
          <h4>Fases de la Preparación:</h4>
          <ol>
            <li><strong>Investigación:</strong> Conoce la empresa, su cultura, productos y a tu entrevistador. Demuestra interés genuino.</li>
            <li><strong>Practica (Método STAR):</strong> Prepara respuestas usando el método Situación, Tarea, Acción, Resultado. Es ideal para preguntas de comportamiento.</li>
            <li><strong>Prepara Preguntas Inteligentes:</strong> Ten listas 2-3 preguntas que demuestren tu interés en el rol, el equipo o la empresa.</li>
          </ol>
        </>
      )
    },
    {
        id: 3,
        title: "Consejos para el Proceso de Contratación",
        description: "Te guiamos a través de los últimos pasos para que la transición a tu nuevo empleo sea lo más fluida posible.",
        iconName: 'FaHandshake',
        imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b2baf?q=80&w=1770',
        extendedContent: (
          <>
            <h4>Lista de Verificación Final:</h4>
            <ul>
              <li><strong>Entiende la Oferta:</strong> Analiza el salario, beneficios, responsabilidades y oportunidades de crecimiento.</li>
              <li><strong>Negociación:</strong> Conoce tu valor en el mercado. No tengas miedo de negociar, pero hazlo de forma profesional y justificada.</li>
              <li><strong>Onboarding:</strong> Durante tus primeras semanas, enfócate en aprender, conocer a tu equipo y demostrar una actitud proactiva.</li>
            </ul>
            <h4 className="mt-4">Errores a Evitar:</h4>
            <p>No dejes de hacer preguntas, no critiques a empleadores anteriores y no olvides enviar una nota de agradecimiento.</p>
          </>
        )
      }
  ];

  const selectedTip = selectedId ? tipsData.find(tip => tip.id === selectedId) : null;

  return (
    <>
      <section className="py-24 text-center px-8 bg-dark-surface">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 max-w-4xl mx-auto">
          Impulsa tu Carrera con Nuestros Recursos
        </h1>
        <p className="text-lg text-dark-text-muted max-w-3xl mx-auto">
          Desde perfeccionar tu CV hasta dominar la entrevista, te acompañamos en cada paso.
        </p>
      </section>

      <main className="max-w-7xl mx-auto py-20 px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tipsData.map((tip) => (
            <TipCard key={tip.id} tip={tip} onSelect={setSelectedId} />
          ))}
        </div>
      </main>
      
      <AnimatePresence>
        {selectedTip && (
          <ExpandedTipView tip={selectedTip} onDeselect={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </>
  );
}