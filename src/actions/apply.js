// RUTA: src/actions/apply.js (REEMPLAZAR ARCHIVO COMPLETO)
'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export async function applyToAction(prevState, formData) {
  const supabase = createServerActionClient({ cookies });

  // 1. Extraer todos los datos del formulario, incluyendo el teléfono
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone'); // <-- NUEVO
  const resumeFile = formData.get('resume');
  const jobId = formData.get('jobId');

  // 2. Validación actualizada
  if (!name || !email || !phone || !resumeFile || resumeFile.size === 0 || !jobId) {
    return { success: false, message: 'Por favor, completa todos los campos requeridos.' };
  }

  // 3. Subida del CV (sin cambios)
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

  // 4. Registrar la aplicación con el nuevo campo de teléfono
  const { error: insertError } = await supabase
    .from('applications')
    .insert({
      job_id: jobId,
      candidate_name: name,   // <-- Nombre de columna actualizado para coincidir con la DB
      candidate_email: email, // <-- Nombre de columna actualizado
      candidate_phone: phone, // <-- NUEVO CAMPO
      resume_url: uploadData.path, // <-- Nombre de columna actualizado
    });

  if (insertError) {
    console.error('Error creating application:', insertError);
    return { success: false, message: 'Hubo un error al registrar tu aplicación.' };
  }

  return { success: true, message: '¡Aplicación enviada con éxito!' };
}   