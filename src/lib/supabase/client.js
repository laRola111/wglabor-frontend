// En el archivo donde haces createClient, ej: src/lib/supabase/client.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// --- AÑADE ESTAS LÍNEAS PARA DEPURAR ---
console.log("Intentando inicializar Supabase. URL:", supabaseUrl);
console.log("La clave Anon existe:", !!supabaseAnonKey); // Usamos '!!' para no imprimir la clave real en los logs.
// ------------------------------------

export const supabase = createClient(supabaseUrl, supabaseAnonKey)