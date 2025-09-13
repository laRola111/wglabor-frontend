// RUTA: src/components/organisms/AboutUsSection.js (REEMPLAZAR TODO EL ARCHIVO)

import Image from "next/image";
import logo from "../../../public/team.webp";

export default function AboutUsSection({ lang }) {
  const content = {
    es: {
      title: "Sobre Nosotros",
      p1: "WG Labor LLC nació de la visión de crear un puente más eficiente y humano entre las empresas que buscan talento y los profesionales que desean flexibilidad y oportunidades de crecimiento.",
      p2: "Nuestra misión es simple: ser el socio estratégico más confiable para nuestros clientes y una fuente de oportunidades valiosas para nuestros candidatos.",
      imageAlt: "Equipo de WG Labor colaborando en una reunión de estrategia", // <-- AÑADIDO
    },
    en: {
      title: "About Us",
      p1: "WG Labor LLC was born from the vision of creating a more efficient and humane bridge between companies seeking talent and professionals desiring flexibility and growth opportunities.",
      p2: "Our mission is simple: to be the most trusted strategic partner for our clients and a source of valuable opportunities for our candidates.",
      imageAlt: "The WG Labor team collaborating in a strategy meeting", // <-- ADDED
    },
  };

  const text = content[lang] || content["es"];

  return (
    <section className="relative z-10 py-24 px-8 bg-gradient-to-b from-transparent via-black-background/10 to-dark-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative h-80 lg:h-full w-full">
          <Image
            src={logo}
            alt={text.imageAlt}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="text-left">
          <span className="block w-20 h-1 bg-accent-primary mb-6"></span>
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-text mb-6">
            {text.title}
          </h2>
          <div className="space-y-4 text-lg text-dark-text-muted">
            <p>{text.p1}</p>
            <p>{text.p2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
