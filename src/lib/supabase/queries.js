// src/lib/supabase/queries.js
import { supabase } from "./client";

// --- QUERIES PÚBLICAS ---

export async function getSiteSettings() {
  const { data, error } = await supabase
    .from("site_settings")
    .select("company_info")
    .eq("id", 1)
    .single();
  if (error) {
    console.error("Error fetching site info:", error);
    return null;
  }
  return data.company_info;
}

export async function getRecentJobs(language = "es", limit = 6) {
  const lang = ["es", "en"].includes(language) ? language : "es";
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      id,
      title:title->>${lang}, 
      location,
      companies ( name )
    `
    )
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching recent jobs:", error.message);
    return [];
  }
  return data;
}

// VERSIÓN MEJORADA: Ahora acepta filtros y paginación.
export async function getPublicJobs(language = "es", options = {}) {
  const { page = 1, pageSize = 20, keyword = '', location = '' } = options;
  const lang = ["es", "en"].includes(language) ? language : "es";
  
  let query = supabase
    .from("jobs")
    .select(
      `
      id, 
      title:title->>${lang}, 
      location, 
      employment_type,
      companies ( name )
    `,
      { count: "exact" }
    )
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  // Aplicamos filtros si existen
  if (keyword) {
    // Usamos 'ilike' para búsquedas case-insensitive
    query = query.ilike(`title->>${lang}`, `%${keyword}%`);
  }
  if (location) {
    query = query.ilike('location', `%${location}%`);
  }

  const { data, error, count } = await query;
  
  if (error) {
    console.error("Error fetching public jobs:", error.message);
    return { data: [], count: 0 };
  }
  return { data, count };
}

export async function getJobById(id, language = "es") {
  const lang = ["es", "en"].includes(language) ? language : "es";
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      id,
      title:title->>${lang},
      description:description->>${lang},
      location,
      salary_range_min,
      salary_range_max,
      employment_type,
      job_category,
      companies ( name, logo_url )
    `
    )
    .eq("status", "active")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching job ${id}:`, error.message);
    return null;
  }
  return data;
}

// NUEVA FUNCIÓN: Para las páginas de políticas y términos.
export async function getLegalDocument(slug, language = 'es') {
  const lang = ["es", "en"].includes(language) ? language : "es";
  const { data, error } = await supabase
    .from('legal_documents')
    .select(`title:title->>${lang}, content:content->>${lang}`)
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error(`Error fetching legal doc (${slug}):`, error.message);
    return null;
  }
  return data;
}


// --- QUERIES DEL DASHBOARD (ADMIN) ---

export async function getUserProfile(userId) {
  if (!userId) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", userId)
    .single(); // .single() es más eficiente para obtener un solo registro

  if (error) {
    console.error("Error fetching user profile:", error.message);
    return null;
  }

  return data;
}

export async function getAllJobsForAdmin() {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      id,
      title, // Traemos el objeto JSON completo para el admin
      status,
      created_at,
      companies ( name )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all jobs for admin:", error);
    return [];
  }
  return data;
}

// Aquí añadiremos el resto de funciones del dashboard (leads, companies, etc.) a medida que las necesitemos.