// RUTA: src/app/(public)/[lang]/resources/page.js (RE-ARQUITECTADO)
import { getDictionary } from '@/lib/dictionaries';
import ResourcesClient from '@/components/organisms/ResourcesClient';

// Generamos los metadatos desde el servidor
export async function generateMetadata({ params: { lang } }) {
  const dict = await getDictionary(lang);
  return {
    title: `${dict.resourcesPage.heroTitle} | WG Labor LLC`,
    description: dict.resourcesPage.heroSubtitle,
  };
}

// Este es ahora un Componente de Servidor asíncrono
export default async function ResourcesPage({ params: { lang } }) {
  // 1. Obtenemos el diccionario en el servidor
  const dict = await getDictionary(lang);

  // 2. Pasamos la sección específica del diccionario como prop al componente de cliente
  return <ResourcesClient dict={dict.resourcesPage} />;
}