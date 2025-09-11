// CREAR NUEVO ARCHIVO: src/actions/contact.js
'use server';

import { supabase } from "@/lib/supabase/client";

export async function createLeadAction(prevState, formData) {
  const name = formData.get('name');
  const company = formData.get('company');
  const email = formData.get('email');
  const message = formData.get('message');

  // Validación simple en el servidor
  if (!name || !email || !message) {
    return { success: false, message: 'Please fill out all required fields.' };
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
    return { success: false, message: 'There was an error submitting your message. Please try again.' };
  }

  return { success: true, message: 'Thank you! Your message has been sent successfully.' };
}