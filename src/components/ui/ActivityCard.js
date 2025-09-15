// RUTA: src/components/ui/ActivityCard.js (NUEVO ARCHIVO)
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function ActivityCard({ application }) {
  const { candidate_name, created_at, jobs } = application;
  // El título del trabajo puede estar en formato JSON, nos aseguramos de tomar la versión en inglés.
  const jobTitle = jobs?.title?.en || 'a position';
  const applicationDate = new Date(created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // El enlace debería llevar al detalle del trabajo, y en el futuro, anclarse a la postulación.
  const href = `/dashboard/jobs/${jobs.id}`;

  return (
    <Link href={href} className="block group">
      <div className="flex items-center justify-between p-4 bg-dark-background rounded-lg border border-transparent group-hover:border-dark-border transition-colors">
        <div>
          <p className="font-semibold text-dark-text">
            {candidate_name}
            <span className="font-normal text-dark-text-muted"> applied for </span> 
            {jobTitle}
          </p>
          <p className="text-xs text-dark-text-muted mt-1">{applicationDate}</p>
        </div>
        <FaArrowRight className="text-dark-text-muted transition-transform duration-300 group-hover:text-accent-primary group-hover:translate-x-1" />
      </div>
    </Link>
  );
}