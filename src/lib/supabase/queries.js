// src/lib/supabase/queries.js
import { supabase } from "./client";

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
      salary_range_min,
      salary_range_max,
      employment_type,
      companies ( name )
    `
    )
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    /* ... */
  }
  return data;
}

export async function getPublicJobs(language = "es", options = {}) {
  let query = supabase
    .from("jobs")
    .select(
      `
      id, 
      title:title->>${language}, 
      location, 
      salary_range_min,
      salary_range_max,
      employment_type,
      companies ( name )
    `,
      { count: "exact" }
    )
    .eq("status", "active");
  const { data, error, count } = await query;
  if (error) {
    /* ... */
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
      companies ( name )
    `
    )
    .eq("status", "active")
    .eq("id", id)
    .single();

  if (error) {
    /* ... */
  }
  return data;
}

export async function getUserProfile(userId) {
  console.log("--- DENTRO DE getUserProfile ---");
  console.log("Buscando perfil para el userId:", userId);

  if (!userId) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", userId);

  if (error) {
    console.error("Error en la consulta a Supabase:", error.message);
    return null;
  }

  return data ? data[0] : null;
}

export async function getAllJobs() {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      id,
      title, // Traemos el objeto JSON completo
      status,
      location,
      created_at,
      companies ( name )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all jobs:", error);
    return [];
  }
  return data;
}
