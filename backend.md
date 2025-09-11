# Guía de Integración Backend (Supabase) – WG Labor

**Versión:** 3.1 (Unificada y Auditada)
**Autor:** Kerno – Arquitecto Principal de Soluciones

Este documento es la **fuente única de verdad** para la integración entre el frontend (Next.js) y el backend (Supabase). Incluye la implementación oficial, las adiciones del dashboard y los hallazgos de auditoría más recientes (2025-09-11).

---

## 1. Principio Fundamental: Confía en el Backend

La arquitectura sigue el principio de **"Base de Datos Inteligente"**:

* Toda la lógica de seguridad se gestiona con **Row Level Security (RLS)** en Supabase.
* El frontend **solo solicita datos**. No debe implementar lógica de permisos.
* El estado de sesión (`session`) solo se usa para mejorar la UI (mostrar/ocultar botones).

---

## 2. Alcance General y Flujo de Datos

* **Página Pública:**

  * Muestra ofertas de empleo.
  * Captura `leads` mediante un formulario.

* **Dashboard (Acceso Restringido):**

  * Gestiona pipeline de leads (Nuevos → Contactados → Convertidos).
  * Convierte un `lead` en `empresa` oficial.
  * CRUD de empresas y ofertas de empleo.
  * Visualización de postulaciones y descarga segura de CVs.
  * Edición de contenido del sitio (`site_settings`, `legal_documents`).

* **Usuarios:**

  * Registro deshabilitado.
  * Roles disponibles: `super_admin`, `agency_admin`.

---

## 3. Configuración Inicial

En el archivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL="https://fghilqtcpxqlmbhpuboc.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[Pega tu clave anon aquí]"
```

Cliente de Supabase inicializado en `src/lib/supabase/client.js`.

---

## 4. Autenticación y Sesión

Roles definidos:

* **Agency Admin (Cliente):** `info@wglaborllc.com` / `[contraseña]`
* **Super Admin (Soporte):** `[tu_email_de_admin]` / `[contraseña]`

#### Iniciar y cerrar sesión

```javascript
async function signIn(email, password) {
  return await supabase.auth.signInWithPassword({ email, password });
}

async function signOut() {
  return await supabase.auth.signOut();
}
```

#### Recuperación de contraseña

1. **Solicitud de reseteo:**

```javascript
async function requestPasswordReset(email) {
  const redirectURL = `${window.location.origin}/update-password`;
  return await supabase.auth.resetPasswordForEmail(email, { redirectTo: redirectURL });
}
```

2. **Actualización en `/update-password`:**

```javascript
supabase.auth.onAuthStateChange(async (event) => {
  if (event === "PASSWORD_RECOVERY") {
    // mostrar formulario
  }
});

async function updateUserPassword(newPassword) {
  return await supabase.auth.updateUser({ password: newPassword });
}
```

---

## 5. Endpoints Públicos

#### Información del sitio

```javascript
async function getSiteInfo() {
  return await supabase.from('site_settings').select('company_info').eq('id', 1).single();
}
```

#### Ofertas de empleo recientes

```javascript
async function getPublicJobs(language = 'es') {
  const lang = ['es','en'].includes(language) ? language : 'es';
  return await supabase
    .from('jobs')
    .select(`id, title:title->>${lang}, location, companies(name, logo_url)`)
    .eq('status','active')
    .order('created_at',{ ascending:false })
    .limit(6);
}
```

#### Crear lead (anónimo permitido)

```javascript
async function createLead(leadData) {
  return await supabase.from('leads').insert([leadData]);
}
```

---

## 6. Dashboard: Leads y Empresas

#### Leads

```javascript
async function getAllLeads() {
  return await supabase.from('leads').select('*').order('created_at',{ ascending:false });
}

async function updateLead(leadId, newStatus, newNote) {
  const { data: lead } = await supabase.from('leads').select('notes').eq('id', leadId).single();
  const noteEntry = { author: "Admin Name", note: newNote, date: new Date().toISOString() };
  return await supabase.from('leads').update({ status:newStatus, notes:[...lead.notes,noteEntry]}).eq('id',leadId);
}
```

#### Empresas

```javascript
async function createCompany(companyData) {
  return await supabase.from('companies').insert([companyData]).select().single();
}

