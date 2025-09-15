// RUTA: src/app/(admin)/dashboard/companies/CompaniesClient.js (REEMPLAZAR ARCHIVO COMPLETO)
'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import DataTable from '@/components/organisms/DataTable';
import ConfirmationModal from '@/components/ui/ConfirmationModal'; // 1. Importar el modal
import { useToast } from '@/hooks/useToast'; // 2. Importar el hook de notificaciones
import { deleteCompanyAction } from '@/actions/companies'; // 3. Importar la nueva acción
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function CompaniesClient({ companies }) {
  const toast = useToast();
  const [isPending, startTransition] = useTransition();
  // 4. Estado para gestionar el modal
  const [modalState, setModalState] = useState({ isOpen: false, companyToDelete: null });

  const columns = React.useMemo(() => [
    { header: 'Company Name', accessorKey: 'name' },
    { header: 'Contact Email', accessorKey: 'contact_email', cell: ({ value }) => value || <span className="text-dark-text-muted/50">N/A</span> },
    { header: 'Contact Phone', accessorKey: 'contact_phone', cell: ({ value }) => value || <span className="text-dark-text-muted/50">N/A</span> },
    { header: 'Created At', accessorKey: 'created_at', cell: ({ value }) => new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }
  ], []);
  
  // 5. Función para abrir el modal
  const handleDeleteClick = (company) => {
    setModalState({ isOpen: true, companyToDelete: company });
  };

  // 6. Función para confirmar la eliminación
  const handleConfirmDelete = () => {
    if (!modalState.companyToDelete) return;

    startTransition(async () => {
      const result = await deleteCompanyAction(modalState.companyToDelete.id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
      setModalState({ isOpen: false, companyToDelete: null }); // Cerrar el modal
    });
  };

  const renderActions = (company) => (
    <div className="flex items-center space-x-4">
      <Link href={`/dashboard/companies/${company.id}/edit`} className="text-blue-400 hover:text-blue-300" title="Edit">
        <FaEdit />
      </Link>
      {/* 7. Conectar el botón al gestor de eventos */}
      <button onClick={() => handleDeleteClick(company)} className="text-red-500 hover:text-red-400" title="Delete">
        <FaTrash />
      </button>
    </div>
  );

  return (
    <>
      {/* 8. Añadir el componente del modal a la página */}
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, companyToDelete: null })}
        onConfirm={handleConfirmDelete}
        title="Delete Company"
        confirmText={isPending ? "Deleting..." : "Delete"}
        variant="danger"
      >
        Are you sure you want to permanently delete the company &quot;{modalState.companyToDelete?.name}&quot;? This action cannot be undone.
      </ConfirmationModal>

      <DataTable columns={columns} data={companies} renderActions={renderActions} />
    </>
  );
}