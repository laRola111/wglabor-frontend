// RUTA: src/app/(admin)/dashboard/jobs/JobsClient.js
'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import DataTable from '@/components/organisms/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import { FaEdit, FaEye, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { toggleJobStatusAction, deleteJobAction } from '@/actions/jobs';

export default function JobsClient({ jobs }) {
  const [isPending, startTransition] = useTransition();
  const [modalState, setModalState] = useState({ isOpen: false, action: null, job: null });

  const openModal = (action, job) => {
    setModalState({ isOpen: true, action, job });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, action: null, job: null });
  };

  const handleConfirm = () => {
    if (modalState.action && modalState.job) {
      startTransition(async () => {
        if (modalState.action === deleteJobAction) {
          await modalState.action(modalState.job.id);
        } else {
          await modalState.action(modalState.job.id, modalState.job.status);
        }
        closeModal();
      });
    }
  };

  const columns = [
    {
      header: 'Title',
      accessorKey: 'title',
      cell: ({ row }) => (
        <div>
          <span className="font-bold text-dark-text">{row.title?.en || 'No Title'}</span>
          <span className="block text-xs text-dark-text-muted">{row.companies?.name || 'No Company'}</span>
        </div>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ value }) => <StatusBadge status={value} />
    },
    {
      header: 'Created At',
      accessorKey: 'created_at',
      cell: ({ value }) => new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    }
  ];

  const renderActions = (job) => (
    <div className="flex items-center space-x-4">
      <Link href={`/dashboard/jobs/${job.id}`} className="text-gray-400 hover:text-white" title="View Details"><FaEye /></Link>
      <Link href={`/dashboard/jobs/${job.id}/edit`} className="text-blue-400 hover:text-blue-300" title="Edit"><FaEdit /></Link>
      <button onClick={() => openModal(toggleJobStatusAction, job)} title={job.status === 'active' ? 'Deactivate' : 'Activate'}>
        {job.status === 'active' ? <FaToggleOn className="text-green-500" size={20} /> : <FaToggleOff className="text-gray-500" size={20} />}
      </button>
      <button onClick={() => openModal(deleteJobAction, job)} className="text-red-500 hover:text-red-400" title="Delete"><FaTrash /></button>
    </div>
  );

  return (
    <>
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        title={modalState.action === deleteJobAction ? 'Delete Job Listing' : 'Confirm Status Change'}
        confirmText={modalState.action === deleteJobAction ? 'Delete' : 'Confirm'}
        variant={modalState.action === deleteJobAction ? 'danger' : 'primary'}
      >
        Are you sure you want to {modalState.action === deleteJobAction ? 'permanently delete' : 'change the status of'} the job listing &quot;{modalState.job?.title?.en || 'the selected job'}&quot;?
      </ConfirmationModal>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Job Listings Management</h1>
          <Link href="/dashboard/jobs/new"><Button>Create New Job</Button></Link>
        </div>
        <DataTable columns={columns} data={jobs} renderActions={renderActions} />
      </div>
    </>
  );
}