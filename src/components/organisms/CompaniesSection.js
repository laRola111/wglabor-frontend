// RUTA: src/components/organisms/CompaniesSection.js (REEMPLAZAR ARCHIVO COMPLETO)
'use client'; // <-- Convertimos a Componente de Cliente para manejar onClick

import Link from 'next/link';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';
import Button from '../ui/Button';

export default function CompaniesSection({ dict, lang }) {
  // El contenido del diccionario se obtiene de 'home'
  const text = dict.home; 

  const handleScrollToContact = (event) => {
    event.preventDefault();
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative z-10 py-20 px-8 bg-dark-background">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Columna de Texto y CTA */}
        <div className="text-left">
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-text mb-6">
            {text.companiesTitle}
          </h2>
          <p className="text-lg text-dark-text-muted mb-8">
            {text.companiesDescription}
          </p>
          
          <ul className="space-y-4 mb-10">
            {/* Beneficios (simulados, se pueden añadir al diccionario también) */}
            <li className="flex items-center text-dark-text-muted"><FaCheckCircle className="text-accent-primary mr-3 flex-shrink-0" /><span>Proceso de selección riguroso.</span></li>
            <li className="flex items-center text-dark-text-muted"><FaCheckCircle className="text-accent-primary mr-3 flex-shrink-0" /><span>Acceso a una amplia red de talento.</span></li>
            <li className="flex items-center text-dark-text-muted"><FaCheckCircle className="text-accent-primary mr-3 flex-shrink-0" /><span>Soluciones flexibles y a la medida.</span></li>
          </ul>

          {/* --- NUEVA SECCIÓN DE BOTONES --- */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Botón 1 (Principal): Encuentra tu Candidato (con scroll) */}
            <Button 
              onClick={handleScrollToContact} 
              className="text-lg px-8 py-3"
            >
              <span>{text.findTalentButton}</span>
            </Button>
            
            {/* Botón 2 (Secundario): Más Información (link a página) */}
            <Link href={`/${lang}/companies`}>
              <Button 
                className="text-lg px-8 py-3 bg-transparent border-2 border-dark-border hover:bg-dark-surface hover:border-dark-surface"
              >
                <span>{text.moreInfoButton}</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Columna de la Imagen */}
        <div className="relative h-80 lg:h-[450px] w-full hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1770"
            alt="Reunión de negocios profesional"
            fill
            className="object-cover rounded-lg"
          />
        </div>

      </div>
    </section>
  );
}