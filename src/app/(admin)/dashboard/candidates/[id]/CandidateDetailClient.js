// RUTA: src/app/(admin)/dashboard/candidates/[id]/CandidateDetailClient.js (REEMPLAZAR ARCHIVO COMPLETO)
'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaDownload, FaBriefcase, FaBuilding, FaTrash } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';
import { getSignedUrlAction } from '@/actions/jobs';
import { deleteApplicationAction } from '@/actions/applications'; // 1. Importar la nueva acción
import { useState, useTransition } from 'react';
import ConfirmationModal from '@/components/ui/ConfirmationModal'; // 2. Importar el modal de confirmación

// --- Sub-componente: Tarjeta de Postulación (ACTUALIZADA) ---
const ApplicationHistoryCard = ({ application, onDelete }) => {
  const toast = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeleting, startDeleteTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const jobTitle = application.jobs?.title?.en || 'N/A';
  const companyName = application.jobs?.companies?.name || 'N/A';
  const applicationDate = new Date(application.created_at).toLocaleDateString('en-US', { dateStyle: 'long' });

  const handleDownload = async () => {
    // ... (lógica de descarga sin cambios)
    setIsDownloading(true);
    const result = await getSignedUrlAction(application.resume_url);
    if (result.success && result.url) {
      window.open(result.url, '_blank');
    } else {
      toast.error(result.message || 'Could not get the download URL.');
    }
    setIsDownloading(false);
  };
  
  // 3. Nueva función para manejar la confirmación de borrado
  const handleConfirmDelete = () => {
    startDeleteTransition(async () => {
      const result = await deleteApplicationAction(application.id, application.resume_url);
      if (result.success) {
        toast.success(result.message);
        onDelete(application.id); // Llama a la función del padre para actualizar el estado
      } else {
        toast.error(result.message);
      }
      setIsModalOpen(false);
    });
  };

  return (
    <>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Application"
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        variant="danger"
      >
        Are you sure you want to permanently delete this application for &quot;{jobTitle}&quot;? The associated CV file will also be removed. This action cannot be undone.
      </ConfirmationModal>

      <div className="bg-dark-background p-4 rounded-lg border border-dark-border">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-bold text-lg text-dark-text">{jobTitle}</h3>
            <p className="text-sm text-dark-text-muted flex items-center gap-2 mt-1"><FaBuilding /> {companyName}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleDownload} disabled={isDownloading} className="!py-2 !px-4 text-sm">
              <FaDownload className="mr-2" />
              {isDownloading ? '...' : 'CV'}
            </Button>
            {/* 4. Botón de eliminar */}
            <Button onClick={() => setIsModalOpen(true)} disabled={isDeleting} className="!p-3 bg-red-600/80 hover:bg-red-600">
              <FaTrash />
            </Button>
          </div>
        </div>
        <p className="text-xs text-dark-text-muted mt-3">Applied on {applicationDate}</p>
      </div>
    </>
  );
};


// --- Componente Principal (ACTUALIZADO) ---
export default function CandidateDetailClient({ applications: initialApplications }) {
  const router = useRouter();
  // 5. Guardamos las postulaciones en un estado para poder actualizarlas dinámicamente
  const [applications, setApplications] = useState(initialApplications);

  if (applications.length === 0) {
    // Si no quedan postulaciones, redirigimos de vuelta a la lista
    router.push('/dashboard/candidates');
    return null; // Renderiza null mientras redirige
  }

  // Tomamos los datos del candidato de la postulación más reciente
  const candidate = applications[0]; 

  // 6. Función para eliminar una postulación de la lista en el estado
  const handleApplicationDeleted = (deletedApplicationId) => {
    setApplications(currentApps => currentApps.filter(app => app.id !== deletedApplicationId));
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button onClick={() => router.push('/dashboard/candidates')} className="bg-dark-surface hover:bg-dark-border !text-dark-text-muted !p-2">
          <FaArrowLeft className="mr-2" /> Back to Candidates
        </Button>
      </div>

      <div className="bg-dark-surface p-6 rounded-lg border border-dark-border mb-8">
        <h1 className="text-3xl font-bold text-dark-text">{candidate.candidate_name}</h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-dark-text-muted">
          <span>{candidate.candidate_email}</span>
          <span>{candidate.candidate_phone}</span>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-dark-text mb-4">Application History ({applications.length})</h2>
        <div className="space-y-4">
          {applications.map((app) => (
            <ApplicationHistoryCard key={app.id} application={app} onDelete={handleApplicationDeleted} />
          ))}
        </div>
      </div>
    </div>
  );
}