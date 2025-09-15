// RUTA: src/actions/jobs.js (VERSIÓN LIMPIA Y FINAL)
'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function saveJobAction(jobData) {
  const supabase = createServerActionClient({ cookies });
  const { jobId, ...formData } = jobData;
  const dataToSave = {
    company_id: formData.company_id, status: formData.status, location: formData.location,
    zip_code: formData.zip_code, job_category: formData.job_category, employment_type: formData.employment_type,
    salary_range_min: formData.salary_range_min || null, salary_range_max: formData.salary_range_max || null,
    title: { en: formData.title_en, es: formData.title_es },
    description: { en: formData.description_en, es: formData.description_es },
  };
  let error;
  if (jobId) {
    const { error: updateError } = await supabase.from('jobs').update(dataToSave).eq('id', jobId);
    error = updateError;
  } else {
    const { error: insertError } = await supabase.from('jobs').insert(dataToSave);
    error = insertError;
  }
  if (error) {
    console.error('Error saving job:', error);
    return { success: false, message: `Error saving job data: ${error.message}` };
  }
  revalidatePath('/dashboard/jobs');
  redirect('/dashboard/jobs');
}

export async function toggleJobStatusAction(jobId, currentStatus) {
  const supabase = createServerActionClient({ cookies });
  const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
  const { error } = await supabase.from('jobs').update({ status: newStatus, updated_at: new Date().toISOString() }).eq('id', jobId);
  if (error) {
    console.error('Error toggling job status:', error);
    return { success: false, message: 'Failed to update job status.' };
  }
  revalidatePath('/dashboard/jobs');
  revalidatePath(`/dashboard/jobs/${jobId}`);
  return { success: true, message: `Job status updated to ${newStatus}.` };
}

export async function deleteJobAction(jobId) {
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.from('jobs').delete().eq('id', jobId);
  if (error) {
    console.error('Error deleting job:', error);
    return { success: false, message: 'Failed to delete job.' };
  }
  revalidatePath('/dashboard/jobs');
  return { success: true, message: 'Job successfully deleted.' };
}

export async function getSignedUrlAction(filePath) {
  if (!filePath) return { success: false, message: 'File path is missing.' };
  try {
    const supabase = createServerActionClient({ cookies });
    const { data, error } = await supabase.storage.from('resumes').createSignedUrl(filePath, 300);
    if (error) throw error;
    return { success: true, url: data.signedUrl };
  } catch (error) {
    console.error('Error getting signed URL:', error);
    return { success: false, message: `Server error: ${error.message}` };
  }
}