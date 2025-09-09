// src/lib/supabase/queries.js
import { supabase } from './client';

// ... (la función getSiteSettings se mantiene igual)
export async function getSiteSettings() {
  // ...
}

export async function getSiteInfo() {
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


export async function getPublicJobs(language = 'es') {
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
    `) // El string del select termina aquí
    .eq('status', 'active')
    .order('created_at', { ascending: false }) 
    .limit(6); 

  if (error) {
    console.error('DETALLE COMPLETO DEL ERROR:', error); 
    return [];
  }

  return data;
}