async function updateCompany(companyId, updatedData) {
  return await supabase.from('companies').update(updatedData).eq('id', companyId);
}

async function deleteCompany(companyId) {
  return await supabase.from('companies').delete().eq('id', companyId);
}
```

#### Conversión de lead a empresa

```javascript
async function convertLeadToCompany(leadId) {
  return await supabase.rpc('convert_lead_to_company',{ p_lead_id: leadId });
}
```

---

## 7. Dashboard: Ofertas (CRUD)

```javascript
async function saveJob(jobData) {
  return await supabase.from('jobs').upsert(jobData).select();
}
```

---

## 8. Dashboard: Postulaciones y CVs

#### Obtener postulaciones

```javascript
async function getApplicationsForJob(jobId) {
  return await supabase.from('applications').select('*').eq('job_id', jobId);
}
```

#### Descarga segura de CV

* **RPC en Supabase:** `get_signed_resume_url(path_to_file TEXT)`
* Genera una URL firmada válida por 5 minutos.
* Solo accesible para `super_admin` y `agency_admin`.

```javascript
async function getSecureResumeUrl(filePath) {
  return await supabase.rpc('get_signed_resume_url',{ path_to_file:filePath });
}
```

---

## 9. Dashboard: Contenido del Sitio

```javascript
async function updateSiteSettings(newInfoObject) {
  return await supabase.from('site_settings').update({ company_info:newInfoObject }).eq('id',1);
}

async function getLegalDocument(slug, language='es') {
  return await supabase.from('legal_documents')
    .select(`title:title->>${language}, content:content->>${language}`)
    .eq('slug',slug).single();
}

async function updateLegalDocument(id,newTitleObject,newContentObject) {
  return await supabase.from('legal_documents').update({
    title:newTitleObject, content:newContentObject
  }).eq('id',id);
}
```

---

## 10. Notificaciones en Tiempo Real

* Replicación habilitada en `notifications`, `leads`, `applications`.
* Suscripción en frontend:

```javascript
const channel = supabase.channel('notifications-channel')
  .on('postgres_changes',{
    event:'INSERT', schema:'public', table:'notifications',
    filter:`user_id=eq.${user.id}`
  }, (payload) => { /* actualizar estado */ })
  .subscribe();
```

---

## 11. Automatización del Backend (Triggers)

* **jobs → BEFORE UPDATE → set\_jobs\_timestamp**

  * Actualiza `updated_at` automáticamente.

* **leads → AFTER INSERT → on\_new\_lead\_notification**

  * Inserta registro en `notifications` para alertar a admins.

---

## 12. Tablas Adicionales

* **company\_members**

  * Tabla pivote `profiles ↔ companies`.
  * Columnas: `company_id`, `user_id`, `role` (`owner`, `member`).
  * Preparada para permisos granulares en futuras versiones.


---

## 13. Estrategia de Seguridad (Row Level Security - RLS)

Esta sección detalla las políticas de seguridad que garantizan que los datos solo sean accesibles por los usuarios correctos. Todas las tablas con datos sensibles deben tener RLS habilitado y políticas definidas.

**Confirmar siempre estas políticas con la salida del script de auditoría SQL.**

* **Tabla `profiles`**
    * **RLS Habilitado:** Sí
    * **Políticas:**
        * `SELECT`: Los usuarios solo pueden ver su propio perfil (`auth.uid() = id`).
        * `UPDATE`: Los usuarios solo pueden actualizar su propio perfil (`auth.uid() = id`).

* **Tabla `jobs`**
    * **RLS Habilitado:** Sí
    * **Políticas:**
        * `SELECT`: El acceso es público (`true`) para que todos puedan ver las ofertas. Las consultas del frontend deben filtrar por `status = 'active'`.
        * `INSERT`, `UPDATE`, `DELETE`: Permitido solo para usuarios autenticados con rol de administrador (`auth.role() = 'authenticated'`).

* **Tabla `leads`**
    * **RLS Habilitado:** Sí
    * **Políticas:**
        * `INSERT`: El acceso es público (`true`) para permitir que el formulario de la página principal funcione para cualquier visitante.
        * `SELECT`, `UPDATE`, `DELETE`: Permitido solo para administradores.

* **Tabla `applications` y Bucket `resumes`**
    * **RLS Habilitado:** Sí
    * **Políticas:**
        * `applications (INSERT)`: El acceso debe ser público para que los candidatos puedan postularse.
        * `applications (SELECT, UPDATE)`: Permitido solo para administradores.
        * `storage.objects | resumes (SELECT)`: Permitido solo para administradores (verificado dentro de la función `get_signed_resume_url`).
        * `storage.objects | resumes (INSERT)`: El acceso debe ser público.

* **(Otras tablas como `companies`, `notifications`, etc.)**
    * **RLS Habilitado:** Sí
    * **Políticas:** Acceso completo (CRUD) restringido únicamente a usuarios autenticados como administradores.

__________________________________________________________________________------------------------------______________________________
# 📌 WG Labor – Backend Cheat Sheet (Supabase)

**Roles válidos:**

* `super_admin`
* `agency_admin`

---

## 🔑 Autenticación

```javascript
// Login
await supabase.auth.signInWithPassword({ email, password });

