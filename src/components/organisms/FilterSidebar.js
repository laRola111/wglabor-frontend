// RUTA: src/components/organisms/FilterSidebar.js (REEMPLAZAR ARCHIVO COMPLETO)
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect, useId } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Label from '../ui/Label';
import { FaSearch } from 'react-icons/fa';

const jobCategories = ["Construcción", "Hotelería", "Logística", "Transporte", "Servicios"];
const employmentTypes = ["Tiempo Completo", "Temporal", "Medio Tiempo"];

// --- NUEVO Sub-componente para Checkbox estilizado ---
const CheckboxFilter = ({ name, value, label, checked, onChange }) => {
  const id = useId();
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-dark-border text-accent-primary bg-dark-background focus:ring-accent-primary"
      />
      <label htmlFor={id} className="ml-3 text-sm text-dark-text-muted">
        {label}
      </label>
    </div>
  );
};

export default function FilterSidebar({ lang, dict, initialFilters }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Estados para todos los filtros
  const [keyword, setKeyword] = useState(initialFilters.keyword || '');
  const [location, setLocation] = useState(initialFilters.location || '');
  const [minSalary, setMinSalary] = useState(initialFilters.minSalary || 0);

  // Para los checkboxes, manejamos un array de los valores seleccionados
  const [selectedCategories, setSelectedCategories] = useState(initialFilters.categories || []);
  const [selectedTypes, setSelectedTypes] = useState(initialFilters.types || []);

  const handleCheckboxChange = (setter, currentValues, value) => {
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    setter(newValues);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    // Seteamos los parámetros solo si tienen valor
    if (keyword) params.set('q', keyword);
    if (location) params.set('location', location);
    if (minSalary > 0) params.set('minSalary', minSalary);
    if (selectedCategories.length > 0) params.set('category', selectedCategories.join(','));
    if (selectedTypes.length > 0) params.set('employmentType', selectedTypes.join(','));

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  
  // Formateador de moneda para el slider
  const formatCurrency = (value) => {
      if (value >= 100000) return `$100k+`;
      return `$${(value / 1000).toFixed(0)}k`;
  }

  return (
    <div className="sticky top-24">
      {/* El diseño ahora es más vertical y limpio, como en la maqueta */}
      <form onSubmit={handleFilterSubmit} className="space-y-8 bg-dark-surface p-6 rounded-lg border border-dark-border">
        {/* Búsqueda por palabra clave */}
        <div className="relative">
          <Label htmlFor="keyword">{lang === 'es' ? 'Buscar por palabra clave' : 'Search by keyword'}</Label>
          <FaSearch className="absolute left-3 top-10 text-dark-text-muted" />
          <Input
            type="text" id="keyword" value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="mt-1 w-full !pl-10"
          />
        </div>

        {/* Ubicación */}
        <div className="relative">
          <Label htmlFor="location">{lang === 'es' ? 'Ubicación' : 'Location'}</Label>
          <Input
            type="text" id="location" value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={lang === 'es' ? 'Ciudad, estado o código postal' : 'City, state, or zip code'}
            className="mt-1 w-full"
          />
        </div>

        {/* Filtros de Checkbox */}
        <div>
          <Label as="span">{lang === 'es' ? 'Categoría de Empleo' : 'Job Category'}</Label>
          <div className="space-y-3 mt-2">
            {jobCategories.map(cat => (
              <CheckboxFilter key={cat} name="category" value={cat} label={cat}
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCheckboxChange(setSelectedCategories, selectedCategories, cat)}
              />
            ))}
          </div>
        </div>

        <div>
          <Label as="span">{lang === 'es' ? 'Tipo de Empleo' : 'Employment Type'}</Label>
          <div className="space-y-3 mt-2">
            {employmentTypes.map(type => (
              <CheckboxFilter key={type} name="employmentType" value={type} label={type}
                checked={selectedTypes.includes(type)}
                onChange={() => handleCheckboxChange(setSelectedTypes, selectedTypes, type)}
              />
            ))}
          </div>
        </div>
        
        {/* Rango Salarial con Slider */}
        <div>
           <div className="flex justify-between items-center">
             <Label>{lang === 'es' ? 'Rango Salarial' : 'Salary Range'}</Label>
             <span className="text-sm font-semibold text-accent-primary">{formatCurrency(minSalary)}</span>
           </div>
          <input
            type="range"
            min="0"
            max="100000"
            step="5000"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            className="w-full h-2 bg-dark-border rounded-lg appearance-none cursor-pointer accent-accent-primary mt-2"
          />
           <div className="flex justify-between text-xs text-dark-text-muted mt-1">
             <span>$0</span>
             <span>$100k+</span>
           </div>
        </div>

        <Button type="submit" className="w-full !py-3">
          {lang === 'es' ? 'Aplicar Filtros' : 'Apply Filters'}
        </Button>
      </form>
    </div>
  );
}