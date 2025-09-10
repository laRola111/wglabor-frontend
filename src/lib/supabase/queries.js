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

export async function getRecentJobs(language = 'es') {
  const lang = ['es', 'en'].includes(language) ? language : 'es';

  const { data, error } = await supabase
    .from('jobs')
    .select(`
      id,
      title:title->>${lang}, 
      location,
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

export async function getPublicJobs(language = 'es', page = 1, pageSize = 20) {
  const lang = ['es', 'en'].includes(language) ? language : 'es';
   const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error } = await supabase
    .from('jobs')
    .select(`
      id,
      location,
      job_category,
      employment_type,
      salary_range_min,
      salary_range_max,
      title:title->>${lang}, 
      description:description->>${lang},
      companies ( name )
      `,)
      // { count: 'exact' })
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('DETALLE COMPLETO DEL ERROR:', error); 
    return [];
  }
 return data;
}