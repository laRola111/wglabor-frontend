// src/components/organisms/FilterSidebar.js
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Label from '../ui/Label';

export default function FilterSidebar({ lang, dict }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Estados para los campos del formulario
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (keyword) {
      params.set('q', keyword);
    } else {
      params.delete('q');
    }

    if (location) {
      params.set('location', location);
    } else {
      params.delete('location');
    }
    
    // Reiniciamos a la página 1 en cada nueva búsqueda
    params.delete('page');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="sticky top-24 p-6 bg-dark-surface rounded-lg border border-dark-border">
      <form onSubmit={handleFilterSubmit}>
        <div className="space-y-6">
          {/* Filtro por Palabra Clave */}
          <div>
            <Label htmlFor="keyword">{dict.jobs.searchPlaceholder}</Label>
            <Input
              type="text"
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={dict.jobs.searchPlaceholder}
              className="mt-1 w-full"
            />
          </div>

          {/* Filtro por Ubicación */}
          <div>
            <Label htmlFor="location">{dict.jobs.locationPlaceholder}</Label>
            <Input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={dict.jobs.locationPlaceholder}
              className="mt-1 w-full"
            />
          </div>

          {/* Aquí irán los demás filtros (categoría, tipo, salario) */}

        </div>
        <Button type="submit" className="w-full mt-8">
          {lang === 'es' ? 'Aplicar Filtros' : 'Apply Filters'}
        </Button>
      </form>
    </div>
  );
}