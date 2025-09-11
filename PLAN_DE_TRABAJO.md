# **PLAN DE TRABAJO ESTRATÉGICO - WGLABOR FRONTEND (v4)**

**Versión:** 4.0
**Estado:** En Desarrollo
**Última Actualización:** 2025-09-11

Este documento es la **fuente única de verdad** para la hoja de ruta y el estado actual del proyecto.

---

## **FASE 1: FUNDAMENTOS Y LANDING PAGE (EN PROGRESO)**

**Objetivo:** Establecer la arquitectura del proyecto, la UI principal, la conexión con el backend y una landing page completa y funcional.

* **[x]** **Task 1.1: Inicialización del Proyecto**: Configuración de Next.js, TypeScript, Tailwind CSS.
* **[x]** **Task 1.2: Estructura de Rutas y i18n**: Implementación de rutas dinámicas `/[lang]` y `getDictionary`/layout.js, larola111/wglabor-frontend/wglabor-frontend-4254d1dc1aeb29cf07379e2d0c16ec69d8c3259b/src/lib/dictionaries.js].
* **[x]** **Task 1.3: UI Shell (Header & Footer)**: Creación de componentes responsivos y dinámicos.
* **[x]** **Task 1.4: Conexión con Supabase**: Configuración del cliente y variables de entorno.
* **[x]** **Task 1.5: Datos Dinámicos en UI Shell**: El Footer carga datos de contacto desde la tabla `site_settings`.
* **[x]** **Task 1.6: Poblar Base de Datos**: Inserción de datos de prueba para empleos y empresas.
* **[x]** **Task 1.7: Listado de Empleos en Inicio**: La página de inicio muestra empleos recientes con `status = 'active'`/page.js].
* **[/]** **Task 1.8: Completar y Mejorar Secciones de Landing Page (TAREA ACTUAL)**:
    * **[/]** Sub-task 1.8.1: Diseñar y crear componente `CompaniesSection`.
    * **[/]** Sub-task 1.8.2: Diseñar y crear componente `TipsSection`.
    * **[/]** Sub-task 1.8.3: Diseñar y crear componente `ContactSection`.
    * **[x]** Sub-task 1.8.4: Integrar las nuevas secciones en la página de inicio.
* **[ ]** **Task 1.9: Crear Páginas de Contenido Legal (NUEVO)**
    * **[ ]** Crear ruta dinámica src/app/(public)/[lang]/[slug]/page.js.
    * **[ ]** Implementar lógica para obtener datos de getLegalDocument basado en el slug.
    * **[ ]** Maquetar la página para mostrar título y contenido HTML de forma segura.
* **[ ]** **Task 1.10: Enriquecer Landing Page con Nuevas Secciones (NUEVO)**
    * **[ ]** Sub-task 1.10.1: Crear y estilizar AboutUsSection.
    * **[ ]** Sub-task 1.10.2: Crear y estilizar GallerySection.
    * **[ ]** Sub-task 1.10.3: Integrar nuevas secciones en la página de inicio.
* **[ ]** **Task 1.11: Implementar Formulario de Captura de Leads (NUEVO)**
    * **[ ]** Sub-task 1.11.1: Crear Server Action createLeadAction.
    * **[ ]** Sub-task 1.11.2: Construir ContactForm con useFormState.
    * **[ ]** Sub-task 1.11.3: Reemplazar ContactSection con la versión funcional.
    * **[ ]** Sub-task 1.11.4: Añadir información de contacto para candidatos.
---

## **FASE 2: FUNCIONALIDAD DE BÚSQUEDA DE EMPLEO (PRÓXIMA FASE)**

**Objetivo:** Construir la experiencia central para el buscador de empleo, permitiendo encontrar, filtrar y ver ofertas.

* **[ ]** **Task 2.1: Página de Búsqueda de Empleos (`/jobs`)**
    * **[ ]** Crear la estructura de la página en `src/app/(public)/[lang]/jobs/page.js`/jobs/page.js].
    * **[ ]** Diseñar el layout responsivo: panel de filtros (`FilterSidebar`) a la izquierda, lista de resultados (`JobCard`) a la derecha.

* **[ ]** **Task 2.2: Lógica de Búsqueda y Filtros**
    * **[ ]** Conectar el `JobSearchBar` del Home para que redirija a `/jobs` con los parámetros de búsqueda en la URL (query params).
    * **[ ]** Extender la función `getPublicJobs` en `queries.js` para que acepte y aplique filtros de `keyword`, `location`, etc.
    * **[ ]** Leer los query params en la página `/jobs` usando `searchParams` para ejecutar la búsqueda al cargar.
    * **[ ]** Añadir filtros adicionales en `FilterSidebar.js` (ej. por empresa, tipo de jornada) y actualizar la URL sin recargar la página.
    * **[ ]** Asegurar que getPublicJobs en queries.js utilice los options para filtrar por keyword y location (Realizado en Paso 1).
    * **[ ]** Leer los searchParams en la página /jobs para ejecutar la búsqueda.

* **[ ]** **Task 2.3: Paginación de Resultados**
    * **[ ]** Implementar la lógica de paginación en `getPublicJobs` usando `.range()` de Supabase.
    * **[ ]** Crear un componente `Pagination.js` que genere los enlaces de página (Anterior, Siguiente, números) basado en el conteo total de resultados.

* **[ ]** **Task 2.4: Página de Detalle del Empleo (`/jobs/[id]`)**
    * **[ ]** Utilizar la ruta dinámica existente `src/app/(public)/[lang]/jobs/[id]/page.js`/jobs/[id]/page.js].
    * **[ ]** Asegurar que la consulta `getJobById` obtiene todos los detalles necesarios.
    * **[ ]** Diseñar y maquetar la página de detalle (`JobDetailClient.js`) para mostrar la información completa del empleo de forma atractiva.

