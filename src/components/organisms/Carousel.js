// RUTA: src/components/organisms/Carousel.js (ACTUALIZADO CON AUTOPLAY)
'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
// 1. IMPORTAMOS EL PLUGIN DE AUTOPLAY
import Autoplay from 'embla-carousel-autoplay';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Carousel({ slides }) {
  // 2. CONFIGURAMOS EL PLUGIN CON OPCIONES DE UX
  // Se detendrá si el usuario interactúa (arrastra, botones) o pone el ratón encima.
  const autoplayOptions = {
    delay: 4000, // 4 segundos por slide
    stopOnInteraction: true,
    stopOnMouseEnter: true,
  };

  // 3. PASAMOS EL PLUGIN AL HOOK DE EMBLa
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay(autoplayOptions)]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  
  // El resto del JSX no necesita cambios
  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <div className="relative h-64 w-full overflow-hidden rounded-lg">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="embla__prev absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/80 transition-colors z-10" onClick={scrollPrev}>
        <FaChevronLeft />
      </button>
      <button className="embla__next absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/80 transition-colors z-10" onClick={scrollNext}>
        <FaChevronRight />
      </button>
    </div>
  );
}