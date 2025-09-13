// RUTA: src/components/ui/HashScroller.js (NUEVO ARCHIVO)
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function HashScroller() {
  const pathname = usePathname();

  // Este efecto se ejecuta cada vez que la ruta de la página cambia.
  useEffect(() => {
    // Verificamos si la URL actual en el navegador tiene un ancla.
    if (window.location.hash) {
      const id = window.location.hash.substring(1); // Obtenemos el ID sin el '#'
      
      // Usamos un pequeño timeout. Esto le da al DOM una fracción de segundo
      // para "asentarse" después del cambio de página, asegurando que el elemento exista.
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [pathname]); // La dependencia es `pathname` para que se re-evalúe en cada navegación.

  return null; // Este componente no renderiza nada en la UI.
}