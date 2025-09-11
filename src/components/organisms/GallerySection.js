// CREAR NUEVO ARCHIVO: src/components/organisms/GallerySection.js

import Image from 'next/image';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800', alt: 'Team meeting' },
  { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800', alt: 'Business handshake' },
  { src: 'https://images.unsplash.com/photo-1573496773905-f5b17e716382?q=80&w=800', alt: 'Professional woman working' },
  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800', alt: 'Collaborative planning' },
];

export default function GallerySection({ dict }) {
    const text = dict.lang === 'es' 
        ? { title: "Nuestra Gente, Nuestra Fortaleza" } 
        : { title: "Our People, Our Strength" };

  return (
   <section className="relative z-10 py-20 px-8 bg-dark-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-dark-text mb-12">{text.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg aspect-w-1 aspect-h-1">
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}