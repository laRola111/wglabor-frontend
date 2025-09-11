// RUTA: src/components/molecules/JobCard.js (MODIFICADO)
import Link from 'next/link';
import { FaMapMarkerAlt, FaBriefcase, FaArrowRight } from 'react-icons/fa';

export default function JobCard({ job, lang }) {
  if (!job) return null;

  const employmentTypeDict = {
    // ... (diccionario se mantiene igual)
  };
  
  const typeText = employmentTypeDict[lang]?.[job.employment_type] || job.employment_type;

  // --- INICIO DE CAMBIOS ---
  // 1. Eliminamos 'legacyBehavior' y '<a>'.
  // 2. Pasamos todas las props (className, etc.) directamente al componente <Link>.
  return (
    <Link 
      href={`/${lang}/jobs/${job.id}`}
      className="bg-dark-surface p-6 rounded-lg border border-dark-border hover:border-accent-primary transition-all duration-300 ease-in-out transform hover:-translate-y-1 group block text-left"
    >
      <div className="flex flex-col h-full">
        {/* Encabezado de la tarjeta */}
        <div>
          <p className="text-sm text-dark-text-muted">{job.companies?.name || 'Empresa Confidencial'}</p>
          <h3 className="text-xl font-bold text-dark-text group-hover:text-accent-primary transition-colors duration-300 mt-1 truncate">
            {job.title || 'Título no disponible'}
          </h3>
        </div>
        
        {/* Detalles con iconos */}
        <div className="mt-4 flex flex-col space-y-3 text-dark-text-muted text-sm">
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2.5 flex-shrink-0" />
            <span>{job.location || 'Ubicación no especificada'}</span>
          </div>
          {job.employment_type && (
             <div className="flex items-center">
              <FaBriefcase className="mr-2.5 flex-shrink-0" />
              <span>{typeText}</span>
            </div>
          )}
        </div>
        
        {/* Footer de la tarjeta que aparece en hover */}
        <div className="mt-auto pt-6 flex justify-end items-center">
          <span className="text-sm font-semibold text-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {lang === 'es' ? 'Ver Oferta' : 'View Job'}
          </span>
          <FaArrowRight className="ml-2 text-accent-primary transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
  // --- FIN DE CAMBIOS ---
}