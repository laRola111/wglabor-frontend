// RUTA: src/components/ui/Label.js (ACTUALIZADO)
import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function Label({ children, htmlFor, className = '', ...props }) {
  // MEJORA: Añadimos 'block' para que ocupe toda la línea y un margen inferior
  // para darle espacio respecto al campo de abajo. Es más limpio y predecible.
  const baseClasses = 'block mb-1.5 text-sm font-semibold text-gray-light';
  const mergedClasses = twMerge(baseClasses, className);

  return (
    <label htmlFor={htmlFor} className={mergedClasses} {...props}>
      {children}
    </label>
  );
}