
# Guía de Integración Backend (Supabase) para WG Labor

**Versión: 3.0 (Definitiva)**
**Autor:** Kerno, Arquitecto Principal de Soluciones

Este documento es la **fuente única de verdad** para la integración entre el frontend de Next.js y el backend de Supabase. Ha sido actualizado para incluir todas las funcionalidades, correcciones de seguridad y flujos de trabajo avanzados.

## 1\. El Principio Fundamental: Confía en el Backend

La arquitectura está diseñada bajo un principio de **"Base de Datos Inteligente"**. Toda la lógica de seguridad (quién puede ver/hacer qué) está gestionada por Row Level Security (RLS) en Supabase.

**Directiva para el Frontend:** Su única responsabilidad es **solicitar los datos**. No implementen lógica de permisos en el cliente. Usen el estado de autenticación (`session`) únicamente para mejorar la UI (ej. mostrar/ocultar botones), pero confíen en que el backend aplicará la seguridad real en cada llamada.

## 2\. Configuración Inicial

El archivo `.env.local` debe contener:

```env
NEXT_PUBLIC_SUPABASE_URL="https://fghilqtcpxqlmbhpuboc.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[Pega tu clave anon aquí]"
```

El cliente de Supabase se inicializa en `src/lib/supabase/client.js`.

## 3\. Autenticación y Gestión de Sesión

El registro público está deshabilitado. Solo existen dos roles de administrador.

**Usuarios:**

  * **Agency Admin (Cliente):** `info@wglaborllc.com` / `[contraseña]`
  * **Super Admin (Soporte):** `[tu_email_de_admin]` / `[contraseña]`

#### Iniciar y Cerrar Sesión

```javascript
// Iniciar Sesión
async function signIn(email, password) {
  return await supabase.auth.signInWithPassword({ email, password });
}

// Cerrar Sesión
async function signOut() {
  return await supabase.auth.signOut();
}
```

#### Recuperación de Contraseña (Flujo Completo)

1.  **Página "Olvidé mi Contraseña":**
    ```javascript
    async function requestPasswordReset(email) {
      const redirectURL = `${window.location.origin}/update-password`;
      return await supabase.auth.resetPasswordForEmail(email, { redirectTo: redirectURL });
    }
    ```
2.  **Página `/update-password`:** Esta página se renderiza cuando el usuario llega desde el enlace de su correo.
    ```javascript
    // Esta función se llama cuando el componente se monta para manejar el token
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        // Aquí puedes mostrar el formulario para la nueva contraseña
      }
    });

    async function updateUserPassword(newPassword) {
      const { data, error } = await supabase.auth.updateUser({ password: newPassword });
      if (!error) { /* Redirigir al login */ }
    }
    ```

## 4\. Endpoints Públicos (Landing Page)

Estas consultas funcionan sin necesidad de que el usuario inicie sesión.

#### Obtener Información del Sitio (Footer/Contacto)

Obtiene los datos de la tabla `site_settings`.

```javascript
async function getSiteInfo() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('company_info')
    .eq('id', 1)
    .single();
  
  if (error) console.error("Error fetching site info:", error);
  return data?.company_info || null;
}
```

#### Obtener Ofertas de Empleo para la Página Principal

Obtiene las 6 ofertas activas más recientes.

```javascript
async function getPublicJobs(language = 'es') {
  const lang = ['es', 'en'].includes(language) ? language : 'es';

  const { data, error } = await supabase
    .from('jobs')
    .select(`
      id,
      title:title->>${lang},
      location,
      companies ( name, logo_url )
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) console.error('Error fetching public jobs:', error);
  return data || [];
}
```

## 5\. Dashboard: Gestión de Empresas (Leads)

El formulario de "Para Empresas" crea un nuevo `lead`.

#### Crear un Nuevo Lead

Esta función puede ser llamada por un usuario anónimo. La política RLS lo permite.

```javascript
async function createLead(leadData) {
  // leadData = { company_name, contact_name, email, phone, message }
  const { data, error } = await supabase.from('leads').insert([leadData]);
  if (error) console.error('Error creating lead:', error);
  return { data, error };
}
```

#### Obtener y Actualizar Leads (Solo Admins)

El dashboard mostrará los leads y permitirá su seguimiento.

```javascript
// Obtener todos los leads
async function getAllLeads() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  return data;
}

