// RUTA: src/components/organisms/GallerySection.js (REEMPLAZAR ARCHIVO)

import Carousel from './Carousel'; // Importamos nuestro nuevo componente

// Los datos estáticos que usaremos temporalmente
const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800', alt: 'Team meeting' },
  { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800', alt: 'Business handshake' },
  { src: 'https://images.unsplash.com/photo-1573496773905-f5b17e716382?q=80&w=800', alt: 'Professional woman working' },
  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800', alt: 'Collaborative planning' },
  { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800', alt: 'Marketing strategy session' },
  { src: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=800', alt: 'Two professionals collaborating' },
];

// El componente ahora es mucho más simple.
export default function GallerySection({ dict }) {
    const text = dict.lang === 'es' 
        ? { title: "Nuestra Gente, Nuestra Fortaleza" } 
        : { title: "Our People, Our Strength" };

  return (
   <section className="relative z-10 py-20 px-8 bg-dark-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-dark-text mb-12">{text.title}</h2>
        
        {/* Aquí renderizamos el carrusel, pasándole los datos */}
        <Carousel slides={galleryImages} />
      </div>
    </section>
  );
}