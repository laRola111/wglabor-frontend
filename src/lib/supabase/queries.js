// src/lib/supabase/queries.js
import { supabase } from './client';

export async function getSiteSettings() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('company_info')
    .eq('id', 1)
    .single();
  
  if (error) {
    console.error("Error fetching site info:", error);
    return null;
  }
  return data.company_info;
}

export async function getRecentJobs(language = 'es', limit = 6) {
  const lang = ['es', 'en'].includes(language) ? language : 'es';
  const { data, error } = await supabase
    .from('jobs')
    .select(`
      id,
      title:title->>${lang}, 
      location,
      salary_range_min,
      salary_range_max,
      employment_type,
      companies ( name )
    `) // CORRECCIÓN: job_type -> employment_type
    .eq('status', 'active')
    .order('created_at', { ascending: false }) 
    .limit(limit); 

  if (error) { /* ... */ }
  return data;
}

export async function getPublicJobs(language = 'es', options = {}) {
  // ... (lógica de paginación y filtros)
  let query = supabase
    .from('jobs') 
    .select(`
      id, 
      title:title->>${language}, 
      location, 
      salary_range_min,
      salary_range_max,
      employment_type,
      companies ( name )
    `, { count: 'exact' }) // CORRECCIÓN: job_type -> employment_type
    .eq('status', 'active');
  // ... (resto de la función)
  const { data, error, count } = await query;
  if (error) { /* ... */ }
  return { data, count };
}

export async function getJobById(id, language = 'es') {
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
      employment_type,
      companies ( name )
    `) // CORRECCIÓN: job_type -> employment_type
    .eq('status', 'active') 
    .eq('id', id)
    .single();

  if (error) { /* ... */ }
  return data;
}

// src/lib/supabase/queries.js

// ... (las otras funciones se mantienen igual)

export async function getUserProfile(userId) {
  console.log('--- DENTRO DE getUserProfile ---');
  console.log('Buscando perfil para el userId:', userId); // Log para ver el ID que llega

  if (!userId) return null;

  // TEMPORALMENTE quitamos .single() para que la consulta no falle
  // y nos devuelva un array con todo lo que encuentre.
  const { data, error } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', userId);

  // Log para ver la respuesta cruda de Supabase
  console.log('Respuesta de Supabase (datos):', data);
  console.log('Respuesta de Supabase (error):', error);
  
  if (error) {
    console.error('Error en la consulta a Supabase:', error.message);
    return null;
  }

  // Para que la página no se rompa, devolvemos el primer elemento del array.
  // Si 'data' es un array con más de un objeto, esta es la causa del error original.
  return data ? data[0] : null;
}