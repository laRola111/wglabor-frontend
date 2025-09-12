// RUTA: src/components/organisms/CompaniesSection.js (CÓDIGO CORREGIDO Y COMPLETO)

import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import Button from '../ui/Button';

// CORRECCIÓN: La firma de la función ahora acepta 'dict' y 'lang' como props directas.
export default function CompaniesSection({ dict, lang }) {
  const content = {
    es: {
      title: "Encuentre el Talento que su Empresa Necesita",
      description: "Publica tus vacantes con nosotros y accede a una red de profesionales cualificados y listos para trabajar.",
      benefits: [
        "Proceso de selección riguroso.",
        "Acceso a una amplia red de talento.",
        "Soluciones flexibles y a la medida."
      ],
      buttonText: "Publica tu vacante"
    },
    en: {
      title: "Find the Talent Your Company Needs",
      description: "Post your job openings with us and access a network of qualified professionals ready to work.",
      benefits: [
        "Rigorous selection process.",
        "Access to a wide talent network.",
        "Flexible and tailored solutions."
      ],
      buttonText: "Post a Job"
    }
  };

  // El resto del componente ya estaba correcto.
  const text = content[lang] || content['es'];

  return (
    <section className="relative z-10 py-20 px-8 bg-dark-background">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Columna de Texto y CTA */}
        <div className="text-left">
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-text mb-6">
            {text.title}
          </h2>
          <p className="text-lg text-dark-text-muted mb-8">
            {text.description}
          </p>
          
          <ul className="space-y-4 mb-10">
            {text.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center text-dark-text-muted">
                <FaCheckCircle className="text-accent-primary mr-3 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <Link href={`/${lang}/companies`}>
            <Button className="text-lg px-8 py-3 group">
              <span>{text.buttonText}</span>
            </Button>
          </Link>
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