// Logout
await supabase.auth.signOut();

// Reset Password
await supabase.auth.resetPasswordForEmail(email, { redirectTo: '/update-password' });

// Update Password
await supabase.auth.updateUser({ password: newPassword });
```

---

## 🌍 Público (sin login)

```javascript
// Info del sitio
await supabase.from('site_settings').select('company_info').eq('id',1).single();

// Ofertas recientes (máx 6)
await supabase.from('jobs')
  .select(`id, title:title->>es, location, companies(name, logo_url)`)
  .eq('status','active')
  .order('created_at',{ ascending:false })
  .limit(6);

// Crear lead
await supabase.from('leads').insert([leadData]);
```

---

## 🏢 Leads y Empresas

```javascript
// Leads
await supabase.from('leads').select('*').order('created_at',{ ascending:false });
await supabase.from('leads').update({ status, notes }).eq('id', leadId);

// Empresas
await supabase.from('companies').insert([companyData]).select().single();
await supabase.from('companies').update(updatedData).eq('id', companyId);
await supabase.from('companies').delete().eq('id', companyId);

// Convertir lead a empresa
await supabase.rpc('convert_lead_to_company', { p_lead_id: leadId });
```

---

## 💼 Ofertas (CRUD)

```javascript
await supabase.from('jobs').upsert(jobData).select();
```

---

## 📄 Postulaciones y CVs

```javascript
// Todas las postulaciones
await supabase.from('applications')
  .select('*, jobs(title), companies(name)')
  .order('created_at',{ ascending:false });

// Postulación por ID
await supabase.from('applications')
  .select('*, jobs(*, companies(*))')
  .eq('id', applicationId)
  .single();

// URL segura de CV
await supabase.rpc('get_signed_resume_url', { path_to_file: filePath });
```

---

## ⚙️ Contenido del Sitio

```javascript
// Actualizar info del sitio
await supabase.from('site_settings').update({ company_info }).eq('id',1);

// Documento legal (público)
await supabase.from('legal_documents')
  .select(`title:title->>es, content:content->>es`)
  .eq('slug','privacy-policy')
  .single();

// Actualizar documento legal
await supabase.from('legal_documents')
  .update({ title, content })
  .eq('id', id);
```

---

## 🔔 Notificaciones en Tiempo Real

```javascript
const channel = supabase.channel('notifications-channel')
  .on('postgres_changes',{
    event:'INSERT', schema:'public', table:'notifications',
    filter:`user_id=eq.${user.id}`
  }, (payload) => { /* manejar nueva notificación */ })
  .subscribe();
```

---

## 🛠️ Automatizaciones (Triggers – solo backend)

* `jobs`: `BEFORE UPDATE` → actualiza `updated_at`.
* `leads`: `AFTER INSERT` → inserta notificación automática.

---
