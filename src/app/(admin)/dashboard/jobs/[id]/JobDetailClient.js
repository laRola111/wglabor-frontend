// RUTA: src/app/(admin)/dashboard/jobs/[id]/JobDetailClient.js (ACTUALIZAR ApplicantCard)

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaDownload, FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/ui/StatusBadge';
import { getSignedUrlAction } from '@/actions/jobs';
import { useToast } from '@/hooks/useToast';

// --- Sub-componente: Tarjeta de Aplicante (ACTUALIZADA) ---
const ApplicantCard = ({ application }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const toast = useToast();
  
  // 1. Verificamos si existe una URL de CV en los datos de la postulación
  const hasResume = application.resume_url && application.resume_url.length > 0;

  const handleDownload = async () => {
    if (!hasResume) return; // No hacer nada si no hay CV

    setIsDownloading(true);
    const result = await getSignedUrlAction(application.resume_url);
    if (result.success && result.url) {
      window.open(result.url, '_blank');
    } else {
      toast.error(result.message || 'Could not get the download URL.');
    }
    setIsDownloading(false);
  };
  
  const applicationDate = new Date(application.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="bg-dark-background p-4 rounded-lg border border-dark-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h4 className="font-bold text-dark-text">{application.candidate_name}</h4>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-dark-text-muted mt-1">
          <a href={`mailto:${application.candidate_email}`} className="flex items-center gap-2 hover:text-accent-primary"><FaEnvelope /> {application.candidate_email}</a>
          <a href={`tel:${application.candidate_phone}`} className="flex items-center gap-2 hover:text-accent-primary"><FaPhone /> {application.candidate_phone}</a>
        </div>
        <p className="text-xs text-dark-text-muted mt-2">Applied on: {applicationDate}</p>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        {/* 2. El botón ahora se renderiza o se deshabilita condicionalmente */}
        <Button 
          onClick={handleDownload} 
          disabled={isDownloading || !hasResume} 
          className="!py-2 !px-4 text-sm w-full sm:w-auto disabled:bg-dark-border disabled:cursor-not-allowed disabled:text-dark-text-muted"
          title={hasResume ? 'Download CV' : 'No CV submitted'}
        >
          <FaDownload className="mr-2" />
          {isDownloading ? '...' : 'CV'}
        </Button>
        <a href={`https://wa.me/${application.candidate_phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
          <Button className="!p-3 bg-green-600 hover:bg-green-700"><FaWhatsapp size={18} /></Button>
        </a>
      </div>
    </div>
  );
};


// --- Componente Principal (sin cambios) ---
export default function JobDetailClient({ job, applications }) {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Button onClick={() => router.back()} className="bg-dark-surface hover:bg-dark-border !text-dark-text-muted !p-2">
          <FaArrowLeft />
        </Button>
        <div className="flex items-center gap-4">
          <StatusBadge status={job.status} />
          <Button onClick={() => router.push(`/dashboard/jobs/${job.id}/edit`)}>Edit Job</Button>
        </div>
      </div>
      
      <div className="bg-dark-surface p-6 rounded-lg border border-dark-border mb-8">
        <h1 className="text-3xl font-bold text-dark-text">{job.title?.en}</h1>
        <p className="text-lg text-dark-text-muted mt-1">{job.companies?.name}</p>
      </div>

      <div className="bg-dark-surface p-6 rounded-lg border border-dark-border">
        <h2 className="text-2xl font-semibold text-dark-text mb-6">
          {applications.length} Applicant(s)
        </h2>
        {applications.length > 0 ? (
          <div className="space-y-4">
            {applications.map(app => (
              <ApplicantCard key={app.id} application={app} />
            ))}
          </div>
        ) : (
          <p className="text-dark-text-muted text-center py-8">No applications received for this job yet.</p>
        )}
      </div>
    </div>
  );
}