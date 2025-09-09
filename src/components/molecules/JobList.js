// CREA UN NUEVO ARCHIVO: src/components/molecules/JobList.js
'use client'; // <-- Esto es crucial para que useEffect y useState funcionen

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import JobCard from './JobCard';

// El componente recibe los trabajos iniciales como props del Componente de Servidor
export default function JobList({ initialJobs, lang }) {
  const [jobs, setJobs] = useState(initialJobs);

  useEffect(() => {
    // Creamos un canal de suscripción
    const channel = supabase
      .channel('realtime-jobs')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'jobs' },
        (payload) => {
          console.log('¡Nueva oferta recibida!', payload.new);
          // Añadimos el nuevo trabajo al principio de la lista, manteniendo el límite visual
          setJobs(currentJobs => [payload.new, ...currentJobs].slice(0, 6));
        }
      )
      .subscribe();

    // Importante: Nos desuscribimos cuando el componente se desmonta para evitar fugas de memoria
    return () => {
      supabase.removeChannel(channel);
    };
  }, [lang]); // El array vacío asegura que esto solo se ejecute una vez

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} lang={lang} />
      ))}
    </div>
  );
}