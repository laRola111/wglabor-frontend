import Carousel from './Carousel';
import { getGalleryImages } from '@/actions/gallery'; // 1. Importamos la nueva acción

// 2. Convertimos el componente en asíncrono
export default async function GallerySection({ dict }) {
    const text = dict.lang === 'es' 
        ? { title: "Nuestra Gente, Nuestra Fortaleza" } 
        : { title: "Our People, Our Strength" };

    // 3. Obtenemos las imágenes desde el bucket de Supabase
    const galleryImages = await getGalleryImages();

    return (
        <section className="relative z-10 py-20 px-8 bg-dark-background">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-dark-text mb-12">{text.title}</h2>
                
                {/* 4. Renderizamos el carrusel con las imágenes obtenidas o un mensaje si no hay */}
                {galleryImages.length > 0 ? (
                    <Carousel slides={galleryImages} />
                ) : (
                    <p className="text-center text-dark-text-muted">
                        {dict.lang === 'es' ? 'La galería de imágenes está vacía.' : 'The image gallery is empty.'}
                    </p>
                )}
            </div>
        </section>
    );
}