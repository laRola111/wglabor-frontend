// RUTA: src/actions/settings.js (NUEVO ARCHIVO)
'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// Acción para actualizar la información de contacto y redes sociales
export async function updateSiteSettingsAction(currentState, formData) {
  const supabase = createServerActionClient({ cookies });

  const newSettings = {
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    social_media: {
      tiktok: formData.get('tiktok'),
      instagram: formData.get('instagram'),
      facebook: formData.get('facebook'),
    }
  };

  const { error } = await supabase
    .from('site_settings')
    .update({ company_info: newSettings })
    .eq('id', 1);

  if (error) {
    console.error('Error updating site settings:', error);
    return { success: false, message: `Error: ${error.message}` };
  }

  revalidatePath('/', 'layout'); // Revalidar todo el sitio para que el footer se actualice
  return { success: true, message: 'Site information updated successfully!' };
}


// Acción para actualizar un documento legal
export async function updateLegalDocumentAction(currentState, formData) {
    const supabase = createServerActionClient({ cookies });
    const docId = formData.get('id');

    const dataToUpdate = {
        title: {
            en: formData.get('title_en'),
            es: formData.get('title_es'),
        },
        content: {
            en: formData.get('content_en'),
            es: formData.get('content_es'),
        }
    };

    const { error } = await supabase
        .from('legal_documents')
        .update(dataToUpdate)
        .eq('id', docId);

    if (error) {
        console.error('Error updating legal document:', error);
        return { success: false, message: `Error: ${error.message}` };
    }

    revalidatePath('/(public)/[lang]/[slug]', 'page');
    return { success: true, message: 'Legal document updated successfully!' };
}