// Actualizar un lead (ej. cambiar estado o añadir una nota)
async function updateLead(leadId, newStatus, newNote) {
  // 1. Obtener el lead actual
  const { data: lead } = await supabase.from('leads').select('notes').eq('id', leadId).single();
  if (!lead) return;

  // 2. Preparar la nueva nota
  const noteEntry = {
    author: "Admin Name", // Obtener del perfil del admin logueado
    note: newNote,
    date: new Date().toISOString()
  };

  // 3. Actualizar
  const { data, error } = await supabase
    .from('leads')
    .update({
      status: newStatus,
      notes: [...lead.notes, noteEntry] // Añade la nueva nota al array existente
    })
    .eq('id', leadId);
}
```

## 6\. Dashboard: Gestión de Ofertas (CRUD Completo)

#### Crear/Actualizar una Oferta

El objeto que se envía a Supabase debe incluir los nuevos campos.

```javascript
async function saveJob(jobData) {
  // jobData debe incluir: id (para actualizar), company_id, status, location,
  // zip_code, salary_range_min, salary_range_max,
  // title: { es: "...", en: "..." },
  // description: { es: "...", en: "..." },
  // image_urls: ["url1.jpg", "url2.jpg"] // Array de strings, puede estar vacío []
  
  const { data, error } = await supabase
    .from('jobs')
    .upsert(jobData)
    .select();
    
  return { data, error };
}
```

## 7\. Dashboard: Gestión de Postulaciones y CVs

Este es un flujo de **alta seguridad**.

#### Obtener Postulaciones de una Oferta

```javascript
async function getApplicationsForJob(jobId) {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('job_id', jobId);
  return data;
}
```

#### **Descargar un CV (Flujo de URL Segura)**

No se puede usar la `resume_url` directamente. Se debe solicitar una URL temporal y segura.

**Paso 1: Crear una Función de Servidor (RPC) en Supabase**
Ejecuta esto una vez en el `SQL Editor` de Supabase para crear la función que genera la URL.

```sql
CREATE OR REPLACE FUNCTION get_signed_resume_url(path_to_file TEXT)
RETURNS TEXT AS $$
DECLARE
  role_name TEXT;
BEGIN
  -- Usamos la función segura para verificar el rol del usuario actual
  SELECT public.get_my_role() INTO role_name;

  -- Solo los administradores pueden generar URLs firmadas
  IF role_name IN ('super_admin', 'agency_admin') THEN
    RETURN (
      SELECT sign(
        'resumes', -- Nombre del bucket privado
        path_to_file,
        300 -- La URL expira en 300 segundos (5 minutos)
      ) FROM storage.objects
    );
  ELSE
    -- Si no es admin, devuelve NULL o un error
    RETURN NULL;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Paso 2: Llamar a esta función desde el Frontend**
En el dashboard, cuando un admin haga clic en "Descargar CV":

```javascript
async function getSecureResumeUrl(filePath) {
  const { data, error } = await supabase.rpc('get_signed_resume_url', {
    path_to_file: filePath
  });

  if (error) console.error('Error getting signed URL:', error);
  // 'data' contendrá la URL segura y temporal, lista para usarse en un enlace <a>
  return data;
}
```

## 8\. Notificaciones en Tiempo Real (La Campanita)

Esto permite que el dashboard se actualice sin recargar la página.

**Paso 1: Habilitar la Replicación (Hecho una vez)**
Asegúrate de que la replicación esté **activada** para las tablas `notifications`, `leads` y `applications` en el dashboard de Supabase (`Database` \> `Replication`).

**Paso 2: Escuchar las Notificaciones en el Frontend**
En un componente principal del dashboard (como el Header), usa `useEffect` para suscribirte.

```javascript
// En un componente cliente como DashboardHeader.js
'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function DashboardHeader() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [user, setUser] = useState(null);

  // Obtener usuario y notificaciones iniciales
  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data, count } = await supabase
          .from('notifications')
          .select('*', { count: 'exact' })
          .eq('user_id', user.id)
          .eq('is_read', false);
        
        if (data) setNotifications(data);
        if (count) setUnreadCount(count);
      }
    }
    fetchData();
  }, []);

  // Escuchar en tiempo real
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('notifications-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}` // Escucha solo para el usuario actual
        },
        (payload) => {
          console.log('Nueva notificación:', payload.new);
          setNotifications(current => [payload.new, ...current]);
          setUnreadCount(count => count + 1);
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Función para marcar como leídas
  const markAsRead = async (notificationId) => {
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);
      
    // Actualizar UI
    setUnreadCount(count => count - 1);
  };

  // Renderiza la campanita con el 'unreadCount' y la lista de 'notifications'
  return (/* ... tu JSX aquí ... */);
}
```