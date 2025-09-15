// RUTA: src/app/(admin)/dashboard/candidates/CandidatesClient.js (ACTUALIZAR)
'use client';

import React from 'react';
import Link from 'next/link'; // Importar Link
import DataTable from '@/components/organisms/DataTable';
import { FaUserGraduate } from 'react-icons/fa';

export default function CandidatesClient({ candidates }) {
  const columns = React.useMemo(() => [
     // ... (las definiciones de las columnas se mantienen igual) ...
    {
      header: 'Candidate',
      accessorKey: 'candidate_name',
      cell: ({ row }) => (
        <div>
          <span className="font-bold text-dark-text">{row.candidate_name}</span>
          <span className="block text-xs text-dark-text-muted">{row.candidate_email}</span>
        </div>
      )
    },
    { header: 'Phone', accessorKey: 'candidate_phone', cell: ({ value }) => value || <span className="text-dark-text-muted/50">N/A</span> },
    { header: 'Applications', accessorKey: 'application_count', cell: ({ value }) => (<div className="flex items-center justify-center font-mono text-center bg-dark-background text-accent-primary rounded-full h-8 w-8">{value}</div>) },
    { header: 'Last Applied', accessorKey: 'last_applied_at', cell: ({ value }) => new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }
  ], []);

  const renderActions = (candidate) => (
    <div className="flex items-center space-x-4">
      {/* SOLUCIÓN: Activamos el enlace, codificando el email para que sea seguro en una URL */}
      <Link href={`/dashboard/candidates/${encodeURIComponent(candidate.candidate_email)}`} className="text-gray-400 hover:text-white" title="View Profile">
        <FaUserGraduate />
      </Link>
    </div>
  );

  return (
    <DataTable columns={columns} data={candidates} renderActions={renderActions} />
  );
}