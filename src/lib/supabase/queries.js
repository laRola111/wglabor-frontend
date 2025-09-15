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

export async function getPublicJobs(language = "es", options = {}) {
  const {
    page = 1,
    pageSize = 10,
    keyword = "",
    location = "",
    categories = [],
    employmentTypes = [],
    minSalary = 0,
    sortBy = "date_desc", // 1. AÑADIMOS 'sortBy' CON UN VALOR POR DEFECTO
  } = options;

  const lang = ["es", "en"].includes(language) ? language : "es";

  let query = supabase
    .from("jobs")
    .select(
      `
      id, title:title->>${lang}, location, employment_type,
      salary_range_min, salary_range_max,
      companies ( name, logo_url )
    `,
      { count: "exact" }
    )
    .eq("status", "active")
    .range((page - 1) * pageSize, page * pageSize - 1);

  // --- Lógica de filtros (sin cambios) ---
  if (keyword) query = query.ilike(`title->>${lang}`, `%${keyword}%`);
  if (location)
    query = query.or(
      `location.ilike.%${location}%,zip_code.ilike.%${location}%`
    );
  if (categories.length > 0) query = query.in("job_category", categories);
  if (employmentTypes.length > 0)
    query = query.in("employment_type", employmentTypes);
  if (minSalary > 0) query = query.gte("salary_range_min", minSalary);

  // --- 2. LÓGICA DE ORDENAMIENTO DINÁMICO ---
  let sortColumn = "created_at";
  let sortOptions = { ascending: false };

  switch (sortBy) {
    case "salary_desc":
      sortColumn = "salary_range_min";
      sortOptions = { ascending: false, nullsFirst: false }; // Los salarios nulos van al final
      break;
    case "title_asc":
      sortColumn = `title->>${lang}`;
      sortOptions = { ascending: true };
      break;
    // El caso por defecto es 'date_desc'
    default:
      sortColumn = "created_at";
      sortOptions = { ascending: false };
      break;
  }

  // 3. Aplicamos el ordenamiento a la consulta
  query = query.order(sortColumn, sortOptions);

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

export async function getLegalDocument(slug, language = "es") {
  const lang = ["es", "en"].includes(language) ? language : "es";
  const { data, error } = await supabase
    .from("legal_documents")
    .select(`title:title->>${lang}, content:content->>${lang}`)
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`Error fetching legal doc (${slug}):`, error.message);
    return null;
  }
  return data;
}

// --- QUERIES PRIVADAS ---
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

export async function getCompanyList() {
  const { data, error } = await supabase
    .from("companies")
    .select("id, name")
    .order("name", { ascending: true });
  if (error) {
    console.error("Error fetching company list:", error);
    return [];
  }
  return data;
}
export async function getJobForAdmin(jobId) {
  if (!jobId) return null;
  const { data, error } = await supabase
    .from("jobs")
    .select("*, companies(id, name)")
    .eq("id", jobId)
    .single();
  if (error) {
    console.error(`Error fetching job ${jobId} for admin:`, error);
    return null;
  }
  return data;
}
