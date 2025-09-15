// RUTA: src/actions/jobs.js
'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// ACCIÓN PARA CREAR Y ACTUALIZAR (UPSERT)
export async function saveJobAction(prevState, formData) {
  const supabase = createServerActionClient({ cookies });
  const jobId = formData.get('jobId'); 

  const jobData = {
    ...(jobId && { id: jobId }),
    company_id: formData.get('company_id'),
    status: formData.get('status'),
    location: formData.get('location'),
    zip_code: formData.get('zip_code'),
    job_category: formData.get('job_category'),
    employment_type: formData.get('employment_type'),
    salary_range_min: formData.get('salary_range_min') || null,
    salary_range_max: formData.get('salary_range_max') || null,
    title: { en: formData.get('title_en'), es: formData.get('title_es') },
    description: { en: formData.get('description_en'), es: formData.get('description_es') },
  };

  const { error } = await supabase.from('jobs').upsert(jobData);

  if (error) {
    console.error('Error saving job:', error);
    return { success: false, message: 'Error saving job data.' };
  }
  
  revalidatePath('/dashboard/jobs');
  redirect('/dashboard/jobs');
}

// ACCIÓN PARA CAMBIAR EL ESTADO (ACTIVAR/DESACTIVAR)
export async function toggleJobStatusAction(jobId, currentStatus) {
  const supabase = createServerActionClient({ cookies });
  const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

  const { error } = await supabase
    .from('jobs')
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('id', jobId);
  
  if (error) {
    console.error('Error toggling job status:', error);
    return { success: false, message: 'Failed to update job status.' };
  }

  revalidatePath('/dashboard/jobs');
  revalidatePath(`/dashboard/jobs/${jobId}`);
  return { success: true, message: `Job status updated to ${newStatus}.` };
}

// ACCIÓN PARA ELIMINAR
export async function deleteJobAction(jobId) {
  const supabase = createServerActionClient({ cookies });
  
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', jobId);

  if (error) {
    console.error('Error deleting job:', error);
    return { success: false, message: 'Failed to delete job.' };
  }

  revalidatePath('/dashboard/jobs');
  return { success: true, message: 'Job successfully deleted.' };
}