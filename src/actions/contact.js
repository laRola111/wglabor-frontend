// RUTA: src/actions/contact.js (ACTUALIZADO CON VALIDACIÓN)
'use server';

import { createClient } from '@supabase/supabase-js';

export async function createLeadAction(prevState, formData) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const name = formData.get('name');
  const company = formData.get('company');
  const email = formData.get('email');
  const phone = formData.get('phone'); // Capturamos el nuevo campo
  const message = formData.get('message');

  // --- LÓGICA DE VALIDACIÓN MEJORADA ---
  if (!name || !message) {
    return { success: false, message: 'El nombre y el mensaje son requeridos.' };
  }
  // Se valida que al menos uno de los dos campos de contacto esté presente
  if (!email && !phone) {
    return { success: false, message: 'Por favor, proporciona un email o un número de teléfono.' };
  }

  const { data, error } = await supabase
    .from('leads')
    .insert([{ 
        contact_name: name,
        company_name: company, 
        email: email || null, // Guardamos null si está vacío
        phone: phone || null, // Guardamos null si está vacío
        message,
        status: 'new'
    }]);

  if (error) {
    console.error('---[ERROR DE SUPABASE]---:', error);
    return { success: false, message: 'Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.' };
  }

  return { success: true, message: '¡Gracias! Tu mensaje ha sido enviado con éxito.' };
}