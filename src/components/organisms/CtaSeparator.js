// CREAR NUEVO ARCHIVO: src/components/organisms/CtaSeparator.js

import Link from 'next/link';
import { FaBuilding } from 'react-icons/fa';
import Button from '../ui/Button';

export default function CtaSeparator({ lang }) {
  const content = {
    es: {
      message: "¿Es usted una empresa que busca talento?",
      buttonText: "Nuestras Soluciones"
    },
    en: {
      message: "Are you a company looking for talent?",
      buttonText: "Our Solutions"
    }
  };

  const text = content[lang] || content['es'];

  return (
    <div className="bg-dark-background py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center" aria-hidden="true">
          {/* Línea izquierda */}
          <div className="w-full border-t border-dark-border" />
          
          {/* Contenido Central */}
          <div className="flex-shrink-0 px-6 text-center">
            <div className="flex flex-col items-center md:flex-row md:space-x-6">
              <FaBuilding className="text-accent-primary h-8 w-8 mb-4 md:mb-0" />
              <div className="text-center md:text-left">
                <p className="text-lg font-semibold text-dark-text">{text.message}</p>
                <Link href={`/${lang}/companies`}>
                  <Button className="mt-2 !py-1.5 !px-5 !text-sm">
                    {text.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Línea derecha */}
          <div className="w-full border-t border-dark-border" />
        </div>
      </div>
    </div>
  );
}