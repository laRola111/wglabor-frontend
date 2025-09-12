// RUTA: src/components/ui/Label.js (REEMPLAZAR ARCHIVO)
import React from 'react';

export default function Label({ children, htmlFor, className = '', ...props }) {
  // AJUSTE: Cambiamos text-dark-text-muted por text-gray-light para mayor visibilidad.
  return (
    <label htmlFor={htmlFor} className={`text-gray-light font-semibold text-sm ${className}`} {...props}>
      {children}
    </label>
  );
}