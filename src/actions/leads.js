// RUTA: src/actions/leads.js (NUEVO ARCHIVO)
'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getUserProfile } from '../lib/supabase/queries';
import { redirect } from 'next/navigation';

export async function updateLeadAction(leadId, newStatus, newNote) {
  const supabase = createServerActionClient({ cookies });

  // Validación básica
  if (!leadId || !newStatus) {
    return { success: false, message: 'Lead ID and status are required.' };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    const profile = await getUserProfile(user.id);
    const authorName = profile?.full_name || user.email;

    let updateData = { status: newStatus };

    // Solo añadimos una nota si el usuario ha escrito algo
    if (newNote && newNote.trim() !== '') {
      const { data: lead } = await supabase.from('leads').select('notes').eq('id', leadId).single();
      const existingNotes = lead?.notes || [];
      const noteEntry = {
        author: authorName,
        note: newNote.trim(),
        date: new Date().toISOString()
      };
      updateData.notes = [...existingNotes, noteEntry];
    }
    
    const { error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', leadId);

    if (error) throw error;

    revalidatePath(`/dashboard/leads`);
    revalidatePath(`/dashboard/leads/${leadId}`);
    return { success: true, message: 'Lead updated successfully.' };

  } catch (error) {
    console.error('Error updating lead:', error);
    return { success: false, message: `Failed to update lead: ${error.message}` };
  }
}

export async function convertLeadToCompanyAction(leadId) {
  if (!leadId) {
    return { success: false, message: 'Lead ID is missing.' };
  }

  const supabase = createServerActionClient({ cookies });

  try {
    // Llamamos a la función RPC que acabamos de crear en la base de datos
    const { data: newCompanyId, error } = await supabase.rpc('convert_lead_to_company', {
      p_lead_id: leadId,
    });

    if (error) throw error;

    // Si la RPC tiene éxito, nos devuelve el ID de la nueva compañía
    revalidatePath('/dashboard/leads');
    revalidatePath('/dashboard/companies');

    // La redirección la manejaremos en el cliente para una mejor UX,
    // pero devolvemos el ID para que el cliente sepa a dónde ir.
    return { success: true, message: 'Lead converted successfully!', newCompanyId };

  } catch (error) {
    console.error('Error converting lead to company:', error);
    return { success: false, message: `Failed to convert lead: ${error.message}` };
  }
}