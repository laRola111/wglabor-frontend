// RUTA: src/lib/supabase/queries.js (REEMPLAZAR ARCHIVO COMPLETO)

// SOLUCIÓN: Añadimos las importaciones necesarias desde los helpers de Supabase y next/headers
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { supabase } from "./client"; // Mantenemos el cliente público para las queries públicas

// --- QUERIES PÚBLICAS (sin cambios) ---
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
    .select(`id, title:title->>${lang}, location, companies ( name )`)
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
  const { page = 1, pageSize = 10, keyword = "", location = "", categories = [], employmentTypes = [], minSalary = 0, sortBy = "date_desc" } = options;
  const lang = ["es", "en"].includes(language) ? language : "es";
  let query = supabase
    .from("jobs")
    .select(`id, title:title->>${lang}, location, employment_type, salary_range_min, salary_range_max, companies ( name, logo_url )`, { count: "exact" })
    .eq("status", "active")
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (keyword) query = query.ilike(`title->>${lang}`, `%${keyword}%`);
  if (location) query = query.or(`location.ilike.%${location}%,zip_code.ilike.%${location}%`);
  if (categories.length > 0) query = query.in("job_category", categories);
  if (employmentTypes.length > 0) query = query.in("employment_type", employmentTypes);
  if (minSalary > 0) query = query.gte("salary_range_min", minSalary);

  let sortColumn = "created_at";
  let sortOptions = { ascending: false };
  switch (sortBy) {
    case "salary_desc":
      sortColumn = "salary_range_min";
      sortOptions = { ascending: false, nullsFirst: false };
      break;
    case "title_asc":
      sortColumn = `title->>${lang}`;
      sortOptions = { ascending: true };
      break;
    default:
      sortColumn = "created_at";
      sortOptions = { ascending: false };
      break;
  }
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
    .select(`id, title:title->>${lang}, description:description->>${lang}, location, salary_range_min, salary_range_max, employment_type, job_category, companies ( name, logo_url )`)
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

// --- QUERIES PRIVADAS / DEL DASHBOARD ---

export async function getUserProfile(userId) {
  const supabaseAdmin = createServerComponentClient({ cookies });
  if (!userId) return null;
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("full_name, role")
    .eq("id", userId)
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error.message);
    return null;
  }
  return data;
}

export async function getAllJobsForAdmin() {
  const supabaseAdmin = createServerComponentClient({ cookies });
  const { data, error } = await supabaseAdmin
    .from("jobs")
    .select(`id, title, status, created_at, companies ( name )`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all jobs for admin:", error);
    return [];
  }
  return data;
}

export async function getCompanyList() {
  const supabaseAdmin = createServerComponentClient({ cookies });
  const { data, error } = await supabaseAdmin
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
  const supabaseAdmin = createServerComponentClient({ cookies });
  if (!jobId) return null;
  const { data, error } = await supabaseAdmin
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

export async function getApplicationsForJob(jobId) {
  const supabaseAdmin = createServerComponentClient({ cookies });
  const { data, error } = await supabaseAdmin
    .from('applications')
    .select('*')
    .eq('job_id', jobId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching applications for job ${jobId}:`, error);
    return [];
  }
  return data;
}

export async function getDashboardStats() {
  const supabaseAdmin = createServerComponentClient({ cookies });
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  
  const { count: newLeadsCount } = await supabaseAdmin.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo);
  const { count: activeJobsCount } = await supabaseAdmin.from('jobs').select('*', { count: 'exact', head: true }).eq('status', 'active');
  const { count: totalApplicationsCount } = await supabaseAdmin.from('applications').select('*', { count: 'exact', head: true });
  const { count: totalCompaniesCount } = await supabaseAdmin.from('companies').select('*', { count: 'exact', head: true });

  return {
    newLeads: newLeadsCount || 0,
    activeJobs: activeJobsCount || 0,
    totalApplications: totalApplicationsCount || 0,
    totalCompanies: totalCompaniesCount || 0,
  };
}

export async function getRecentApplications() {
  const supabaseAdmin = createServerComponentClient({ cookies });
  const { data, error } = await supabaseAdmin
    .from('applications')
    .select(`
      id,
      created_at,
      candidate_name,
      jobs (
        id,
        title
      )
    `)
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error fetching recent applications:", error);
    return [];
  }
  return data;
}

export async function getAllLeads() {
  const supabaseAdmin = createServerComponentClient({ cookies });
  const { data, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching leads:', error);
    return [];
  }
  return data;
}

export async function getLeadById(leadId) {
  const supabaseAdmin = createServerComponentClient({ cookies });
  if (!leadId) return null;

  const { data, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single();
  
  if (error) {
    console.error(`Error fetching lead ${leadId}:`, error);
    return null;
  }
  return data;
}

export async function getAllCompanies() {
  const supabaseAdmin = createServerComponentClient({ cookies });
  const { data, error } = await supabaseAdmin
    .from('companies')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching companies:', error);
    return [];
  }
  return data;
}

export async function getCompanyById(companyId) {
  const supabaseAdmin = createServerComponentClient({ cookies });
  if (!companyId) return null;

  const { data, error } = await supabaseAdmin
    .from('companies')
    .select('*')
    .eq('id', companyId)
    .single();
  
  if (error) {
    console.error(`Error fetching company ${companyId}:`, error);
    return null;
  }
  return data;
}

export async function getUniqueCandidates() {
  const supabaseAdmin = createServerComponentClient({ cookies });
  
  // Esta RPC llamará a una función de base de datos que crearemos a continuación.
  // Es la forma más eficiente de obtener los datos que necesitamos.
  const { data, error } = await supabaseAdmin.rpc('get_unique_candidates_with_app_count');

  if (error) {
    console.error('Error fetching unique candidates:', error);
    return [];
  }
  return data;
}

export async function getCandidateDetailsByEmail(email) {
  const supabaseAdmin = createServerComponentClient({ cookies });
  if (!email) return null;

  const { data, error } = await supabaseAdmin
    .from('applications')
    .select(`
      candidate_name,
      candidate_email,
      candidate_phone,
      resume_url,
      created_at,
      jobs (
        id,
        title,
        companies ( name )
      )
    `)
    .eq('candidate_email', email)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching details for candidate ${email}:`, error);
    return null;
  }
  return data;
}

export async function getLegalDocumentForAdmin(slug) {
  const supabaseAdmin = createServerComponentClient({ cookies });
  const { data, error } = await supabaseAdmin
    .from('legal_documents')
    .select('id, slug, title, content') // Obtenemos el objeto JSON completo con ambos idiomas
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching legal doc for admin (${slug}):`, error.message);
    return null;
  }
  return data;
}
