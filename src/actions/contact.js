// RUTA: src/actions/contact.js (REEMPLAZAR ARCHIVO COMPLETO)
'use server';

// AJUSTE: Importamos el cliente correcto para Server Actions
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function createLeadAction(prevState, formData) {
  // AJUSTE: Creamos una instancia de Supabase segura para el servidor
  const supabase = createServerActionClient({ cookies });

  const name = formData.get('name');
  const company = formData.get('company');
  const email = formData.get('email');
  const message = formData.get('message');

  // Validación simple en el servidor
  if (!name || !email || !message) {
    return { success: false, message: 'Por favor, completa todos los campos requeridos.' };
  }

  const { data, error } = await supabase
    .from('leads')
    .insert([{ 
        name, 
        company_name: company, 
        email, 
        message,
        status: 'new' // Estado inicial del lead
    }]);

  if (error) {
    console.error('Error creating lead:', error);
    return { success: false, message: 'Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.' };
  }

  return { success: true, message: '¡Gracias! Tu mensaje ha sido enviado con éxito.' };
}