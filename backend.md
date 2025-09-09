# Guía de Integración Backend (Supabase) para WG Labor

**Versión: 2.0**

Este documento describe cómo conectar y consumir el backend de Supabase desde la aplicación frontend (Next.js).

## Alcance de la Versión 1 (MVP)

Esta primera versión de la plataforma se centra en la funcionalidad principal con un alcance bien definido:

* **Página Pública:** Muestra una lista de ofertas de empleo activas que pueden ser filtradas.
* **Dashboard de Administración:** Un panel privado para la gestión de ofertas y candidatos.
* **Gestión de Usuarios:**
    * El registro público de usuarios (empresas o candidatos) está **DESHABILITADO**.
    * Los únicos usuarios con acceso al dashboard son los administradores pre-configurados (`super_admin` y `agency_admin`).
    * No existe funcionalidad de perfiles públicos para empresas o candidatos en esta versión.

## 1. Configuración del Entorno

Asegúrate de que tu archivo `.env.local` en la raíz del proyecto contenga las siguientes variables:

```env
NEXT_PUBLIC_SUPABASE_URL="https://[tu_id_de_proyecto].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[tu_anon_key_de_supabase]"
```

## 2. Cliente de Supabase

Utiliza un singleton para instanciar el cliente de Supabase y poder usarlo en toda la aplicación.

**`lib/supabaseClient.js`**
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## 3. Autenticación

El acceso al dashboard está restringido a los usuarios administradores.

**Usuarios de Prueba:**
* **Agency Admin (Cliente):** `info@wglaborllc.com` / `[contraseña]`
* **Super Admin (Soporte):** `[tu_email_de_admin]` / `[contraseña]`

**Ejemplos de Funciones:**

```javascript
// Iniciar Sesión
async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  // ... manejo de errores y estado
}

// Cerrar Sesión
async function signOut() {
  const { error } = await supabase.auth.signOut();
}
```

### **Recuperación de Contraseña (Detalle Importante)**

Gracias a la configuración de SMTP con Resend, el flujo de recuperación de contraseña está listo para ser implementado en el frontend.

**Flujo de Implementación:**
1.  **Crear una página de "Olvidé mi contraseña"** con un campo para el email.
2.  Al enviar el formulario, llamar a la siguiente función:

    ```javascript
    // En la página de "Olvidé mi contraseña"
    async function requestPasswordReset(email) {
      // La URL de redirección es a donde Supabase enviará al usuario DESPUÉS de hacer clic en el enlace del correo.
      // DEBE ser una página en tu aplicación donde implementarás el paso 3.
      const redirectURL = `${window.location.origin}/update-password`;
      
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectURL,
      });

      if (!error) {
        // Mostrar un mensaje de éxito al usuario: "Se ha enviado un correo..."
      }
    }
    ```
3.  **Crear la página `/update-password`**. Esta página se activará cuando el usuario haga clic en el enlace de su correo. Supabase incluirá un `access_token` en la URL. El frontend debe:
    * Detectar el token de la URL.
    * Presentar un formulario con "Nueva Contraseña" y "Confirmar Contraseña".
    * Al enviar, llamar a la función para actualizar el usuario:

    ```javascript
    // En la página /update-password
    async function updateUserPassword(newPassword) {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (!error) {
        // Contraseña actualizada con éxito. Redirigir al login.
      }
    }
    ```

## 4. Consultas de Datos (CRUD con i18n)

La base de datos ahora soporta campos multi-idioma (`title`, `description`) usando `JSONB`. Así es como se deben consultar.

**Ejemplo de Objeto `job` en la base de datos:**
```json
{
  "id": 1,
  "status": "active",
  "title": { "en": "Lead Developer", "es": "Desarrollador Principal" },
  "description": { "en": "Description...", "es": "Descripción..." }
}
```

**Consultas desde el Frontend:**

```javascript
// OBTENER ofertas públicas en un idioma específico (ej. inglés)
// El operador '->>' extrae el texto del JSON.
async function getPublicJobs(language = 'es') { // 'es' o 'en'
  const { data: jobs, error } = await supabase
    .from('jobs')
    .select(`
      id,
      title:title->>${language},
      description:description->>${language},
      location,
      salary_range_min,
      salary_range_max,
      companies ( name )
    `)
    .eq('status', 'active');
  return jobs;
}


// OBTENER una oferta con todos sus datos para el formulario de edición (Admins)
// Obtenemos el objeto JSON completo para poblar ambos campos (EN y ES)
async function getJobForEditing(jobId) {
    const { data: job, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', jobId)
    .single(); // .single() para obtener un solo objeto en lugar de un array
  return job;
}


// CREAR/ACTUALIZAR una oferta de empleo (Admins)
// El objeto que se envía a Supabase debe tener la estructura JSON correcta.
async function saveJob(jobData) {
  // jobData debe ser un objeto como este:
  const newJob = {
    company_id: 1,
    status: 'draft',
    location: 'Ciudad de México',
    salary_range_min: 50000,
    salary_range_max: 60000,
    title: { // Objeto JSON
      es: "Título en Español",
      en: "Title in English"
    },
    description: { // Objeto JSON
      es: "Descripción detallada en español...",
      en: "Detailed description in English..."
    }
  };

  // Para actualizar, el objeto `newJob` también debe incluir el `id` del job.
  const { data, error } = await supabase
    .from('jobs')
    .upsert(newJob) // .upsert() crea si no existe, o actualiza si el id ya existe.
    .select();
    
  return { data, error };
}
```