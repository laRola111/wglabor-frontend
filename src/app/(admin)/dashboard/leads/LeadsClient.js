// RUTA: src/app/(admin)/dashboard/leads/LeadsClient.js (NUEVO ARCHIVO)
'use client';

import React from 'react';
import Link from 'next/link';
import DataTable from '@/components/organisms/DataTable';
import LeadStatusBadge from '@/components/ui/LeadStatusBadge';
import { FaEye } from 'react-icons/fa';

export default function LeadsClient({ leads }) {
  const columns = React.useMemo(() => [
    {
      header: 'Contact Name',
      accessorKey: 'contact_name',
      cell: ({ row }) => (
        <div>
          <span className="font-bold text-dark-text">{row.contact_name}</span>
          <span className="block text-xs text-dark-text-muted">{row.company_name || 'N/A'}</span>
        </div>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ value }) => <LeadStatusBadge status={value} />
    },
    {
      header: 'Received At',
      accessorKey: 'created_at',
      cell: ({ value }) => new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    },
    {
        header: 'Contact',
        accessorKey: 'email',
        cell: ({ row }) => (
            <div>
                {row.email && <p className='text-sm text-dark-text-muted'>{row.email}</p>}
                {row.phone && <p className='text-sm text-dark-text-muted'>{row.phone}</p>}
            </div>
        )
    }
  ], []);

  const renderActions = (lead) => (
    <div className="flex items-center space-x-4">
      <Link href={`/dashboard/leads/${lead.id}`} className="text-gray-400 hover:text-white" title="View Details"><FaEye /></Link>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leads Management</h1>
      </div>
      <DataTable columns={columns} data={leads} renderActions={renderActions} />
    </div>
  );
}