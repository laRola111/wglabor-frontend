// RUTA: src/actions/companies.js (REEMPLAZAR ARCHIVO COMPLETO)
'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * Acción para el MODAL de creación rápida.
 * Crea una empresa y DEVUELVE el nuevo objeto de la compañía.
 */
export async function createCompanyAction(companyName) {
  if (!companyName || typeof companyName !== 'string' || companyName.trim().length < 3) {
    return { success: false, message: 'Company name must be at least 3 characters long.' };
  }

  const supabase = createServerActionClient({ cookies });

  const { data, error } = await supabase
    .from('companies')
    .insert({ name: companyName.trim() })
    .select()
    .single();

  if (error) {
    console.error('Error creating company:', error);
    if (error.code === '23505') {
      return { success: false, message: 'A company with this name already exists.' };
    }
    return { success: false, message: 'Failed to create company.' };
  }
  
  revalidatePath('/dashboard/jobs'); // Revalidamos para que el dropdown se actualice en futuras cargas
  return { success: true, message: 'Company created successfully.', company: data };
}


/**
 * Acción para el FORMULARIO de página completa (Crear/Editar).
 * Guarda los datos y REDIRIGE al usuario.
 */
export async function saveCompanyAction(companyData) {
  const supabase = createServerActionClient({ cookies });
  
  const { companyId, ...formData } = companyData;

  const dataToSave = {
    name: formData.name,
    contact_email: formData.contact_email,
    contact_phone: formData.contact_phone,
    website: formData.website,
  };

  let error;
  if (companyId) {
    const { error: updateError } = await supabase.from('companies').update(dataToSave).eq('id', companyId);
    error = updateError;
  } else {
    const { error: insertError } = await supabase.from('companies').insert(dataToSave);
    error = insertError;
  }

  if (error) {
    console.error('Error saving company:', error);
    return { success: false, message: `Error saving company data: ${error.message}` };
  }
  
  revalidatePath('/dashboard/companies');
  revalidatePath(`/dashboard/companies/${companyId}/edit`);
  redirect('/dashboard/companies');
}

export async function deleteCompanyAction(companyId) {
  if (!companyId) {
    return { success: false, message: 'Company ID is missing.' };
  }
  
  const supabase = createServerActionClient({ cookies });

  try {
    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', companyId);
    
    if (error) throw error;

    revalidatePath('/dashboard/companies');
    return { success: true, message: 'Company deleted successfully.' };

  } catch (error) {
    console.error('Error deleting company:', error);
    // Error de restricción de clave externa (la empresa tiene trabajos asociados)
    if (error.code === '23503') {
      return { success: false, message: 'Cannot delete this company because it has associated job listings.' };
    }
    return { success: false, message: `Failed to delete company: ${error.message}` };
  }
}