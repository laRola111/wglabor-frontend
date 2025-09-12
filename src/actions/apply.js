// RUTA: src/actions/apply.js (REEMPLAZAR ARCHIVO COMPLETO)
'use server';

// AJUSTE: Importamos el createClient estándar en lugar del de auth-helpers
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

export async function applyToAction(prevState, formData) {
  // AJUSTE: Creamos un cliente de Supabase con privilegios de administrador (service_role)
  // Esto es seguro porque este código SÓLO se ejecuta en el servidor.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
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
  
  // Con el cliente de servicio, esta operación ahora tendrá los permisos necesarios
  const { data: uploadData, error: uploadError } = await supabase
    .storage
    .from('resumes')
    .upload(fileName, resumeFile);

  if (uploadError) {
    console.error('Error uploading resume:', uploadError);
    return { success: false, message: 'Hubo un error al subir tu CV. Intenta de nuevo.' };
  }

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