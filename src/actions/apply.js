// RUTA: src/actions/apply.js (AÑADIR UN CONSOLE.LOG)
'use server';

import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

export async function applyToAction(prevState, formData) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } }
  );

  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const resumeFile = formData.get('resume');
  const jobId = formData.get('jobId');

  if (!name || !email || !phone || !resumeFile || resumeFile.size === 0 || !jobId) {
    return { success: false, message: 'Por favor, completa todos los campos requeridos.' };
  }

  const fileExtension = resumeFile.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtension}`;
  
  const { data: uploadData, error: uploadError } = await supabase
    .storage
    .from('resumes')
    .upload(fileName, resumeFile);

  if (uploadError) {
    console.error('Error uploading resume:', uploadError);
    return { success: false, message: 'Hubo un error al subir tu CV. Intenta de nuevo.' };
  }

  // --- PUNTO DE CONTROL 1 ---
  // Vamos a ver exactamente qué estamos guardando.
  console.log(`[UPLOAD ACTION] Path saved to DB: "${uploadData.path}"`);

  const { error: insertError } = await supabase
    .from('applications')
    .insert({
      job_id: jobId,
      candidate_name: name,
      candidate_email: email,
      candidate_phone: phone,
      resume_url: uploadData.path,
    });

  if (insertError) {
    console.error('Error creating application:', insertError);
    return { success: false, message: 'Hubo un error al registrar tu aplicación.' };
  }

  return { success: true, message: '¡Aplicación enviada con éxito!' };
}