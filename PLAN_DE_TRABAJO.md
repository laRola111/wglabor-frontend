# PLAN DE TRABAJO - WGLABOR FRONTEND

Este documento sirve como nuestra hoja de ruta y estado actual del proyecto. Se actualizará en cada fase de nuestro trabajo conjunto.

**Última actualización:** 2025-09-10

---

## FASE 1: FUNDAMENTOS Y LANDING PAGE (EN PROGRESO)

El objetivo de esta fase es establecer la arquitectura del proyecto, la UI principal, la conexión con el backend y una landing page completa y funcional.

- **[x]** **Task 1.1: Inicialización del Proyecto**: Configuración de Next.js, TypeScript, Tailwind CSS.
- **[x]** **Task 1.2: Estructura de Rutas y i18n**: Implementación de rutas dinámicas `/[lang]`.
- **[x]** **Task 1.3: UI Shell (Header & Footer)**: Creación de componentes responsivos y dinámicos.
- **[x]** **Task 1.4: Conexión con Supabase**: Configuración del cliente y variables de entorno.
- **[x]** **Task 1.5: Datos Dinámicos en UI Shell**: El Footer carga datos de contacto desde la tabla `site_settings`.
- **[x]** **Task 1.6: Poblar Base de Datos**: Inserción de datos de prueba para empleos y empresas.
- **[x]** **Task 1.7: Listado de Empleos en Inicio**: La página de inicio muestra empleos con `status = 'active'`.
- **[x]** **Task 1.8: Completar Secciones de Landing Page (TAREA ACTUAL)**:
    - **[/]** Sub-task 1.8.1: Diseñar y crear componente `CompaniesSection` (Para Empresas).
    - **[/]** Sub-task 1.8.2: Diseñar y crear componente `TipsSection` (Tips / Recursos).
    - **[/]** Sub-task 1.8.3: Diseñar y crear componente `ContactSection` (Contacto).
    - **[x]** Sub-task 1.8.4: Integrar las nuevas secciones en la página de inicio.

---

## FASE 2: FUNCIONALIDAD DE BÚSQUEDA DE EMPLEO (Próxima Fase)

El objetivo es construir la experiencia central para el buscador de empleo.

- **[ ]** **Task 2.1: Crear Página de Búsqueda de Empleos (`/jobs`)**:
    - **[ ]** Crear la estructura de la página en `src/app/(public)/[lang]/jobs/page.js`.
    - **[ ]** Diseñar el layout: panel de filtros a la izquierda, lista de resultados a la derecha.

- **[ ]** **Task 2.2: Implementar Lógica de Búsqueda y Filtros**:
    - **[ ]** Conectar el `JobSearchBar` del Home para que redirija a la página `/jobs` con parámetros de búsqueda en la URL (query params).
    - **[ ]** Crear una nueva función en `queries.js` que acepte parámetros de búsqueda (keyword, location) para filtrar los resultados de Supabase.
    - **[ ]** Leer los query params en la página `/jobs` para ejecutar la búsqueda.
    - **[ ]** Añadir filtros adicionales en el panel lateral (ej. por empresa, tipo de jornada).

- **[ ]** **Task 2.3: Paginación de Resultados**:
    - **[ ]** Implementar la lógica de paginación en la consulta de Supabase (`.range()`).
    - **[ ]** Crear y añadir un componente de paginación en la parte inferior de la lista de resultados.

- **[ ]** **Task 2.4: Crear Página de Detalle del Empleo (`/jobs/[id]`)**:
    - **[ ]** Crear la ruta dinámica `src/app/(public)/[lang]/jobs/[id]/page.js`.
    - **[ ]** Crear una consulta a Supabase para obtener los detalles completos de un solo empleo por su ID.
    - **[ ]** Diseñar y maquetar la página para mostrar toda la información del empleo.

---

## FASE 3: AUTENTICACIÓN Y DASHBOARD DE ADMINISTRACIÓN (Futuro)

El objetivo es construir el área privada para que los administradores gestionen las ofertas.

- **[ ]** **Task 3.1: Flujo de Autenticación**:
    - **[ ]** Crear la página de Login (`/login`).
    - **[ ]** Implementar la función `supabase.auth.signInWithPassword`.
    - **[ ]** Implementar `supabase.auth.signOut` y proteger rutas del dashboard.

- **[ ]** **Task 3.2: Dashboard Principal**:
    - **[ ]** Crear una tabla que muestre **todos** los empleos (activos, borradores, etc.).
    - **[ ]** Añadir botones para "Editar", "Eliminar" y "Crear Nuevo".

- **[ ]** **Task 3.3: Formulario de Gestión de Empleos**:
    - **[ ]** Crear un formulario reutilizable para crear y editar empleos.
    - **[ ]** Implementar la función `upsert` para guardar los cambios en Supabase.