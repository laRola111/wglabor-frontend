// src/lib/supabase/queries.js
import { supabase } from './client';

// ... (la función getSiteSettings se mantiene igual)
export async function getSiteSettings() {
  // ...
}

// NUEVA FUNCIÓN: Obtiene las ofertas de empleo públicas y activas
export async function getPublicJobs(language = 'es') {
  // Asegurarse de que language sea 'es' o 'en' para evitar errores.
  const lang = ['es', 'en'].includes(language) ? language : 'es';

  const { data, error } = await supabase
    .from('jobs')
    .select(`
      id,
      title:title->>${lang}, 
      description:description->>${lang},
      location,
      salary_range_min,
      salary_range_max,
      companies ( name )
    `)
    .eq('status', 'active');

  if (error) {
    // Esta línea nos dará la pista definitiva.
    console.error('DETALLE COMPLETO DEL ERROR:', error); 
    return []; // Es buena práctica devolver un array vacío en caso de error.
  }

  return data;
}