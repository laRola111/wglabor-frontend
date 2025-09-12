// RUTA: src/components/molecules/JobCard.js (REEMPLAZAR ARCHIVO COMPLETO)
import Link from 'next/link';
import Image from 'next/image';
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaDollarSign } from 'react-icons/fa';
import Button from '../ui/Button';

// Función Helper para formatear el salario
const formatSalary = (min, max, lang) => {
  if (!min && !max) return null;
  const format = (val) => `$${Math.round(val / 1000)}k`;
  if (min && max) return `${format(min)} - ${format(max)}`;
  if (min) return `${lang === 'es' ? 'Desde' : 'From'} ${format(min)}`;
  if (max) return `${lang === 'es' ? 'Hasta' : 'Up to'} ${format(max)}`;
  return null;
};

export default function JobCard({ job, lang }) {
  if (!job) return null;

  const companyName = job.companies?.name || 'Empresa Confidencial';
  const logoSrc = job.companies?.logo_url || '/icon.png';
  const salary = formatSalary(job.salary_range_min, job.salary_range_max, lang);
  
  return (
    <div className="bg-dark-surface p-5 rounded-lg border border-dark-border transition-all duration-300 hover:border-accent-primary hover:shadow-lg hover:shadow-black/20 flex flex-col sm:flex-row items-start gap-5">
      
      {/* Logo */}
      <div className="flex-shrink-0">
        <Image 
          src={logoSrc} 
          alt={`${companyName} logo`}
          width={52} 
          height={52}
          className="rounded-md bg-white p-1"
        />
      </div>

      {/* Contenido Principal */}
      <div className="flex-grow">
        <p className="text-sm text-dark-text-muted">{companyName}</p>
        <h3 className="text-lg font-bold text-dark-text mt-1">
          {job.title || 'Título no disponible'}
        </h3>
        
        {/* Tags de Información */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-dark-text-muted">
          {salary && (
            <div className="flex items-center">
              <FaDollarSign className="mr-1.5 text-green-400" /> 
              <span>{salary}</span>
            </div>
          )}
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-1.5" /> 
            <span>{job.location || 'No especificado'}</span>
          </div>
          {job.employment_type && (
             <div className="flex items-center">
              <FaClock className="mr-1.5" />
              <span>{job.employment_type}</span>
            </div>
          )}
        </div>
      </div>

      {/* Botón */}
      <div className="w-full sm:w-auto mt-4 sm:mt-0 flex-shrink-0 self-center sm:self-end">
         <Link href={`/${lang}/jobs/${job.id}`} className="block">
            <Button className="w-full !py-2 !px-5 text-sm">
                {lang === 'es' ? 'Ver Detalles' : 'View Details'}
            </Button>
         </Link>
      </div>

    </div>
  );
}