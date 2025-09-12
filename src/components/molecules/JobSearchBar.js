// RUTA: src/components/molecules/JobSearchBar.js (CÓDIGO COMPLETO Y FUNCIONAL)
'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function JobSearchBar({ dict }) {
  // 1. Hooks de Next.js para manejar la navegación y obtener la ruta actual.
  const router = useRouter();
  const pathname = usePathname();
  
  // 2. Estados para almacenar el valor de los campos de texto.
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  // 3. Extraemos el idioma actual (ej. 'es' o 'en') de la ruta.
  const lang = pathname.split('/')[1] || 'es';

  // 4. Función que se ejecuta al enviar el formulario.
  const handleSubmit = (event) => {
    event.preventDefault();

    // 5. Creamos un objeto para gestionar los parámetros de la URL.
    const params = new URLSearchParams();

    // 6. Añadimos los parámetros solo si el usuario ha escrito algo.
    if (keyword.trim()) {
      params.set('q', keyword.trim());
    }
    if (location.trim()) {
      params.set('location', location.trim());
    }

    // 7. Construimos la URL final y navegamos a la página de empleos.
    const queryString = params.toString();
    router.push(`/${lang}/jobs${queryString ? `?${queryString}` : ''}`);
  };

  return (
    // 8. El formulario ahora llama a nuestra nueva función handleSubmit.
    <form 
      onSubmit={handleSubmit}
      className="bg-dark-surface rounded-xl p-4 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
    >
      <Input
        type="text"
        name="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={dict.home.searchPlaceholder}
        className="w-full sm:w-auto"
      />
      <Input
        type="text"
        name="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder={dict.home.locationPlaceholder}
        className="w-full sm:w-auto"
      />
      <Button
        type="submit"
        className="w-full sm:w-auto"
      >
        {dict.home.searchButton}
      </Button>
    </form>
  );
}