* **[ ]** **Task 2.5: Flujo de Aplicación a Oferta (NUEVO)**
    * **[ ]** Diseñar modal o página de aplicación (/jobs/[id]/apply).
    * **[ ]** Crear formulario (nombre, email, teléfono, CV).
    * **[ ]** Implementar la lógica de subida segura del CV a Supabase Storage.
    * **[ ]** Implementar la inserción de datos en la tabla applications.
---

## **FASE 3: DASHBOARD - GESTIÓN DE OFERTAS (FUTURO)**

**Objetivo:** Construir el núcleo del sistema, permitiendo la administración completa de las ofertas de empleo.

* **[x]** **Task 3.1: Flujo de Autenticación y Layout Básico**
    * **[x]** Página de Login (`/login`) creada y funcional.
    * **[x]** `middleware.js` protege las rutas del dashboard y gestiona la sesión.
    * **[x]** Layout principal del admin con header y botón `signOut` implementado.
    * **[ ]** Añadir página de recuperación de contraseña /update-password (NUEVO).
    * **[ ]** Asegurar que todo el texto del Dashboard esté en inglés (NUEVO).

* **[ ]** **Task 3.2: Vista de Lista de Ofertas (`/dashboard/jobs`)**
    * **[ ]** Implementar getAllJobsForAdmin (Nombre ajustado para claridad).
    * **[ ]** Implementar la consulta `getAllJobs` para administradores.
    * **[ ]** Crear el componente `JobsDataTable` que muestre: Título, Empresa, Estado, Fecha.
    * **[ ]** Añadir botón "Crear Nueva Oferta" que dirija a `/dashboard/jobs/new`.
    * **[ ]** Implementar botones de "Activar/Desactivar" con modales de confirmación.
    * **[ ]** _(Feature)_ Mostrar un contador de candidatos por oferta.

* **[ ]** **Task 3.3: Formulario de Creación/Edición de Ofertas (`/dashboard/jobs/new` y `.../[id]/edit`)**
    * **[ ]** Construir el formulario con `react-hook-form`.
    * **[ ]** Implementar `saveJob` (upsert) para guardar los datos.
    * **[ ]** Crear componente de búsqueda de empresas para asociar la oferta a un cliente.
    * **[ ]** Implementar la funcionalidad de "Creación rápida de empresa" desde el formulario.
    * **[ ]** Añadir subida de imágenes (hasta 6) y guardarlas en el campo `image_urls`.

* **[ ]** **Task 3.4: Vista de Detalle de Oferta (`/dashboard/jobs/[id]`)**
    * **[ ]** Mostrar todos los detalles de la oferta.
    * **[ ]** Añadir botones "Editar" y "Eliminar" (con modal de confirmación).
    * **[ ]** Debajo del detalle, listar los candidatos postulados (`getApplicationsForJob`).
    * **[ ]** Crear la `CandidateCard` con nombre, fecha y botón de contacto por WhatsApp.
    * **[ ]** Implementar Listar candidatos postulados (getApplicationsForJob).
    * **[ ]** Implementar botón de descarga de CV usando la RPC get_signed_resume_url.



## **FASE 4: DASHBOARD - GESTIÓN DE EMPRESAS Y LEADS (FUTURO)**

* **[ ]** **Task 4.1: Módulo de Empresas (`/dashboard/companies`)**
    * **[ ]** Crear la tabla para listar todas las empresas.
    * **[ ]** Implementar CRUD completo (Crear, Editar, Activar/Desactivar, Eliminar).
    * **[ ]** Construir la página de detalle de empresa para ver su información, notas de seguimiento y ofertas asociadas.

* **[ ]** **Task 4.2: Módulo de Leads (`/dashboard/leads`)**
    * **[ ]** Crear la vista de lista para los leads entrantes (`getAllLeads`).
    * **[ ]** Construir la página de detalle del lead con un sistema de notas para seguimiento.
    * **[ ]** Implementar la lógica para "Convertir en Cliente".
    * **[ ]** Implementar vista de detalle con sistema de notas (updateLead).
    * **[ ]** Implementar la lógica para "Convertir en Cliente" usando la RPC convert_lead_to_company.

## **FASE 5: DASHBOARD - CANDIDATOS Y AJUSTES FINALES (FUTURO)**

* **[ ]** **Task 5.1: Módulo de Candidatos (`/dashboard/candidates`)**
    * **[ ]** Crear la vista de lista de todos los candidatos únicos.
    * **[ ]** Construir la página de detalle del candidato con su información, historial de postulaciones y botón de descarga de CV (`get_signed_resume_url`).
    * **[ ]** Crear la vista de lista para los leads (getAllLeads).

* **[ ]** **Task 5.2: Módulo de Ajustes del Sitio (`/dashboard/settings`)**
    * **[ ]** Crear el formulario para editar la información de contacto (`updateSiteSettings`).
    * **[ ]** Crear la interfaz para editar los textos de Políticas de Privacidad y Términos de Servicio.
    * **[ ]** Crear elFormulario para editar site_settings.
    * **[ ]** Crear la Interfaz para editar legal_documents (título y contenido para ambos idiomas).

* **[ ]** **Task 5.3: Notificaciones en Tiempo Real (NUEVO)**
    * **[ ]** Implementar un componente de "toast" o indicador en el header del dashboard.
    * **[ ]** CrearSuscribirse a la tabla notifications para mostrar alertas de nuevos leads o aplicaciones.

* **[ ]** **Task 5.4: UI/UX Final del Dashboard**
    * **[ ]** Implementar la navegación principal persistente (Sidebar).
    * **[ ]** Añadir el `LanguageSwitcher` al layout del admin.