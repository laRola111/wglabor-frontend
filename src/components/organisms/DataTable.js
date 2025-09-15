// RUTA: src/components/organisms/DataTable.js (REEMPLAZAR ARCHIVO COMPLETO)
'use client';

import React from 'react';

const DataTable = ({ columns, data, renderActions }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-dark-surface p-8 rounded-lg border border-dark-border text-center">
        <p className="text-dark-text-muted">No data available to display.</p>
      </div>
    );
  }

  return (
    <div className="bg-dark-surface rounded-lg border border-dark-border overflow-hidden">
      {/* Vista de Tabla para Escritorio */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full divide-y divide-dark-border">
          <thead className="bg-dark-background">
            <tr>
              {columns.map((col) => (
                <th key={col.accessorKey} scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark-text-muted uppercase tracking-wider">
                  {col.header}
                </th>
              ))}
              {renderActions && <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-border">
            {data.map((row, index) => (
              // SOLUCIÓN: Hacemos la clave más robusta usando el id y el índice.
              <tr key={row.id || index}>
                {columns.map((col) => (
                  <td key={col.accessorKey} className="px-6 py-4 whitespace-nowrap text-sm text-dark-text">
                    {col.cell ? col.cell({ value: row[col.accessorKey], row }) : row[col.accessorKey]}
                  </td>
                ))}
                {renderActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {renderActions(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista de Tarjetas para Móvil */}
      <div className="block md:hidden">
        <div className="px-4 py-2 space-y-4">
          {data.map((row, index) => (
            // SOLUCIÓN: Hacemos la clave más robusta usando el id y el índice.
            <div key={row.id || index} className="bg-dark-background p-4 rounded-lg border border-dark-border">
              {columns.map((col) => (
                <div key={col.accessorKey} className="flex justify-between py-1 border-b border-dark-border last:border-b-0 items-center">
                  <span className="text-sm font-medium text-dark-text-muted">{col.header}</span>
                  <span className="text-sm text-dark-text text-right">
                    {col.cell ? col.cell({ value: row[col.accessorKey], row }) : row[col.accessorKey]}
                  </span>
                </div>
              ))}
              {renderActions && (
                <div className="mt-4 flex justify-end">
                  {renderActions(row)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataTable;