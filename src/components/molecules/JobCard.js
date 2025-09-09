// src/components/molecules/JobCard.js
import Link from 'next/link';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function JobCard({ job, lang }) {
  // Aseguramos que tengamos datos antes de intentar renderizar
  if (!job) return null;

  return (
    <Link href={`/${lang}/jobs/${job.id}`}>
      <div className="bg-dark-surface p-6 rounded-lg border border-dark-border hover:border-accent-primary transition-all duration-300 ease-in-out transform hover:-translate-y-1 group">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-dark-text-muted">{job.companies?.name || 'Empresa Confidencial'}</p>
            <h3 className="text-xl font-bold text-dark-text group-hover:text-accent-primary transition-colors duration-300 mt-1">
              {job.title || 'Título no disponible'}
            </h3>
          </div>
          {/* Aquí podría ir el logo de la empresa en el futuro */}
        </div>
        <div className="mt-4 flex items-center text-dark-text-muted text-sm">
          <FaMapMarkerAlt className="mr-2" />
          <span>{job.location || 'Ubicación no especificada'}</span>
        </div>
      </div>
    </Link>
  );
}