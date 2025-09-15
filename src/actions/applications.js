// RUTA: src/actions/applications.js (NUEVO ARCHIVO)
'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function deleteApplicationAction(applicationId, resumePath) {
  if (!applicationId || !resumePath) {
    return { success: false, message: 'Application ID or resume path is missing.' };
  }

  const supabase = createServerActionClient({ cookies });

  try {
    // Paso 1: Eliminar el archivo del CV de Supabase Storage
    const { error: storageError } = await supabase
      .storage
      .from('resumes')
      .remove([resumePath]);

    if (storageError) {
      // Si el archivo no se encuentra, no es un error fatal, podemos continuar para borrar el registro.
      if (storageError.statusCode !== '404') {
          throw storageError;
      }
    }

    // Paso 2: Eliminar el registro de la postulación de la base de datos
    const { error: dbError } = await supabase
      .from('applications')
      .delete()
      .eq('id', applicationId);

    if (dbError) throw dbError;

    // Revalidamos la página del candidato para que se actualice la lista
    revalidatePath('/dashboard/candidates', 'layout');

    return { success: true, message: 'Application deleted successfully.' };

  } catch (error) {
    console.error('Error deleting application:', error);
    return { success: false, message: `Failed to delete application: ${error.message}` };
  }
}