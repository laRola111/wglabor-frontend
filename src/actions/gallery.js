'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function getGalleryImages() {
  const supabase = createServerComponentClient({ cookies });
  const BUCKET_NAME = 'gallery';

  // Listamos todos los archivos en el bucket 'gallery'
  const { data: files, error: listError } = await supabase
    .storage
    .from(BUCKET_NAME)
    .list('', {
      limit: 100, // Un límite razonable, puedes ajustarlo si tienes más imágenes
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' }, // Las más nuevas primero
    });

  if (listError) {
    console.error('Error listing gallery images from Supabase:', listError);
    return []; // Devolvemos un array vacío si hay un error
  }

  // Mapeamos la lista de archivos para obtener la URL pública de cada uno
  const images = files.map(file => {
    const { data: { publicUrl } } = supabase
      .storage
      .from(BUCKET_NAME)
      .getPublicUrl(file.name);
    
    return {
      src: publicUrl,
      alt: `Imagen de la galería de WGLabor` // Texto alternativo genérico
    };
  });

  return images;
}