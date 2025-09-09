// src/components/molecules/JobSearchBar.js
'use client';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

// El componente ahora recibe el diccionario como prop
export default function JobSearchBar({ dict }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Buscando empleos...');
  };

  return (
    <div className="bg-dark-surface rounded-xl p-4 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
      <Input
        type="text"
        placeholder={dict.home.searchPlaceholder}
        className="w-full sm:w-auto"
      />
      <Input
        type="text"
        placeholder={dict.home.locationPlaceholder}
        className="w-full sm:w-auto"
      />
      <Button
        type="submit"
        onClick={handleSubmit}
        className="w-full sm:w-auto"
      >
        {dict.home.searchButton}
      </Button>
    </div>
  );
}